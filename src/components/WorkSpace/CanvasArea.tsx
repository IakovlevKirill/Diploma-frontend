import { Toolbar } from "./components/Toolbar.tsx";
import {
    useAppDispatch,
    useAppSelector
} from "../../app/hooks.ts";
import {CanvasNode} from "../../store/types.ts";
import {Route} from "./components/Route.tsx";
import {setCurrentNode} from "../../app/slices/Node/CurrentNodeSlice.ts";
import {
    addNode,
    deleteNode,
    updateNodePosition
} from "../../app/slices/Node/CanvasNodesSlice.ts";
import {setCurrentTool} from "../../app/slices/WorkSpace/currentToolSlice.ts";
import {incrementNodeCount} from "../../app/slices/Node/NodeCountSlice.ts";
import * as React from "react";
import {
    useEffect,
    useRef,
    useState
} from "react";
import {
    motion
} from "framer-motion";
import {
    useCreateNodeMutation,
    useDeleteNodeMutation,
    useUpdateNodeMutation
} from "../../api/testApi.ts";
import {
    useLocation,
    useNavigate,
    useParams,
    useSearchParams
} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {images} from "../../assets/images/images.ts";

export const CanvasArea = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const currentLayerId = searchParams.get('node') || null;

    console.log(currentLayerId);

    const projectId = useParams()

    const [createNode, { isLoading : isCreateLoading}] = useCreateNodeMutation();
    const [updateNode, { isLoading : isUpdateLoading}] = useUpdateNodeMutation();
    const [deleteNodeQuery, { isLoading : isDeleteLoading}] = useDeleteNodeMutation();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const currentTool = useAppSelector((state) => state.currentTool.tool);
    const currentSelectedNodeId = useAppSelector((state) => state.currentNode.node_id);
    const node_array = useAppSelector((state) => state.nodes.nodes);
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
    const [scale, setScale] = useState(1);

    const canvasRef = useRef<HTMLDivElement>(null);
    const isPanning = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });

    const handleInspect = () => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('node', currentSelectedNodeId);
        navigate({ search: searchParams.toString() });
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
    const handleNodeClick = (e: React.MouseEvent, obj: CanvasNode) => {
        e.stopPropagation();
        dispatch(setCurrentNode({
            id: obj.id,
            name: obj.name,
            color: obj.color,
        }));
        dispatch(setCurrentTool('default'));
    };

    // Обработчик нажатия на холст
    const handleCanvasClick = (e: React.MouseEvent) => {
        if (currentTool == 'default') return;

        if (contextMenuCanvas.visible) {
            setContextMenuCanvas({ ...contextMenuCanvas, visible: false });
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

        // TODO, мне запрос по идее возвращает ноду с айдишником, надо как то подменить оптимистичную на серверную
        createNode({
            name: `node` + objects_count,
            projectId: String(projectId.projectId),
            position: {x: x, y: y},
            size: {width: 120, height: 80},
            parent: 'root',
            children: [],
            color: '#D9D9D9',
        })

        dispatch(addNode(newNode));
        dispatch(incrementNodeCount());
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
                dispatch(setCurrentNode({id: node.id, name: node.name, color: node.color}))
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
    {/*
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
    */}

    // Обработчики для drag and drop

    const handleDragStart = (e: React.MouseEvent, node: CanvasNode) => {
        setCurrentDraggedNode(node);
        e.stopPropagation();
        setIsDragging(true);
        setDragStartPos({
            x: e.clientX - position.x - node.position.x * scale,
            y: e.clientY - position.y - node.position.y * scale
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
        const currentNode = node_array.find(n => n.id === currentDraggedNode.id);
        if (!currentNode) return;

        const newNodeCoordinates = {
            id: String(currentNode.id),
            x: Number(currentNode.position.x),
            y: Number(currentNode.position.y),
        };

        updateNode(newNodeCoordinates)
            .unwrap()
            .catch((error) => console.error("Update failed:", error));

        setIsDragging(false);
        setCurrentDraggedNode(null);
    };

    const Node = (props: {key: string; node: CanvasNode;}) => {
        return (
            <div
                onDoubleClick={()=>{navigate(`${currentSelectedNodeId}`)}} // дабл клик -> проваливаемся на уровень ниже
                onContextMenu={(e) => {
                    handleContextMenu(e, 'node', props.node)
                }}
                onClick={(e) => {
                    handleNodeClick(e, props.node)
                }} // лкм на ноду
                onMouseDown={(e) => {
                    if (currentTool === 'default') {
                        handleDragStart(e, props.node);
                    }
                }}
                onMouseMove={handleDrag}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                className={`absolute z-99 border-2 border-[#F5F5F5] 
                            ${(currentSelectedNodeId === props.node.id) ? "border-[2px] border-[#0d99ff]!": ""}
                            
                            ${isDragging ? "rounded-[0px] hover:border-[2px] cursor-pointer" : "cursor-pointer"}
                            
                        `}
                style={{
                    left: `${props.node.position.x}px`,
                    top: `${props.node.position.y}px`,
                    width: `${props.node.size.width}px`,
                    height: `${props.node.size.height}px`,
                    backgroundColor: props.node.color
                }}
            />
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
                                deleteNodeQuery({ nodeId: currentSelectedNodeId })
                                dispatch(deleteNode(currentSelectedNodeId))
                                setContextMenuNode({
                                    visible: false,
                                    x: 0,
                                    y: 0,
                                })
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
                            Inspect
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
        <div className={`z-1 relative flex h-full w-[85%] bg-[#F5F5F5] flex-1 overflow-hidden
                ${currentTool === "default" ? "cursor-default" : ""}
                ${currentTool === "node_creation" ? "cursor-crosshair" : ""}
                ${currentTool === "link" ? "cursor-crosshair" : ""}
                ${currentTool === "text" ? "cursor-text" : ""}`}
             ref={canvasRef}
             onClick={handleCanvasClick} // одиночный лкм на холст
             onMouseDown={handleMouseDown}
             onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}
             onMouseLeave={handleMouseUp}
             onContextMenu={(e) => handleContextMenu(e, 'canvas')} // пкм по холсту или ноде
            // onWheel={handleWheel} пока что выключил потому что работает не корректно
        >
            <Route />
            <Toolbar />
            <ContextMenuCanvas></ContextMenuCanvas>
            <ContextMenuNode></ContextMenuNode>
            <div className="absolute z-20 right-[0] flex flex-row">
                <div className="hidden flex-col items-center border-[0px] p-[10px] gap-[10px]">
                    <div className="w-[20px] h-[20px] font-[Inter-medium]">
                        root
                    </div>
                    <div className="w-[20px] h-[20px] font-[Inter-medium]">
                        root
                    </div>
                    <div className="w-[20px] h-[20px] font-[Inter-medium]">
                        root
                    </div>
                    <div className="w-[20px] h-[20px] font-[Inter-medium]">
                        root
                    </div>
                </div>
                <div className="flex flex-col items-center border-[0px] p-[10px]">
                    <div className="cursor-pointer rounded-[100px] border-[3px] w-[17px] h-[17px]"></div>
                    <div className="w-[2px] h-[10px] bg-[#000]"></div>
                    <img className="cursor-pointerw-[20px] h-[20px]" src={images.node_icon_black} alt=""/>
                    <div className="w-[2px] h-[10px] bg-[#000]"></div>
                    <img className="cursor-pointer w-[20px] h-[20px]" src={images.node_icon_black} alt=""/>
                    <div className="w-[2px] h-[10px] bg-[#000]"></div>
                    <img className="cursor-pointer w-[20px] h-[20px]" src={images.node_icon_black} alt=""/>
                </div>
            </div>
            {(isCreateLoading || isUpdateLoading || isDeleteLoading) && (
                <TreeUpdateIndicator></TreeUpdateIndicator>
            )}
            <motion.div
                className="absolute bg-[#F5F5F5] z-1 w-[1000px] h-[1000px] origin-center"
                style={{
                    x: position.x,
                    y: position.y,
                    scale: scale,
                }}
            >
                {node_array.map((node: CanvasNode) => (
                    <Node node={node} key={node.id}></Node>
                ))}
            </motion.div>
        </div>
    );
};