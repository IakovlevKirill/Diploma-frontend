import { Toolbar } from "./components/Toolbar.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {CanvasNode} from "../../store/types.ts";
import {Route} from "./components/Route.tsx";
import {setCurrentObject} from "../../app/slices/currentCanvasObjectSlice.ts";
import {addObject} from "../../app/slices/CanvasObjectsSlice.ts";
import {setCurrentTool} from "../../app/slices/currentToolSlice.ts";
import {incrementObjectCount} from "../../app/slices/objectCountSlice.ts";
import {updateObject} from "../../app/slices/CanvasObjectsSlice.ts";
import * as React from "react";

export const CanvasArea = () => {
    const dispatch = useAppDispatch();

    const currentTool = useAppSelector((state) => state.currentTool.tool);

    const currentSelectedNodeId = useAppSelector((state) => state.currentObject.object_id);
    const node_array = useAppSelector((state) => state.canvasObjects.objects);
    const objects_count = useAppSelector((state) => state.objectCount.objectCount);

    // Состояния для перемещения объекта
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragStartPos, setDragStartPos] = React.useState({ x: 0, y: 0 });
    const [currentDraggedObject, setCurrentDraggedObject] = React.useState<CanvasNode | null>(null);

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (currentTool == 'default') return

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newNode: CanvasNode = {
            id: Math.random().toString(36).substring(2, 9),
            name: `node ` + objects_count,
            type: currentTool,
            color: '#D9D9D9',
            width: 120,
            height: 80,
            x: x,
            y: y,
        };

        dispatch(addObject(newNode))
        dispatch(incrementObjectCount())
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

    const handleMouseDown = (e: React.MouseEvent, obj: CanvasNode) => {
        if (e.button !== 0) return; // Проверяем, что нажата левая кнопка мыши

        setIsDragging(true);
        setCurrentDraggedObject(obj);
        setDragStartPos({
            x: e.clientX,
            y: e.clientY
        });

        // Выделяем объект при начале перемещения
        dispatch(setCurrentObject({
            id: obj.id,
            name: obj.name,
            color: obj.color,
        }));
        dispatch(setCurrentTool('default'));

        e.stopPropagation();
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !currentDraggedObject) return;

        const rect = e.currentTarget.getBoundingClientRect();


        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Вычисляем смещение
        const offsetX = e.clientX - dragStartPos.x;
        const offsetY = e.clientY - dragStartPos.y;

        console.log(currentDraggedObject)

        // Обновляем позицию объекта
        const updatedObject = {
            ...currentDraggedObject,
            x: currentDraggedObject.x + offsetX,
            y: currentDraggedObject.y + offsetY
        };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(updateObject(updatedObject));
        setCurrentDraggedObject(updatedObject);
        setDragStartPos({
            x: e.clientX,
            y: e.clientY
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setCurrentDraggedObject(null);
    };

    return (
        <div className="z-1 relative flex h-full w-[85%]">
            <div className={`w-full h-full flex-1 relative overflow-hidden
                ${currentTool === "default" ? "cursor-default" : ""}
                ${currentTool === "node_creation" ? "cursor-crosshair" : ""}
                ${currentTool === "link" ? "cursor-crosshair" : ""}
                ${currentTool === "text" ? "cursor-text" : ""}
            `}
                 onClick={handleCanvasClick}
                 onMouseMove={handleMouseMove}
                 onMouseUp={handleMouseUp}
                 onMouseLeave={handleMouseUp} // Остановить перемещение, если курсор вышел за пределы холста
            >
                <Route></Route>
                <Toolbar/>

                <div className="absolute bg-[#F5F5F5] z-1 w-[10000px] h-[5000px]">
                    {node_array.map((node) => (
                        <div
                            key={node.id}
                            onClick={(e) => handleNodeClick(e, node)}
                            onMouseDown={(e) => handleMouseDown(e, node)}
                            className={`absolute z-99 border-2 border-[#F5F5F5]
                            ${(node.type === "square" && !isDragging)
                                ? "rounded-[0px] hover:border-[2px] cursor-pointer"
                                : ""
                            }
                            ${(node.type === "square" && currentSelectedNodeId === node.id)
                                ? "border-[2px] border-[#0d99ff]!"
                                : ""
                            }
                            ${isDragging && currentDraggedObject?.id === node.id ? "cursor-grabbing" : "cursor-grab"}
                        `}
                            style={{
                                left: `${node.x}px`,
                                top: `${node.y}px`,
                                width: `${node.width}px`,
                                height: `${node.height}px`,
                                backgroundColor: node.color
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};