import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {setCurrentNode} from "../../../app/slices/Node/CurrentNodeSlice.ts";
import {setCurrentTool} from "../../../app/slices/WorkSpace/currentToolSlice.ts";
import {useNavigate} from "react-router-dom";
import {images} from "../../../assets/images/images"
import React, {useEffect, useRef, useState} from "react";
import {
    useChangeProjectTitleMutation,
    useDuplicateProjectMutation
} from "../../../api/testApi.ts";
import {store} from "../../../store/store.ts";
import {setModalVisibility} from "../../../app/slices/WorkSpace/DeleteProjectModalSlice.ts";

interface LeftSidebarProps {
    projectTitle: string;
    userId: string;
    projectId: string;
}

export const LeftSidebar = ( props: LeftSidebarProps) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const all_node_array = useAppSelector((state) => state.nodes.all_nodes);
    const currentSelectedNodeId = useAppSelector((state) => state.currentNode.node?.id);

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

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing.current) return;
        const newWidth = e.clientX; // Новая ширина = позиция курсора по X
        if (newWidth > 200 && newWidth < 600) { // Минимальная и максимальная ширина
            setWidth(newWidth);
            localStorage.setItem('canvas_left_sidebar_width', String(newWidth))
        }
    };

    const [width, setWidth] = useState(localStorage.getItem("canvas_left_sidebar_width") || 300); // Начальная ширина
    const isResizing = useRef(false);

    const startResize = (e: React.MouseEvent) => {
        e.preventDefault();
        isResizing.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopResize);
    };

    const stopResize = () => {
        isResizing.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', stopResize);
    };

    // Убираем обработчики при размонтировании
    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', stopResize);
        };
    }, []);

    return (
        <div
            className="h-[95vh] z-12 left-[0px] flex bg-[#1C1F24] border-r-[1px] border-[#535558]"
            style={{ width: `${width}px` }}
        >
            <div className="w-full h-full flex flex-col items-center">
                <div className="w-[calc(100%-40px)] h-[calc(15%-41px)] p-[20px] flex flex-col items-start justify-center gap-[10px] border-b-[1px] border-[#535558]">
                    <div className="w-full overflow-hidden">
                        <button
                            hidden={!isChangeTitleInputActive}
                            onClick={() => {
                                setIsChangeTitleInputActive(!isChangeTitleInputActive);
                            }}
                            className="w-[calc(100%)] overflow-hidden text-[20px] p-[4px] rounded-[8px] text-start select-none font-[Inter-semibold] text-[#FFF]
                                border-[1px]
                                border-[#1C1F24]
                                bg-[#1C1F24]
                                hover:bg-[#5b5d61]
                                hover:border-[#5b5d61]"
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
                    <div className="flex flex-row select-none flex-wrap gap-[3px]">
                        <button
                            onClick={()=>{
                                console.log('Before navigate back', store.getState()); // добавьте это
                                navigate("/projects", { replace: true })
                                window.location.reload()
                            }}
                            className="p-[4px] flex font-[Inter-medium] text-[12px] rounded-[8px] border-0
                            bg-[#1c1f24]
                            text-[#9C9C9C]
                            hover:bg-[#D9D9D9]
                            hover:text-[black]
                            ">Back to files
                        </button>
                        <button
                            onClick={()=>{
                                console.log('Before navigate back', store.getState()); // добавьте это
                                navigate("/projects", { replace: true })
                                window.location.reload()
                            }}
                            className="p-[4px] flex font-[Inter-medium] text-[12px] rounded-[8px] border-0
                            bg-[#1c1f24]
                            text-[#9C9C9C]
                            hover:bg-[#D9D9D9]
                            hover:text-[black]
                            ">Settings
                        </button>
                        <button
                            onClick={ async ()=>{

                                const response = await duplicateProject({
                                    userId: props.userId,
                                    newTitle: title + ' ' + 'Copy'
                                }).unwrap();

                                if (response.result == "success") {
                                    const newUrl = `/workspace/project/${response.data.project.id}`
                                    navigate(newUrl)
                                    window.open(newUrl, '_blank')
                                }
                            }}
                            className="p-[4px] flex font-[Inter-medium] text-[12px] rounded-[8px] border-0
                            bg-[#1c1f24]
                            text-[#9C9C9C]
                            hover:bg-[#D9D9D9]
                            hover:text-[black]
                            ">Duplicate
                        </button>
                        <button
                            onClick={ () => {
                                dispatch(setModalVisibility(true))
                            }}
                            className="p-[4px] flex font-[Inter-medium] text-[12px] rounded-[8px] border-0
                            bg-[#1c1f24]
                            text-[#9C9C9C]
                            hover:bg-[#D9D9D9]
                            hover:text-[black]
                            ">Delete
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
                <div className="w-[calc(100%-20px)] h-[85%] pl-[20px] pr-[4px] flex flex-col">
                    <div className="h-[8%] w-full flex items-center justify-start">
                        <span className="text-[16px] select-none flex font-[Inter-medium] text-[#FFF]">Nodes</span>
                    </div>
                    <div className={`h-[92%] w-full flex
                     overflow-y-auto 
                     canvas_sidebar_scrollbar
                     scroll-smooth`}>
                        <div className="w-full h-full flex flex-col items-center gap-[10px] pr-[3px]">
                            {all_node_array.map((node) => (
                                <div
                                    onClick={() => {
                                        dispatch(setCurrentNode({
                                            id: node.id,
                                            name: node.name,
                                            color: node.color,
                                            children: node.children,
                                            parentId: node.parentId,
                                            position: node.position,
                                            size: node.size
                                        }))
                                        dispatch(setCurrentTool("default"))
                                    }}
                                    key={node.id}
                                    className={`w-[calc(100%-10px)] text-[14px] p-[5px] flex flex-row items-center justify-start gap-[15px] select-none cursor-pointer text-center rounded-[4px]
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
            <div
                className="w-[5px] h-full cursor-ew-resize bg-transparent "
                onMouseDown={startResize}
            >
            </div>
        </div>
    );
};