import { Toolbar } from "./components/Toolbar.tsx";
import {
    useAppDispatch,
    useAppSelector
} from "../../app/hooks.ts";
import {CanvasNode} from "../../store/types.ts";
import {
    setCurrentNode,
    unsetCurrentNode
} from "../../app/slices/Node/CurrentNodeSlice.ts";
import {
    addNode,
    clearCanvas,
    deleteNode,
    setCanvasNodes,
    updateNodePosition
} from "../../app/slices/Node/CanvasNodesSlice.ts";
import {setCurrentTool} from "../../app/slices/WorkSpace/currentToolSlice.ts";
import {incrementNodeCount} from "../../app/slices/Node/NodeCountSlice.ts";
import * as React from "react";
import {
    useEffect,
    useRef,
    useState,
} from "react";
import { v4 as uuidv4 } from 'uuid';
import {
    motion
} from "framer-motion";
import {
    useCreateNodeMutation,
    useDeleteNodeMutation,
    useLazyGetNodeChildrenQuery,
    useUpdateNodeMutation
} from "../../api/testApi.ts";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import {
    ClipLoader, RingLoader
} from "react-spinners";
import {addBreadCrumb} from "../../app/slices/Other/BreadCrumbsSlice.ts";
import {store} from "../../store/store.ts";
import {setActiveLayer} from "../../app/slices/Other/CurrentActiveLayerSlice.ts";
import {ModalNewObjectTypeCreation} from "./components/ModalNewObjectTypeCreation.tsx";
import {setZoom} from "../../app/slices/Other/CurrentCanvasZoomSlice.ts";
import {setCursorPosition} from "../../app/slices/Other/CursorPositionSlice.ts";

export const CanvasArea = () => {

    const projectId = useParams()

    const location = useLocation();

    const [path, setPath] = useState<string[]>(location.pathname.split("/"));

    const [getNodeChildren, { isLoading: isChildrenLoading}] = useLazyGetNodeChildrenQuery()

    const [createNode, { isLoading : isCreateLoading}] = useCreateNodeMutation();
    const [updateNode, { isLoading : isUpdateLoading}] = useUpdateNodeMutation();
    const [deleteNodeQuery, { isLoading : isDeleteLoading}] = useDeleteNodeMutation();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const currentTool = useAppSelector((state) => state.currentTool.tool);
    const currentSelectedNodeId = useAppSelector((state) => state.currentNode.node?.id);
    const currentSelectedNodeName = useAppSelector((state) => state.currentNode.node?.name);
    const all_nodes_array = useAppSelector((state) => state.nodes.all_nodes);
    const canvas_nodes_array = useAppSelector((state) => state.nodes.canvas_nodes);
    const scale = useAppSelector((state) => state.zoomCanvas.zoom);

    console.log(all_nodes_array);
    console.log(canvas_nodes_array);

    const objects_count = useAppSelector((state) => state.nodeCount.nodeCount);

    // Состояния для перемещения объекта

    const [isDragging, setIsDragging] = useState(false);
    const [currentDraggedNode, setCurrentDraggedNode] = useState<CanvasNode | null>(null);
    const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

    // Состояние пкм менюшки
    const [contextMenuCanvas, setContextMenuCanvas] = useState({ visible: false, x: 0, y: 0 });
    const [contextMenuNode, setContextMenuNode] = useState({ visible: false, x: 0, y: 0 });

    // Состояния для перемещения по холсту
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const canvasRef = useRef<HTMLDivElement>(null);
    const isPanning = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });

    const getRelativeCursorPosition = (e: React.MouseEvent | React.WheelEvent) => {
        const canvas = e.currentTarget as HTMLElement;
        const rect = canvas.getBoundingClientRect();

        // Позиция курсора относительно контейнера
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Центр контейнера
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Учитываем смещение холста (если есть position.x/y) и масштаб
        const x = (mouseX - centerX - position.x) / scale;
        const y = (mouseY - centerY - position.y) / scale;

        return { x, y };
    };

    const handleInspect = async () => {

        setContextMenuNode({ visible: false, x: 0, y: 0 });
        dispatch(clearCanvas());

        dispatch(setActiveLayer(currentSelectedNodeId))

        const depthLevel = location.pathname.split('/').slice(4).length;

        dispatch(addBreadCrumb({
            index: depthLevel,
            name: currentSelectedNodeName,
            layer_id: currentSelectedNodeId,
        }))

        navigate(`${currentSelectedNodeId}`);

        const pathArray = path

        if (currentSelectedNodeId) {
            pathArray.push(currentSelectedNodeId)
        }

        setPath(pathArray);

        if (currentSelectedNodeId) {
            const response = await getNodeChildren({ nodeId: currentSelectedNodeId })
                .unwrap();
            if (response.result == "success") {
                dispatch(setCanvasNodes(response.data.nodes));
            } else {
                alert('error');
            }
        }
    };

    // Бинды для перемещения по холсту: колесико / ctrl+пкм
    const handleMouseDown = (e: React.MouseEvent) => {
        // Если нажато колесико (кнопка 1) или правая кнопка + Ctrl
        if (e.button === 1 || (e.button === 2 && e.ctrlKey)) {
            isPanning.current = true;
            startPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
            e.preventDefault();
        }
    };

    // Здесь трекаю позицию во время движение по холсту
    const handleMouseMove = (e: React.MouseEvent) => {
        if (isPanning.current) {
            setPosition({
                x: e.clientX - startPos.current.x,
                y: e.clientY - startPos.current.y
            });
        }
    };

    // Обработчик отпускания лкма
    const handleMouseUp = () => {
        isPanning.current = false;
    };

    // Обработчик нажатия на ноду
    const handleNodeClick = (e: React.MouseEvent, node: CanvasNode) => {
        e.stopPropagation();
        dispatch(setCurrentNode({
            id: node.id,
            name: node.name,
            type: node.type,
            pointColor: node.pointColor,
            color: node.color,
            children: node.children,
            parentId: node.parentId,
            position: node.position,
            size: node.size,
            projectId: node.projectId
        }));
        dispatch(setCurrentTool('default'));
    };

    // Обработчик нажатия на холст
    const handleCanvasClick = (e: React.MouseEvent) => {

        if (contextMenuCanvas.visible) {
            setContextMenuCanvas({ ...contextMenuCanvas, visible: false });
            return;
        }

        if (currentTool == 'default') {
            dispatch(unsetCurrentNode())
            return;
        }

        const { x, y } = getRelativeCursorPosition(e);

        const newNode: CanvasNode = {
            id: uuidv4(),
            type: "untyped",
            name: `node${objects_count}`,
            pointColor: '#ffa500',
            projectId: String(projectId.projectId),
            position: { x, y },  // Теперь координаты согласованы
            size: { width: 100, height: 100 },
            parentId: path[path.length - 1],
            children: [],
            color: '#1c1f24',
        };

        switch (currentTool) {
            case 'node_creation':
                newNode.type = "untyped"
                break;
            case 'quest_creation':
                newNode.type = "quest"
                break;
            case 'location_creation':
                newNode.type = "location"
                break;
            case 'character_creation':
                newNode.type = "character"
                break;
            case 'event_creation':
                newNode.type = "event"
                break;
            case 'boss_creation':
                newNode.type = "boss"
                break;
            case 'item_creation':
                newNode.type = "item"
                break;
            case 'cluster_creation':
                newNode.type = "cluster"
                break;
        }


        createNode(newNode);
        dispatch(addNode(newNode));
        dispatch(incrementNodeCount());
        dispatch(setCurrentNode(newNode));

    };

    // Обработчик контекстного меню
    const handleContextMenu = (e: React.MouseEvent, menu_type: "canvas" | "node", node?: CanvasNode) => {

        e.preventDefault();
        e.stopPropagation();

        if (e.ctrlKey) { // чтобы не открывалось при зажатом ctrl
            return
        }

        if (menu_type === 'canvas')  {
            if (contextMenuCanvas.visible) {
                setContextMenuCanvas({
                    visible: false,
                    x: e.clientX,
                    y: e.clientY
                });
            } else if (!contextMenuCanvas.visible && !contextMenuNode.visible) {
                setContextMenuCanvas({
                    visible: true,
                    x: e.clientX,
                    y: e.clientY
                });
            } else if (contextMenuNode.visible) {
                setContextMenuNode({
                    visible: false,
                    x: e.clientX,
                    y: e.clientY
                });
            }
        } else if (menu_type === 'node') {
            if (contextMenuNode.visible) {
                setContextMenuNode({
                    visible: false,
                    x: e.clientX,
                    y: e.clientY
                });
            } else if (!contextMenuNode.visible && !contextMenuCanvas.visible && node) {
                dispatch(setCurrentNode({
                    id: node.id,
                    name: node.name,
                    pointColor: node.pointColor,
                    color: node.color,
                    children: node.children,
                    parentId: node.parentId,
                    position: node.position,
                    size: node.size,
                    projectId: node.projectId,
                }))
                setContextMenuNode({
                    visible: true,
                    x: e.clientX,
                    y: e.clientY
                });
            } else if (contextMenuCanvas.visible) {
                setContextMenuCanvas({
                    visible: false,
                    x: e.clientX,
                    y: e.clientY
                });
            }
        }
    };



    // Закрытие контекстного меню при клике вне его
    useEffect(() => {
        const handleClickCanvasOutside = () => {
            if (contextMenuCanvas.visible) {
                setContextMenuCanvas({ ...contextMenuCanvas, visible: false });
            }
        };

        document.addEventListener('click', handleClickCanvasOutside);
        return () => document.removeEventListener('click', handleClickCanvasOutside);
    }, [contextMenuCanvas]);

    // Закрытие контекстного меню при клике вне его
    useEffect(() => {
        const handleClickNodeOutside = () => {
            if (contextMenuNode.visible) {
                setContextMenuNode({ ...contextMenuNode, visible: false });
            }
        };

        document.addEventListener('click', handleClickNodeOutside);
        return () => document.removeEventListener('click', handleClickNodeOutside);
    }, [contextMenuNode]);

    // Добавляем обработчики для колесика мыши(для зума)
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

    // Обработчик колесика мыши для масштабирования (с центрированием)

    const handleWheel = (e: React.WheelEvent) => {
        if (
            (
                (Math.round(scale*100)>30)
                &&
                (Math.round(scale*100)<250)
            )
            ||
            (
                (e.deltaY < 0)
                &&
                (Math.round(scale*100)==30)
            )
            ||
            (
                (e.deltaY > 0)
                &&
                (Math.round(scale*100)==250)
            )
        ) {
            // Получаем текущие размеры и позицию холста
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Вычисляем позицию мыши относительно холста с текущим масштабом
            const canvasX = (mouseX - position.x) / scale;
            const canvasY = (mouseY - position.y) / scale;

            // Вычисляем новый масштаб
            const newScale = Math.min(Math.max(0.3, scale - e.deltaY * 0.0005), 2.5);

            // Вычисляем новую позицию для сохранения точки под курсором
            const newX = mouseX - canvasX * newScale;
            const newY = mouseY - canvasY * newScale;

            dispatch(setZoom(newScale))
            setPosition({ x: newX, y: newY });
        } else if (
            (Math.round(scale*100) == 30) &&
            (e.ctrlKey) &&
            (e.deltaY > 0)
        ) {
            console.log('всплываю вверх')
        } else if (
            (Math.round(scale*100) == 250) &&
            (e.ctrlKey) &&
            (e.deltaY < 0)
        ) {
            console.log('проваливаюсь в ноду')
        }
    };


    // Обработчики для drag and drop

    const handleDragStart = (e: React.MouseEvent, node: CanvasNode) => {
        setCurrentDraggedNode(node);
        dispatch(setCurrentNode(node))
        e.stopPropagation();
        setIsDragging(true);
        setDragStartPos({
            x: e.clientX - position.x - node?.position?.x * scale,
            y: e.clientY - position.y - node?.position?.y * scale
        });
    };

    const handleDrag = (e: React.MouseEvent) => {

        if (!isDragging || !currentDraggedNode) return;

        const newX = (e.clientX - position.x - dragStartPos.x) / scale;
        const newY = (e.clientY - position.y - dragStartPos.y) / scale;

        dispatch(updateNodePosition({id: currentDraggedNode.id, x: newX, y: newY}));
    };

    const handleDragEnd = () => {
        if (!currentDraggedNode) return;

        // Получаем актуальные данные из хранилища
        const currentNode = all_nodes_array.find(n => n.id === currentDraggedNode.id);

        if (!currentNode) {
            return;
        } else {
            const updatedNode = {
                id: currentNode.id,
                type: currentNode.type,
                name: currentNode.name,
                pointColor: currentNode.pointColor,
                position: currentNode.position,
                size: currentNode.size,
                parentId: currentNode.parentId,
                children: currentNode.children,
                color: currentNode.color,
            }

            updateNode(updatedNode)
                .unwrap()
                .catch((error) => console.error("Update failed:", error));

            setIsDragging(false);
            setCurrentDraggedNode(null);
        }
    };

    const Node = (props: {key: string; node: CanvasNode;}) => {

        const canvas = canvasRef.current;

        const { x, y } = props.node.position;
        const canvasCenterX = (canvas?.offsetWidth!) / 2;
        const canvasCenterY = (canvas?.offsetHeight!) / 2;

        return (
            <div
                onDoubleClick={ () => {handleInspect()}} // дабл клик -> проваливаемся на уровень ниже
                onContextMenu={(e) => {
                    handleContextMenu(e, 'node', props.node)
                }}
                onClick={ async (e) => {
                    handleNodeClick(e, props.node)
                }}
                onMouseDown={(e) => {
                    if (currentTool === 'default') {
                        handleDragStart(e, props.node);
                    }
                }}
                onMouseMove={handleDrag}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                className={`
                    absolute
                    flex 
                    items-center 
                    flex-col 
                    justify-center 
                    z-4 
                    border-2 
                    border-[#F5F5F5] 
                    rounded-[100px]
                    hover:scale-125
                    transition-transform
                    duration-200
                    
                    ${(currentSelectedNodeId === props.node.id) ? "border-[2px] scale-125 border-[#0d99ff]!": ""}
                    ${isDragging ? "rounded-[0px] hover:border-[2px] cursor-pointer" : "cursor-pointer"}
                    ${(props.node.type == "untyped") ? "bg-[#1c1f24]" : ""}
                    ${(props.node.type == "quest") ? "bg-[#207E0D]" : ""}
                    ${(props.node.type == "location") ? "bg-[#1BBAAD]" : ""}
                    ${(props.node.type == "character") ? "bg-[#0647A8]" : ""}
                    ${(props.node.type == "event") ? "bg-[#C1CF00]" : ""}
                    ${(props.node.type == "boss") ? "bg-[#A80104]" : ""}
                    ${(props.node.type == "item") ? "bg-[#9000C9]" : ""}
                    ${(props.node.type == "cluster") ? "bg-[#FF14B8]" : ""}
                     `}
                style={{
                    left: canvasCenterX + x * scale + position.x,
                    top: canvasCenterY + y * scale + position.y,
                    width: `${props.node.size.width}px`,
                    height: `${props.node.size.height}px`,
                }}
            >
                {/*
                <div className="flex flex-col w-[calc(100%)] h-[calc(100%)] ">
                    <div className="w-[calc(100%-10px)] p-[5px] gap-[5px] flex flex-row items-center">
                        <div
                            className={`w-[10px] h-[10px] rounded-[100px]`}
                            style={{
                                backgroundColor: props.node.pointColor
                            }}
                        ></div>
                        <span className="text-[#FFF] text-[14px] font-[Inter-bold]">{props.node.name}</span>
                    </div>
                    <div className="w-full h-[2px] bg-[#474a4e]"></div>
                </div>
                */}
                <span className="text-[#FFF] text-[14px] font-[Inter-bold]">{props.node.name}</span>
                <span className="text-[#FFF] text-[12px] font-[Inter-bold]">{props.node.type}</span>
            </div>
        )
    }

    const ContextMenuCanvas = () => {
        return (
            <>
                {(contextMenuCanvas.visible) && (
                    <div className="min-w-[200px] fixed flex flex-col p-[10px] gap-[5px] bg-[#1e1e1e] rounded-[8px] z-50 shadow-[0px_5px_16px_0px_rgba(0,_0,_0,_0.1)] select-none"
                         style={{
                             left: `${contextMenuCanvas.x}px`,
                             top: `${contextMenuCanvas.y}px`,
                         }}
                         onClick={(e) => e.stopPropagation()}
                    >
                        <motion.button
                            whileHover={{ backgroundColor: "#3575ff" }}
                            whileTap={{ scale: 0.98 }}
                            className="
                            bg-[#1e1e1e] w-full text-start border-0
                            font-[Inter-medium] text-[#FFF] text-[12px]
                            p-[6px] rounded-[4px] transition-colors"
                        >
                            option 1
                        </motion.button>
                        <motion.button
                            whileHover={{ backgroundColor: "#3575ff" }}
                            whileTap={{ scale: 0.98 }}
                            className="
                            bg-[#1e1e1e] w-full text-start border-0
                            font-[Inter-medium] text-[#FFF] text-[12px]
                            p-[6px] rounded-[4px] transition-colors"
                        >
                            option 2
                        </motion.button>
                        <motion.button
                            whileHover={{ backgroundColor: "#3575ff" }}
                            whileTap={{ scale: 0.98 }}
                            className="
                            bg-[#1e1e1e] w-full text-start border-0
                            font-[Inter-medium] text-[#FFF] text-[12px]
                            p-[6px] rounded-[4px] transition-colors"
                        >
                            option 3
                        </motion.button>
                        <motion.button
                            whileHover={{ backgroundColor: "#3575ff" }}
                            whileTap={{ scale: 0.98 }}
                            className="
                            bg-[#1e1e1e] w-full text-start border-0
                            font-[Inter-medium] text-[#FFF] text-[12px]
                            p-[6px] rounded-[4px] transition-colors"
                        >
                            option 4
                        </motion.button>
                    </div>
                )}
            </>
        )
    }

    const ContextMenuNode = () => {
        return (
            <>
                {(contextMenuNode.visible) && (
                    <div className="min-w-[200px] fixed flex flex-col p-[10px] gap-[5px] bg-[#1e1e1e] rounded-[8px] z-50 shadow-[0px_5px_16px_0px_rgba(0,_0,_0,_0.1)] select-none"
                         style={{
                             left: `${contextMenuNode.x}px`,
                             top: `${contextMenuNode.y}px`,
                         }}
                         onClick={(e) => e.stopPropagation()}
                    >
                        <motion.button
                            whileHover={{ backgroundColor: "#3575ff" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                if (currentSelectedNodeId) {
                                    deleteNodeQuery({ nodeId: currentSelectedNodeId })
                                    dispatch(deleteNode(currentSelectedNodeId))
                                    setContextMenuNode({
                                        visible: false,
                                        x: 0,
                                        y: 0,
                                    })
                                }
                            }}
                            className="
                            bg-[#1e1e1e] w-[full] text-start border-0 font-[Inter-medium] text-[#FFF] text-[12px] p-[6px] rounded-[4px]
                              transition-colors"
                        >
                            Delete
                        </motion.button>
                        <div className="w-full h-[1px] bg-[#505356]"></div>
                        <motion.button
                            onClick={handleInspect}
                            whileHover={{ backgroundColor: "#3575ff" }}
                            whileTap={{ scale: 0.98 }}
                            className="
                            bg-[#1e1e1e] w-full text-start border-0
                            font-[Inter-medium] text-[#FFF] text-[12px]
                            p-[6px] rounded-[4px] transition-colors"
                        >
                            Drill Down
                        </motion.button>
                    </div>
                )}
            </>
        )
    }

    const TreeUpdateIndicator = () => {
        return(
            <div className="absolute left-[30px] bottom-[30px] z-100 flex flex-row items-center gap-[10px]">
                <ClipLoader
                    size={20}
                    color={'#3575ff'}
                />
            </div>
        )
    }

    return (
        <div className={`z-2 relative flex h-full bg-[#F5F5F5] flex-1 overflow-hidden
               ${currentTool === "default" ? "cursor-default" : ""}
               ${currentTool === "node_creation" ? "cursor-crosshair" : ""}`}
            ref={canvasRef}
            onClick={handleCanvasClick} // одиночный лкм на холст
            onMouseDown={handleMouseDown}
            onMouseMove={(e) => {
                handleMouseMove(e);
                const { x, y } = getRelativeCursorPosition(e);
                dispatch(setCursorPosition({ x, y }));
            }}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onContextMenu={(e) => handleContextMenu(e, 'canvas')} // пкм по холсту или ноде
            onWheel={handleWheel}
        >

            <div className="relative w-full flex items-start justify-center mt-[20px]">
                <Toolbar></Toolbar>
            </div>
            <ContextMenuCanvas></ContextMenuCanvas>
            <ContextMenuNode></ContextMenuNode>

            <ModalNewObjectTypeCreation></ModalNewObjectTypeCreation>

            {((canvas_nodes_array.length == 0) && (!isChildrenLoading)) && (
                <div className="z-6 absolute w-full h-full flex items-center justify-center ">
                    <div className="select-none font-[Inter-medium] text-[#454545]">
                        This layer is empty
                    </div>
                </div>
            )}
            {(isChildrenLoading) && (
                <div className="flex flex-col z-10 absolute w-full bg-[#F5F5F5] h-full items-center justify-center ">
                    <RingLoader></RingLoader>
                </div>
            )}
            {(isCreateLoading || isUpdateLoading || isDeleteLoading) && (
                <TreeUpdateIndicator></TreeUpdateIndicator>
            )}

            <motion.div
                className="absolute  z-6 w-[1000px] h-[1000px] origin-center"
                style={{
                    x: position.x,
                    y: position.y,
                    scale: scale,
                }}
            >
                {canvas_nodes_array.map((node: CanvasNode) => (
                    <Node node={node} key={node.id}></Node>
                ))}
            </motion.div>

        </div>
    );
};