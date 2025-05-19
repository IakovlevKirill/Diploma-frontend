import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {setCurrentObject} from "../../../app/slices/currentCanvasObjectSlice.ts";
import {setCurrentTool} from "../../../app/slices/currentToolSlice.ts";
import {useNavigate} from "react-router-dom";
import {images} from "../../../assets/images/images"
import React from "react";

export const LeftSidebar = () => {

    const node_array = useAppSelector((state) => state.canvasObjects.objects);
    const currentSelectedNodeId = useAppSelector((state) => state.currentObject.object_id);

    const dispatch = useAppDispatch()

    const navigate = useNavigate();

    return (
        <div className="z-2 flex h-full w-[calc(15%)] bg-[#1C1F24] border-r-[1px] border-[#535558]">
            <div className="w-full h-full flex flex-col items-center">
                <div className="h-[calc(15%-1px)] w-full flex items-center justify-center border-b-[1px] border-[#535558]">
                    <button
                        onClick={ ()=>{
                            navigate('/projects')
                        }}
                        className="flex font-[Inter-medium] border-0 bg-[#FFFFFF] cursor-pointer hover:text-[#0d99ff] ">
                        Menu
                    </button>
                </div>
                <div className="w-[calc(100%-40px)] h-[85%] p-[20px] py-[0px] flex flex-col">
                    <div className="h-[8%] w-full flex items-center justify-start">
                        <span className="flex font-[Inter-medium] text-[#FFF]">Layers</span>
                    </div>
                    <div className="h-[92%] w-full flex overflow-y-scroll ">
                        <div className="w-full h-full flex flex-col items-center gap-[10px]">
                            {node_array.map((node) => (
                                <div
                                    onClick={() => {
                                        dispatch(setCurrentObject({color: node.color, id: node.id, name: node.name}));
                                        dispatch(setCurrentTool("default"))
                                    }}
                                    key={node.id}
                                    className={`w-[calc(100%-10px)] p-[5px] flex flex-row items-center justify-start gap-[15px] cursor-pointer text-center rounded-[4px]
                                    ${(currentSelectedNodeId == node.id) ? "bg-[#3575ff] " : "hover:bg-[#737578]"}
                                  `}>
                                    <img className="flex w-[20px]" src={images.node_icon_white} alt=""/>
                                    <span className="flex font-[Inter-medium] text-[#FFF]">{node.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};