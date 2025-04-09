import { useState } from "react";
import { Toolbar } from "./Toolbar";
import {useAppSelector} from "../app/hooks.ts";
import {currentToolType} from "../store/types.ts";

type CanvasObject = {
    id: string;
    type: currentToolType
    x: number;
    y: number;
};

export const CanvasArea = () => {

    const currentTool = useAppSelector((state) => state.currentTool.tool);

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
            ${currentTool !== "default" ? "cursor-crosshair" : "cursor-default"}
            `}

            onClick={handleCanvasClick}
        >
            <Toolbar/>

            {/* Область для объектов */}
            <div className="absolute bg-[#F5F5F5] z-1 w-[5000px] h-[5000px]">
                {objects.map((obj) => (
                    <div
                        key={obj.id}
                        className={`absolute ${obj.type === "square"
                            ? "w-20 h-20 bg-blue-500"
                            : "w-32 h-1 bg-red-500"}`}
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