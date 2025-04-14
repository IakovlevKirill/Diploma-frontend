import { Panel } from "./Panel.tsx";
import { HexColorPicker } from "react-colorful";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { changeColor } from "../../app/slices/CanvasObjectsSlice.ts";
import { useEffect, useState } from "react";

export const RightSidebar = () => {
    const dispatch = useAppDispatch();

    // Получаем текущий выбранный объект
    const selectedObject = useAppSelector((state) => {
        const currentId = state.currentObject.object_id;
        return state.canvasObjects.objects.find(obj => obj.id === currentId);
    });

    const [color, setColor] = useState(selectedObject?.color || '#000000');

    // Обновляем локальный цвет при изменении выбранного объекта
    useEffect(() => {
        setColor(selectedObject?.color || '#000000');
    }, [selectedObject]);

    return (
        <Panel position="right">
            <div className="px-[10px] py-[50px]">
                <div className="font-[Inter] text-[20px] text-center">Properties</div>

                {(selectedObject) && (
                    <div className="flex flex-col items-center mt-[100px]">
                        <HexColorPicker
                            color={color}
                            onChange={(newColor) => {
                                setColor(newColor);
                                dispatch(changeColor({
                                    id: selectedObject?.id,
                                    color: newColor
                                }));
                            }}
                        />
                        <div className="font-[Inter] text-[16px] mt-[50px]">
                            Selected color: <span className="font-[Inter] text-[16px]">{color}</span>
                        </div>
                    </div>
                )}
            </div>
        </Panel>
    );
};