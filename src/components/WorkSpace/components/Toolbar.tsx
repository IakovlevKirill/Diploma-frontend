import {images} from '../../../assets/images/images'
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {setCurrentTool} from "../../../app/slices/WorkSpace/currentToolSlice.ts";
import * as React from "react";

export const Toolbar = () => {

    const currentTool = useAppSelector((state) => state.currentTool.tool);

    const dispatch = useAppDispatch();

    const handleToolbarClick = (e : React.MouseEvent) => {
        e.stopPropagation(); // Останавливаем всплытие события
    };

    return (
        <div onClick={handleToolbarClick} className="absolute z-5 left-1/2 top-[1%]">
            <div className="select-none cursor-default gap-[10px] px-[10px] py-[5px] flex items-center bg-[#FFFFFF] rounded-[10px] border-[1px] border-[#EBEBEB] shadow-[0px_5px_16px_0px_rgba(0,_0,_0,_0.1)]">
                <button
                    className={`bg-[white] flex items-center justify-center border-[1px] border-[white] w-[35px] h-[35px] rounded-[8px]
                    hover:bg-[#F2F2F2] focus:outline-[0]
                    ${currentTool === "default" ? "bg-[#3575FF]! border-[1px] " : ""}
                    `}
                    onClick={() => {
                        dispatch(setCurrentTool("default"))
                        console.log(currentTool)
                    }}
                >
                    {(currentTool === "default") && (
                        <img className="w-full" src={images.move_hand_toolbox_active} alt=""/>
                    )}
                    {(currentTool !== "default") && (
                        <img className="w-full" src={images.move_hand_toolbox} alt=""/>
                    )}
                </button>
                <button
                    className={`bg-[white] flex items-center justify-center border-[1px] border-[white] w-[35px] h-[35px] rounded-[8px]
                    hover:bg-[#F2F2F2] focus:outline-[0]
                    ${currentTool === "node_creation" ? "bg-[#3575FF]! border-[1px] " : ""}
                    `}
                    onClick={() => {
                        dispatch(setCurrentTool("node_creation"))
                        console.log(currentTool)
                    }}
                >
                    {(currentTool === "node_creation") && (
                        <img className="w-full" src={images.cell_active_tollbar} alt=""/>
                    )}
                    {(currentTool !== "node_creation") && (
                        <img className="w-full" src={images.cell_toolbar} alt=""/>
                    )}
                </button>
                {/*
                <button
                    className={`bg-[white] flex items-center justify-center border-[1px] border-[white] w-[35px] h-[35px] rounded-[8px]
                    hover:bg-[#F2F2F2] focus:outline-[0]
                    ${currentTool === "link" ? "bg-[#3575FF]! border-[1px] " : ""}
                    `}
                    onClick={() => {
                        dispatch(setCurrentTool("link"))
                        console.log(currentTool)
                    }}
                >
                    {(currentTool === "link") && (
                        <img className="w-full" src={link_active} alt=""/>
                    )}
                    {(currentTool !== "link") && (
                        <img className="w-full" src={link} alt=""/>
                    )}
                </button>
                <button
                    className={`bg-[white] flex items-center justify-center border-[1px] border-[white] w-[35px] h-[35px] rounded-[8px]
                    hover:bg-[#F2F2F2] focus:outline-[0]
                    ${currentTool === "text" ? "bg-[#3575FF]! border-[1px] " : ""}
                    `}
                    onClick={() => {
                        dispatch(setCurrentTool("text"))
                        console.log(currentTool)
                    }}
                >
                    {(currentTool === "text") && (
                        <img className="w-full" src={text_toolbar_active} alt=""/>
                    )}
                    {(currentTool !== "text") && (
                        <img className="w-full" src={text_toolbar} alt=""/>
                    )}
                </button>
                */}
            </div>
        </div>
    );
};