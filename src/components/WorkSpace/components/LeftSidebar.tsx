import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {setCurrentObject} from "../../../app/slices/currentCanvasObjectSlice.ts";
import {setCurrentTool} from "../../../app/slices/currentToolSlice.ts";
import {useNavigate} from "react-router-dom";
import {images} from "../../../assets/images/images"
import React, {useEffect, useRef, useState} from "react";
import {
    useChangeProjectTitleMutation,
    useDuplicateProjectMutation
} from "../../../api/testApi.ts";

interface LeftSidebarProps {
    projectTitle: string;
    userId: string;
}

export const LeftSidebar = ( props: LeftSidebarProps) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const node_array = useAppSelector((state) => state.canvasObjects.objects);
    const currentSelectedNodeId = useAppSelector((state) => state.currentObject.object_id);

    const inputRef = useRef(null);

    const currentProjectId = useAppSelector((state) => state.currentProject.currentProjectId);

    const [changeProjectTitle] = useChangeProjectTitleMutation()
    const [duplicateProject] = useDuplicateProjectMutation()

    const [isChangeTitleInputActive, setIsChangeTitleInputActive] = useState(true);
    const [title, setTitle] = useState<string>(props.projectTitle);

    useEffect(() => {
        if (!isChangeTitleInputActive && inputRef.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            inputRef.current.focus();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            inputRef.current.select();
        }
    }, [isChangeTitleInputActive]);




    return (
        <div className="z-2 flex h-full w-[calc(20%)] bg-[#1C1F24] border-r-[1px] border-[#535558]">
            <div className="w-full h-full flex flex-col items-center">
                <div className="w-[calc(100%-40px)] h-[calc(15%-41px)] p-[20px] flex flex-col items-start justify-center gap-[15px] border-b-[1px] border-[#535558]">
                    <div className="w-full ">
                        <button
                            hidden={!isChangeTitleInputActive}
                            onClick={() => {
                                setIsChangeTitleInputActive(!isChangeTitleInputActive);
                            }}
                            className="w-[calc(100%)] text-[20px] p-[4px] rounded-[8px] text-start select-none font-[Inter-semibold] text-[#FFF]
                    border-[1px]
                    border-[#1C1F24]
                    bg-[#1C1F24]
                    hover:bg-[#5b5d61]
                    hover:border-[#5b5d61]
                    "
                        >
                            {title}
                        </button>
                        <input
                            ref={inputRef}
                            hidden={isChangeTitleInputActive}
                            id="title-input"
                            placeholder="Enter title"
                            defaultValue={title}
                            onBlur={(e) => {
                                const newTitle = e.target.value;
                                changeProjectTitle({
                                    projectId: currentProjectId,
                                    projectTitle: newTitle,
                                });
                                setTitle(newTitle)
                                setIsChangeTitleInputActive(!isChangeTitleInputActive);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    const newTitle = e?.target?.value;
                                    changeProjectTitle({
                                        projectId: currentProjectId,
                                        projectTitle: newTitle,
                                    });
                                    setTitle(newTitle)
                                    setIsChangeTitleInputActive(!isChangeTitleInputActive);
                                }
                            }}
                            type="text"
                            className="
                         w-[calc(100%-10px)] text-[20px] p-[4px] rounded-[8px] select-none font-[Inter-semibold] text-[#FFF] bg-[#1C1F24] border-[1px]
                         focus:outline-none"
                        />
                    </div>
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
                            onClick={ async ()=>{
                                const response = await duplicateProject({
                                    userId: props.userId,
                                    newTitle: title + ' ' + 'Copy'
                                }).unwrap();

                                if (response) {
                                    setTitle(title + ' ' + 'Copy')
                                    const newUrl = `/workspace/${response.id}`
                                    navigate(newUrl)
                                    window.open(newUrl, '_blank')
                                }
                            }}
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