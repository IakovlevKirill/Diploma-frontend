import React from 'react';
import plus_icon from "../../../src/assets/images/Add_Plus.png"
import delete_icon from "../../../src/assets/images/Trash_Full.png"
import paperclip from "../../../src/assets/images/Paperclip_Attechment_Tilt.png"
import {useCreateProjectMutation, useGetAllProjectsQuery} from "../../api/testApi.ts";
import {useNavigate} from "react-router-dom";

export const Projects = () => {

    const navigate = useNavigate();

    const [createProject, { isLoading: isProjectCreationLoading }] = useCreateProjectMutation();
    const current_user_userId = localStorage.getItem("userId")!;

    const { data: projectsData, isLoading: isAllProjectsLoading } = useGetAllProjectsQuery(current_user_userId);

    const onCreateProject = async () => {
        if (current_user_userId) {
            try {
                const response = await createProject({
                    title: 'New project',
                    content: '',
                    userId: current_user_userId
                }).unwrap();

                if (response.id) {
                    navigate(`/workspace/${response.id}`);
                }
            } catch (error) {
                console.error('Project creation failed:', error);
            }
        }
    };

    if (isProjectCreationLoading || isAllProjectsLoading) {
        return (
            <div className="flex flex-col font-[Inter] bg-[#131519] w-[84%] text-[#FFF] ">
                <span className="p-[30px]">Loading...</span>
            </div>
        )
    }

    return (
        <div className="w-[84%] flex flex-row bg-[#131519] overflow-y-scroll ">
            <div className="w-[83%] p-[50px]  flex flex-col">
                <div className="flex flex-col w-full gap-[16px]">
                    <div className="text-[#FFF] font-[Inter] font-semibold text-[40px]">Templates</div>
                    <div className="flex flex-row gap-[25px]">

                        <button
                            onClick={onCreateProject}
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
                    <div className="flex flex-row w-full mt-[30px] gap-[25px] flex-wrap">
                        {projectsData?.projects.map((project) => (
                            <button
                                key={project.id}
                                onClick={() => {
                                    navigate(`/workspace/${project.id}`)
                                }}
                                className="w-[calc(50%-12.5px)] bg-[#171C20] rounded-[10px] p-[25px] cursor-pointer border-[#515558] border-[1px] ">
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-col text-left gap-[5px]">
                                        <span className="text-[#FFF] font-[Inter] font-regular text-[20px]">{project.title}</span>
                                        <div className="text-[#FFF] font-[Inter] font-regular text-[12px]">Last updated - 27/04/2024</div>
                                    </div>
                                    <div className="flex flex-row items-center h-full gap-[24px]">
                                        <button className="flex bg-[#171C20]  border-0 p-0 focus:outline-none cursor-pointer items-center justify-center">
                                            <img className="w-[24px] h-[24px]" src={paperclip} alt=""/>
                                        </button>
                                        <button className="flex bg-[#171C20] border-0 p-0 focus:outline-none cursor-pointer items-center justify-center">
                                            <img className="w-[24px] h-[24px]" src={delete_icon} alt=""/>
                                        </button>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                    <div className="mt-[53px] w-full h-[1px] bg-[#4E5053]"></div>
                </div>

                <div className="flex flex-col w-full gap-[16px] mt-[56px] ">
                    <div className="text-[#FFF] font-[Inter] font-semibold text-[40px]">Latest Projects</div>
                    <div className="text-[#FFF] font-[Inter] font-semibold text-[20px]">12/07/24</div>
                    <div className="flex flex-row w-full mt-[30px] gap-[25px] flex-wrap">
                        {projectsData?.projects.map((project) => (
                            <button
                                key={project.id}
                                onClick={() => {
                                    navigate(`/workspace/${project.id}`)
                                }}
                                className="w-[calc(50%-12.5px)] bg-[#171C20] rounded-[10px] p-[25px] cursor-pointer border-[#515558] border-[1px] ">
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-col text-left gap-[5px]">
                                        <span className="text-[#FFF] font-[Inter] font-regular text-[20px]">{project.title}</span>
                                        <div className="text-[#FFF] font-[Inter] font-regular text-[12px]">Last updated - 27/04/2024</div>
                                    </div>
                                    <div className="flex flex-row items-center h-full gap-[24px]">
                                        <button className="flex bg-[#171C20]  border-0 p-0 focus:outline-none cursor-pointer items-center justify-center">
                                            <img className="w-[24px] h-[24px]" src={paperclip} alt=""/>
                                        </button>
                                        <button className="flex bg-[#171C20] border-0 p-0 focus:outline-none cursor-pointer items-center justify-center">
                                            <img className="w-[24px] h-[24px]" src={delete_icon} alt=""/>
                                        </button>
                                    </div>
                                </div>
                            </button>
                        ))}
                        <div className="w-full h-[10%]"></div>
                    </div>
                </div>
            </div>
            <div className="w-[17%]"></div>
        </div>
    );
};