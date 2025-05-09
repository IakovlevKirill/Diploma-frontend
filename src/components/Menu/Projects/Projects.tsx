import React from 'react';
import plus_icon from "../../../assets/images/Add_Plus.png"
import delete_icon from "../../../assets/images/Trash_Full.png"
import paperclip from "../../../assets/images/Paperclip_Attechment_Tilt.png"
import {
    useCreateProjectMutation,
    useDeleteProjectMutation,
    useGetAllProjectsQuery, useGetPinnedProjectQuery,
    usePinProjectMutation
} from "../../../api/testApi.ts";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";

export const Projects = () => {

    const navigate = useNavigate();

    const [createProject, { isLoading: isProjectCreationLoading }] = useCreateProjectMutation();
    const [pinProject, { isLoading : pinLoading}] = usePinProjectMutation()
    const [deleteProject, { isLoading : deleteLoading}] = useDeleteProjectMutation()

    const current_user_userId = localStorage.getItem("userId")!;
    const { data: projectsData, isLoading: isAllProjectsLoading } = useGetAllProjectsQuery(current_user_userId);
    const { data: pinnedProjectsData, isLoading: isPinnedProjectsLoading } = useGetPinnedProjectQuery(current_user_userId);

    console.log(pinnedProjectsData)

    const onCreateProject = async () => {
        if (current_user_userId) {
            try {
                const response = await createProject({
                    title: 'New project',
                    content: '',
                    userId: current_user_userId,
                }).unwrap();

                if (response.id) {
                    navigate(`/workspace/${response.id}`);
                }
            } catch (error) {
                console.error('Project creation failed:', error);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex w-full h-full"
        >
            <div className="flex w-[calc(100%-100px)] h-[calc(100%-100px)] p-[50px] overflow-y-scroll ">
                <div className="w-[80%] flex flex-col">
                    <div className="flex flex-col w-full gap-[16px]">
                        <div className="text-[#FFF] font-[Inter] font-semibold text-[40px]">Templates</div>
                        <div className="flex flex-row gap-[25px]">

                            <button

                                className="w-[calc(50%-12.5px)] flex items-center justify-between px-[25px] text-[24px] text-[#FFF] font-[Inter] font-semibold rounded-[10px] bg-[#333E42] border-[1px] border-[#666E71] cursor-pointer">
                                <div>Create new project</div>
                                <img src={plus_icon} alt=""/>
                            </button>

                            <div className="w-[calc(50%-12.5px)] gap-[25px] flex flex-row justify-between">
                                <div className="flex w-[calc(33.3%-12.5px)] py-[35px] bg-[#1F2428] rounded-[10px] cursor-pointer items-center justify-center border-[#575B5E] border-[1px]">
                                    <div className="text-[#FFF] font-[Inter] font-medium text-[16px] ">Template 1</div>
                                </div>
                                <div className="flex w-[calc(33.3%-12.5px)] py-[35px] bg-[#1F2428] rounded-[10px] cursor-pointer items-center justify-center border-[#575B5E] border-[1px]">
                                    <div className="text-[#FFF] font-[Inter] font-medium text-[16px] ">Template 2</div>
                                </div>
                                <div className="flex w-[calc(33.4%-12.5px)] py-[35px] bg-[#1F2428] rounded-[10px] cursor-pointer items-center justify-center border-[#575B5E] border-[1px]">
                                    <div className="text-[#FFF] font-[Inter] font-medium text-[16px] ">Template 3</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-[16px] mt-[56px]">
                        <div className="text-[#FFF] font-[Inter] font-semibold text-[40px]">Pinned Projects</div>
                        <div className="flex flex-row w-full mt-[30px] flex-wrap" style={{ gap: "25px" }}>
                            {pinnedProjectsData?.projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="w-[calc(50%-12.5px)] bg-[#171C20] rounded-[10px]  border-[#515558] border-[1px] box-border">
                                    <div className="flex flex-row justify-between items-center">
                                        <button
                                            onClick={() => {
                                                navigate(`/workspace/${project.id}`);
                                            }}
                                            className="p-[25px] pr-[0px] w-[70%] flex flex-col text-left gap-[5px] bg-transparent cursor-pointer border-0 p-0">
                                            <span className="text-[#FFF] font-[Inter] font-regular text-[20px]">{project.title}</span>
                                            <div className="text-[#FFF] font-[Inter] font-regular text-[12px]">Last updated - {new Date(project.updatedAt).toLocaleDateString('en-GB')}</div>
                                        </button>
                                        <div className="w-[30%] p-[25px] pl-[0px] flex flex-row items-start justify-end h-full gap-[14px]">
                                            <button
                                                onClick={() => {
                                                    pinProject({projectId: project.id})
                                                }}
                                                className="flex bg-transparent border-0 p-[10px] focus:outline-none cursor-pointer">
                                                <img className="w-[24px] h-[24px]" src={paperclip} alt=""/>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const id = project.id
                                                    deleteProject(id)
                                                }}
                                                className="flex bg-transparent border-0 p-[10px] focus:outline-none cursor-pointer">
                                                <img className="w-[24px] h-[24px]" src={delete_icon} alt=""/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-[53px] w-full h-[1px] bg-[#4E5053]"></div>
                    </div>
                    <div className="flex flex-col w-full gap-[16px] mt-[56px] ">
                        <div className="text-[#FFF] font-[Inter] font-semibold text-[40px]">Latest Projects</div>
                        <div className="text-[#FFF] font-[Inter] font-semibold text-[20px]">12/07/24</div>
                        <div className="flex flex-row w-full mt-[30px] gap-[25px] flex-wrap">
                            {projectsData?.projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="w-[calc(50%-12.5px)] bg-[#171C20] rounded-[10px]  border-[#515558] border-[1px] box-border">
                                    <div className="flex flex-row justify-between items-center">
                                        <button
                                            onClick={() => {
                                                navigate(`/workspace/${project.id}`);
                                            }}
                                            className="p-[25px] pr-[0px] w-[70%] flex flex-col text-left gap-[5px] bg-transparent cursor-pointer border-0 p-0">
                                            <span className="text-[#FFF] font-[Inter] font-regular text-[20px]">{project.title}</span>
                                            <div className="text-[#FFF] font-[Inter] font-regular text-[12px]">Last updated - {new Date(project.updatedAt).toLocaleDateString('en-GB')}</div>
                                        </button>
                                        <div className="w-[30%] p-[25px] pl-[0px] flex flex-row items-start justify-end h-full gap-[14px]">
                                            <button
                                                onClick={() => {
                                                    pinProject({projectId: project.id})
                                                }}
                                                className="flex bg-transparent border-0 p-[10px] focus:outline-none cursor-pointer">
                                                <img className="w-[24px] h-[24px]" src={paperclip} alt=""/>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const id = project.id
                                                    deleteProject(id)
                                                }}
                                                className="flex bg-transparent border-0 p-[10px] focus:outline-none cursor-pointer">
                                                <img className="w-[24px] h-[24px]" src={delete_icon} alt=""/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="w-full h-[10%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};