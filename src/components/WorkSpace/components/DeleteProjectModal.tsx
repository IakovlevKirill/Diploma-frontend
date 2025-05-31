import React from 'react';
import {images} from "../../../assets/images/images.ts";
import {useAppDispatch} from "../../../app/hooks.ts";
import {setModalVisibility} from "../../../app/slices/WorkSpace/DeleteProjectModalSlice.ts";
import {useDeleteProjectMutation} from "../../../api/testApi.ts";
import {useNavigate} from "react-router-dom";
import {deleteProject} from "../../../app/slices/Project/ProjectsSlice.ts";
import {Project} from "../../../store/types.ts";

export const DeleteProjectModal = ( props: {projectId: string, project: Project}) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [deleteProjectRequest] = useDeleteProjectMutation()

    return (
        <button
            onClick={() => {
                dispatch(setModalVisibility(false))
            }}
            className="absolute bottom-[0%] z-[3] w-[100vw] h-[95vh] bg-[rgba(17,25,40,0.5)] backdrop-blur-md border-[0px]">
            <div className="w-full h-full relative flex flex-col items-center justify-center">
                <div className="z-[4] relative flex flex-col bg-[#FFF] p-[50px] rounded-[15px] gap-[20px]">
                    <button
                        onClick={() => {
                            dispatch(setModalVisibility(false))
                        }}
                        className="w-[25px] h-[25px] right-[5%] top-[5%] px-[0px] absolute border-[0px] bg-[#FFF] cursor-pointer">
                        <img className="w-[25px] h-[25px]" src={images.close_modal_icon} alt=""/>
                    </button>
                    <div className="font-[Inter-medium] text-center">Are u sure?</div>
                    <button
                        onClick={ () => {
                            dispatch(setModalVisibility(false))
                            dispatch(deleteProject(props.project))
                            deleteProjectRequest(props.projectId)
                            // TODO не работает удаление в стейте
                            navigate('/projects')
                        }}
                        className="font-[Inter-medium] border-[0px] bg-[#FF4747] text-[#FFF] rounded-[5px] p-[7px] cursor-pointer">
                        Confirm delete
                    </button>
                </div>
            </div>
        </button>
    );
};