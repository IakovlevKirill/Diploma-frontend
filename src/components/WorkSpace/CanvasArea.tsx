import { Toolbar } from "./components/Toolbar.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {CanvasObject} from "../../store/types.ts";
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
    const currentSelectedObjectId = useAppSelector((state) => state.currentObject.object_id);
    const objects_array = useAppSelector((state) => state.canvasObjects.objects);
    const objects_count = useAppSelector((state) => state.objectCount.objectCount);

    // Состояния для перемещения объекта
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragStartPos, setDragStartPos] = React.useState({ x: 0, y: 0 });
    const [currentDraggedObject, setCurrentDraggedObject] = React.useState<CanvasObject | null>(null);

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (currentTool == 'default') return

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newObject: CanvasObject = {
            id: Math.random().toString(36).substring(2, 9),
            name: `rectangle ` + objects_count,
            type: currentTool,
            color: '#D9D9D9',
            width: 120,
            height: 80,
            x: x,
            y: y,
        };

        dispatch(addObject(newObject))
        dispatch(incrementObjectCount())
    };

    const handleObjectClick = (e: React.MouseEvent, obj: CanvasObject) => {
        e.stopPropagation();
        dispatch(setCurrentObject({
            id: obj.id,
            name: obj.name,
            color: obj.color,
        }));
        dispatch(setCurrentTool('default'));
    };

    const handleMouseDown = (e: React.MouseEvent, obj: CanvasObject) => {
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
        <div
            className={`flex-1 relative bg-gray-50 overflow-hidden w-[80%]
                ${currentTool === "default" ? "cursor-default" : ""}
                ${currentTool === "square" ? "cursor-crosshair" : ""}
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
                {objects_array.map((obj) => (
                    <div
                        key={obj.id}
                        onClick={(e) => handleObjectClick(e, obj)}
                        onMouseDown={(e) => handleMouseDown(e, obj)}
                        className={`absolute z-99 border-2 border-[#F5F5F5]
                            ${(obj.type === "square" && !isDragging)
                            ? "rounded-[0px] hover:border-[2px] cursor-pointer"
                            : ""
                        }
                            ${(obj.type === "square" && currentSelectedObjectId === obj.id)
                            ? "border-[2px] border-[#0d99ff]!"
                            : ""
                        }
                            ${isDragging && currentDraggedObject?.id === obj.id ? "cursor-grabbing" : "cursor-grab"}
                        `}
                        style={{
                            left: `${obj.x}px`,
                            top: `${obj.y}px`,
                            width: `${obj.width}px`,
                            height: `${obj.height}px`,
                            backgroundColor: obj.color
                        }}
                    />
                ))}
            </div>
        </div>
    );
};