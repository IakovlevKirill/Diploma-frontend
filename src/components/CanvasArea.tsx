// src/components/CanvasArea.tsx
import { useState } from "react";
import { useDrop } from "react-dnd";
import {Toolbar} from "./Toolbar.tsx";

type CanvasObject = {
    id: string;
    type: string;
    x: number;
    y: number;
};

export const CanvasArea = () => {
    const [objects, setObjects] = useState<CanvasObject[]>([]);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const [, drop] = useDrop({
        accept: "tool",
        drop: (item: { type: string }, monitor) => {
            const offset = monitor.getClientOffset();
            if (!offset) return;

            const newObject: CanvasObject = {
                id: Math.random().toString(36).substring(2, 9),
                type: item.type,
                x: offset.x - position.x,
                y: offset.y - position.y,
            };

            setObjects([...objects, newObject]);
        },
    });

    return (
        <div
            ref={drop}
            className="flex-1 relative bg-gray-50 overflow-hidden"
            onScroll={(e) => {
                setPosition({
                    x: e.currentTarget.scrollLeft,
                    y: e.currentTarget.scrollTop,
                });
            }}
        >
            <Toolbar></Toolbar>
            <div className="absolute bg-[#F5F5F5] z-1 w-[5000px] h-[5000px] bg-grid bg-repeat">
                {objects.map((obj) => (
                    <div
                        key={obj.id}
                        className="absolute p-3 bg-white border border-blue-300 rounded shadow cursor-move"
                        style={{
                            left: `${obj.x}px`,
                            top: `${obj.y}px`,
                        }}
                    >
                        {obj.type}
                    </div>
                ))}
            </div>
        </div>
    );
};