import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {setCurrentObject} from "../../../app/slices/currentCanvasObjectSlice.ts";
import {setCurrentTool} from "../../../app/slices/currentToolSlice.ts";
import {useNavigate} from "react-router-dom";
import {images} from "../../../assets/images/images"
import React, {useEffect, useRef, useState} from "react";
import {useChangeProjectTitleMutation} from "../../../api/testApi.ts";
import {setCurrentProjectTitle} from "../../../app/slices/currentProjectSlice.ts";

export const LeftSidebar = () => {


    const node_array = useAppSelector((state) => state.canvasObjects.objects);
    const currentSelectedNodeId = useAppSelector((state) => state.currentObject.object_id);

    const currentProjectId = useAppSelector((state) => state.currentProject.currentProjectId);
    const currentProjectTitle = useAppSelector((state) => state.currentProject.currentProjectTitle);

    const [changeProjectTitle, {isLoading: isProjectTitleChangeLoading}] = useChangeProjectTitleMutation()

    const [isChangeTitleInputActive, setIsChangeTitleInputActive] = useState(true);

    const dispatch = useAppDispatch()

    const navigate = useNavigate();


    return (
        <div className="z-2 flex h-full w-[calc(20%)] bg-[#1C1F24] border-r-[1px] border-[#535558]">
            <div className="w-full h-full flex flex-col items-center">
                <div className="w-[calc(100%-40px)] h-[calc(15%-41px)] p-[20px] flex flex-col items-start justify-center gap-[15px] border-b-[1px] border-[#535558]">
                    <button
                        hidden={!isChangeTitleInputActive}
                        onClick={() => {
                            setIsChangeTitleInputActive(!isChangeTitleInputActive);
                        }}
                        className="w-full text-start select-none font-[Inter-semibold] text-[#FFF] text-[20px] p-[4px] rounded-[8px]
                    border-[1px]
                    border-[#1C1F24]
                    bg-[#1C1F24]
                    hover:bg-[#5b5d61]"
                    >
                        {currentProjectTitle}
                    </button>
                    <input
                        hidden={isChangeTitleInputActive || !currentProjectTitle}
                        id="title-input"
                        defaultValue={currentProjectTitle || ""}
                        onBlur={(e) => {
                            console.log(currentProjectTitle);
                            const newTitle = e.target.value;
                            changeProjectTitle({
                                projectId: currentProjectId,
                                projectTitle: newTitle,
                            });
                            dispatch(setCurrentProjectTitle(newTitle));
                            setIsChangeTitleInputActive(!isChangeTitleInputActive);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                // @ts-ignore
                                const newTitle = e?.target?.value;
                                changeProjectTitle({
                                    projectId: currentProjectId,
                                    projectTitle: newTitle,
                                });
                                dispatch(setCurrentProjectTitle(newTitle))
                                setIsChangeTitleInputActive(!isChangeTitleInputActive);
                            }
                        }}
                        type="text"
                        className="
                         w-full select-none font-[Inter-semibold] text-[#FFF] bg-[#1C1F24] border-[1px] text-[20px] p-[4px] rounded-[8px]
                         focus:outline-none"
                    />
                    <div className="flex flex-row flex-wrap gap-[10px]">
                        <button
                            onClick={()=>{
                                navigate('/projects');
                            }}
                            className="p-[4px] flex font-[Inter-medium] text-[12px] rounded-[8px] border-0
                            bg-[#1c1f24]
                            text-[#9C9C9C]
                            hover:bg-[#D9D9D9]
                            hover:text-[black]
                            ">Menu
                        </button>
                        <button
                            className="p-[4px] flex font-[Inter-medium] text-[12px] rounded-[8px] border-0
                            bg-[#1c1f24]
                            text-[#9C9C9C]
                            hover:bg-[#D9D9D9]
                            hover:text-[black]
                            ">Duplicate project
                        </button>
                        <button className="p-[4px] flex font-[Inter-medium] text-[12px] rounded-[8px] border-0
                            bg-[#1c1f24]
                            text-[#9C9C9C]
                            hover:bg-[#D9D9D9]
                            hover:text-[black]
                            ">Move to trash
                        </button>
                        <button className="p-[4px] flex font-[Inter-medium] text-[12px] rounded-[8px] border-0
                            bg-[#1c1f24]
                            text-[#9C9C9C]
                            hover:bg-[#D9D9D9]
                            hover:text-[black]
                            ">Export
                        </button>
                    </div>
                </div>
                <div className="w-[calc(100%-40px)] h-[80%] p-[20px] py-[0px] flex flex-col">
                    <div className="h-[8%] w-full flex items-center justify-start">
                        <span className="select-none flex font-[Inter-medium] text-[#FFF]">Layers</span>
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
                                    className={`w-[calc(100%-10px)] p-[5px] flex flex-row items-center justify-start gap-[15px] select-none cursor-pointer text-center rounded-[4px]
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