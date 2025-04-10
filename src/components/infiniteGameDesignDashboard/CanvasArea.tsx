import { useState } from "react";
import { Toolbar } from "./Toolbar.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {CanvasObject} from "../../store/types.ts";
import {Route} from "./Route.tsx";
import {setCurrentObject} from "../../app/slices/currentCanvasObjectSlice.ts";

export const CanvasArea = () => {

    const dispatch = useAppDispatch();

    const currentTool = useAppSelector((state) => state.currentTool.tool);
    const currentSelectedObject = useAppSelector((state) => state.currentObject.object);

    const [objects, setObjects] = useState<CanvasObject[]>([]);

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (!currentTool) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newObject: CanvasObject = {
            id: Math.random().toString(36).substring(2, 9),
            type: currentTool,
            x,
            y,
        };

        setObjects([...objects, newObject]);

    };

    return (
        <div
            className={`flex-1 relative bg-gray-50 overflow-hidden 
            ${currentTool === "default" ? "cursor-default" : ""}
            ${currentTool === "square" ? "cursor-crosshair" : ""}
            ${currentTool === "link" ? "cursor-crosshair" : ""}
            ${currentTool === "text" ? "cursor-text" : ""}
            `}

            onClick={handleCanvasClick}
        >
            <Route></Route>
            <Toolbar/>


            <div className="absolute bg-[#F5F5F5] z-1 w-[5000px] h-[5000px]">
                {objects.map((obj) => (
                    <div
                        key={obj.id}
                        onClick={() => {
                            dispatch(setCurrentObject(obj.id));
                            if (currentSelectedObject == obj.id) { // Используем нестрогое сравнение ==
                                console.log(true);
                            } else {
                                console.log(false);
                                console.log("currentSelectedObject:", currentSelectedObject, typeof currentSelectedObject);
                                console.log("obj.id:", obj.id, typeof obj.id);
                            }
                        }}
                        className={`absolute z-99
                ${obj.type === "square"
                            ? "w-[50px] h-[50px] hover:border-[2px] hover:cursor-pointer hover:border-[#0d99ff] bg-[#D9D9D9]"
                            : ""
                        }
                ${(obj.type === "square" && currentSelectedObject == obj.id) // Используем нестрогое сравнение ==
                            ? "border-[2px] border-[#0d99ff]" // Убрал дублирование стилей, оставил только отличие
                            : ""
                        }
                ${obj.type === "link"
                            ? "w-[20px] h-[2px] bg-[black]"
                            : ""
                        }
            `}
                        style={{
                            left: `${obj.x}px`,
                            top: `${obj.y}px`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};