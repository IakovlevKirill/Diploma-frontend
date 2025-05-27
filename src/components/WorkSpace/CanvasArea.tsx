import { Toolbar } from "./components/Toolbar.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {CanvasNode} from "../../store/types.ts";
import {Route} from "./components/Route.tsx";
import {setCurrentObject} from "../../app/slices/Node/currentCanvasObjectSlice.ts";
import {addNode} from "../../app/slices/Node/CanvasNodesSlice.ts";
import {setCurrentTool} from "../../app/slices/currentToolSlice.ts";
import {incrementObjectCount} from "../../app/slices/Node/objectCountSlice.ts";
import * as React from "react";
import {
    useEffect,
    useRef,
    useState
} from "react";
import { motion } from "framer-motion";
import {
    useCreateNodeMutation,
} from "../../api/testApi.ts";
import {useParams} from "react-router-dom";

export const CanvasArea = () => {

    const projectId = useParams()

    const [createNode, { isLoading: isCreateNodeLoading }] = useCreateNodeMutation();

    const dispatch = useAppDispatch();
    const currentTool = useAppSelector((state) => state.currentTool.tool);
    const currentSelectedNodeId = useAppSelector((state) => state.currentObject.object_id);
    const node_array = useAppSelector((state) => state.canvasObjects.nodes);
    const objects_count = useAppSelector((state) => state.objectCount.objectCount);

    // Состояния для перемещения объекта
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
    const [currentDraggedObject, setCurrentDraggedObject] = useState<CanvasNode | null>(null);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

    const canvasRef = useRef<HTMLDivElement>(null);
    const isPanning = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });

    // Обработчик нажатия кнопки мыши
    const handleMouseDown = (e: React.MouseEvent) => {
        // Если нажато колесико (кнопка 1) или правая кнопка + Ctrl
        if (e.button === 1 || (e.button === 2 && e.ctrlKey)) {
            isPanning.current = true;
            startPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
            e.preventDefault();
        }
    };

    // Обработчик движения мыши
    const handleMouseMove = (e: React.MouseEvent) => {
        if (isPanning.current) {
            setPosition({
                x: e.clientX - startPos.current.x,
                y: e.clientY - startPos.current.y
            });
        }
    };

    // Обработчик колесика мыши для масштабирования (с центрированием)
    const handleWheel = (e: React.WheelEvent) => {
        if (e.ctrlKey) {
            e.preventDefault();

            // Получаем текущие размеры и позицию холста
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Вычисляем позицию мыши относительно холста с текущим масштабом
            const canvasX = (mouseX - position.x) / scale;
            const canvasY = (mouseY - position.y) / scale;

            // Вычисляем новый масштаб
            const newScale = Math.min(Math.max(0.1, scale - e.deltaY * 0.001), 3);

            // Вычисляем новую позицию для сохранения точки под курсором
            const newX = mouseX - canvasX * newScale;
            const newY = mouseY - canvasY * newScale;

            setScale(newScale);
            setPosition({ x: newX, y: newY });
        }
    };

    // Обработчик отпускания кнопки мыши
    const handleMouseUp = () => {
        isPanning.current = false;
    };

    const handleNodeClick = (e: React.MouseEvent, obj: CanvasNode) => {
        e.stopPropagation();
        dispatch(setCurrentObject({
            id: obj.id,
            name: obj.name,
            color: obj.color,
        }));
        dispatch(setCurrentTool('default'));
    };

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (currentTool == 'default') return;

        console.log('chlen');

        if (contextMenu.visible) {
            setContextMenu({ ...contextMenu, visible: false });
            return;
        }

        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - position.x) / scale;
        const y = (e.clientY - rect.top - position.y) / scale;

        const newNode: CanvasNode = {
            id: Math.random().toString(36).substring(2, 9),
            name: `node ` + objects_count,
            color: '#D9D9D9',
            size: {width: 120, height: 80},
            position: {x: x, y: y},
            parent: '',
            children: []
        };

        createNode({
            name: `node` + objects_count,
            projectId: String(projectId.projectId),
            position: {x: x, y: y},
            size: {width: 120, height: 80},
            parent: 'chlen',
            children: [],
            color: '#D9D9D9',
        })

        dispatch(addNode(newNode));
        dispatch(incrementObjectCount());
    };

    // Обработчик контекстного меню
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY
        });
    };

    // Закрытие контекстного меню при клике вне его
    useEffect(() => {
        const handleClickOutside = () => {
            if (contextMenu.visible) {
                setContextMenu({ ...contextMenu, visible: false });
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [contextMenu]);

    // Добавляем обработчики для колесика мыши
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const preventDefault = (e: WheelEvent) => {
                if (e.ctrlKey) {
                    e.preventDefault();
                }
            };

            canvas.addEventListener('wheel', preventDefault, { passive: false });
            return () => canvas.removeEventListener('wheel', preventDefault);
        }
    }, []);

    return (
        <div
            ref={canvasRef}
            className={`
                z-1 relative flex h-full w-[85%] bg-[#F5F5F5] flex-1 overflow-hidden
                ${currentTool === "default" ? "cursor-default" : ""}
                ${currentTool === "node_creation" ? "cursor-crosshair" : ""}
                ${currentTool === "link" ? "cursor-crosshair" : ""}
                ${currentTool === "text" ? "cursor-text" : ""}
            `}
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            // onWheel={handleWheel} пока что выключил потому что работает не корректно
            onContextMenu={handleContextMenu}
        >
            <Route />
            <Toolbar />

            <motion.div
                className="absolute bg-[#F5F5F5] z-1 w-[1000px] h-[1000px] origin-center"
                style={{
                    x: position.x,
                    y: position.y,
                    scale: scale,
                }}
            >
                {node_array.map((node: CanvasNode) => (
                    <div
                        key={node.id}
                        onClick={(e) => handleNodeClick(e, node)}
                        onMouseDown={(e) => handleMouseDown(e)}
                        className={`
                            absolute z-99 border-2 border-[#F5F5F5]
                            ${(!isDragging)
                            ? "rounded-[0px] hover:border-[2px] cursor-pointer"
                            : ""
                        }
                            ${(currentSelectedNodeId === node.id)
                            ? "border-[2px] border-[#0d99ff]!"
                            : ""
                        }
                            ${isDragging && currentDraggedObject?.id === node.id ? "cursor-grabbing" : "cursor-grab"}
                        `}
                        style={{
                            left: `${node.position.x}px`,
                            top: `${node.position.y}px`,
                            width: `${node.size.width}px`,
                            height: `${node.size.height}px`,
                            backgroundColor: node.color
                        }}
                    />
                ))}
            </motion.div>

            {/* Контекстное меню */}
            {(contextMenu.visible) && (
                <div
                    className="min-w-[200px] fixed flex flex-col p-[10px] gap-[5px] bg-[#1e1e1e] rounded-[8px] z-50 shadow-[0px_5px_16px_0px_rgba(0,_0,_0,_0.1)] select-none"
                    style={{
                        left: `${contextMenu.x}px`,
                        top: `${contextMenu.y}px`,
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="
                    bg-[#1e1e1e] w-[full] text-start border-0 font-[Inter-medium] text-[#FFF] text-[12px] p-[6px] rounded-[4px]
                      hover:bg-[#3575ff]
                    ">
                        option 1
                    </button>
                    <div className="w-full h-[1px] bg-[#505356]"></div>
                    <button className="
                    bg-[#1e1e1e] w-[full] text-start border-0 font-[Inter-medium] text-[#FFF] text-[12px] p-[6px] rounded-[4px]
                      hover:bg-[#3575ff]
                    ">
                        option 2
                    </button>
                    <button className="
                    bg-[#1e1e1e] relative w-[full] text-start border-0 font-[Inter-medium] text-[#FFF] text-[12px] p-[6px] rounded-[4px]
                      hover:bg-[#3575ff]
                    ">
                        option 3
                        <div className="absolute right-[5%] top-[30%] text-[#8F8F8F]">Shift + Ctrl</div>
                    </button>
                    <div className="w-full h-[1px] bg-[#505356]"></div>
                    <button className="
                    bg-[#1e1e1e] w-[full] text-start border-0 font-[Inter-medium] text-[#FFF] text-[12px] p-[6px] rounded-[4px]
                      hover:bg-[#3575ff]
                    ">
                        option 4
                    </button>
                </div>
            )}
        </div>
    );
};