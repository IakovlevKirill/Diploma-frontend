import {useCreateProjectMutation, useGetAllProjectsQuery} from "../api/testApi.ts";
import logout from "../assets/images/logout.png"
import {useNavigate} from "react-router-dom";

export const Menu = () => {
    const [createProject, { isLoading: isProjectCreationLoading }] = useCreateProjectMutation();
    const current_user_userId = localStorage.getItem("userId");
    const { data: projectsData, isLoading: isAllProjectsLoading } = useGetAllProjectsQuery(current_user_userId);
    const navigate = useNavigate();
    console.log(projectsData);

    const OnLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        navigate('/auth');
    };

    const onCreateProject = async () => {
        if (current_user_userId) {
            try {
                const response = await createProject({
                    title: 'New project',
                    content: '',
                    userId: current_user_userId
                }).unwrap();

                if (response.id) {
                    navigate(`/dashboard/${response.id}`);
                }
            } catch (error) {
                console.error('Project creation failed:', error);
            }
        }
    };

    if (isProjectCreationLoading || isAllProjectsLoading) {
        return <div className="flex flex-col">Loading...</div>;
    }

    return (
        <div className="flex flex-col w-screen h-screen overflow-hidden ">
            <div className="w-screen min-h-[50px] h-[5%] bg-[#0D0E11]"></div>
            <div className="w-[100vw] h-[95%] flex flex-row">
                <div className="flex flex-col items-center w-[16%] bg-[#191C21]">
                    dsd
                </div>
                <div className="w-[84%] p-[50px] flex flex-col bg-[#131519] overflow-y-scroll">
                    <div className="flex flex-col w-full gap-[16px]">
                        <div className="text-[#FFF] font-[Inter] font-semibold text-[40px]">Templates</div>
                        <div className="flex flex-row gap-[25px]">
                            <button
                                onClick={onCreateProject}
                                className="w-[50%] flex items-center px-[25px] text-[24px] text-[#FFF] font-[Inter] font-semibold rounded-[10px] bg-[#333E42] border-[1px] border-[#666E71] cursor-pointer">
                                <div>Create new project</div>
                            </button>
                            <div className="flex w-[175px] py-[35px] bg-[#1F2428] rounded-[10px] cursor-pointer items-center justify-center border-[#575B5E] border-[1px]">
                                <div className="text-[#FFF] font-[Inter] font-medium text-[16px] ">Template 1</div>
                            </div>
                            <div className="flex w-[175px] py-[35px] bg-[#1F2428] rounded-[10px] cursor-pointer items-center justify-center border-[#575B5E] border-[1px]">
                                <div className="text-[#FFF] font-[Inter] font-medium text-[16px] ">Template 2</div>
                            </div>
                            <div className="flex w-[175px] py-[35px] bg-[#1F2428] rounded-[10px] cursor-pointer items-center justify-center border-[#575B5E] border-[1px]">
                                <div className="text-[#FFF] font-[Inter] font-medium text-[16px] ">Template 3</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-[16px] mt-[56px]">
                        <div className="text-[#FFF] font-[Inter] font-semibold text-[40px]">Pinned Projects</div>
                        <div className="flex flex-row mt-[30px] flex-wrap">
                            {projectsData?.projects.map((project) => (
                                <button
                                    key={project.id}
                                    onClick={() => {
                                        navigate(`/dashboard/${project.id}`);
                                    }}
                                    className="w-[50%] bg-[#171C20] rounded-[10px] px-[25px] cursor-pointer border-[#515558] border-[1px] h-[86px]">
                                    <div className="flex flex-col p-[21px]">
                                        <span className="text-[#FFF] font-[Inter] font-regular text-[20px]">{project.title}</span>
                                        <div className="text-[#FFF] font-[Inter] font-regular text-[12px]">Last edit - </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-[53px] w-full h-[1px] bg-[#4E5053]"></div>
                    </div>
                    <div className="mt-[30px] flex flex-wrap gap-[30px]"></div>
                    <div className="flex flex-col w-full gap-[16px] mt-[56px]">
                        <div className="text-[#FFF] font-[Inter] font-semibold text-[40px]">Latest Projects</div>
                        <div className="text-[#FFF] font-[Inter] font-semibold text-[20px]">12/07/24</div>
                        <div className="flex flex-row mt-[30px] flex-wrap">
                            {projectsData?.projects.map((project) => (
                                <button
                                    key={project.id}
                                    onClick={() => {
                                        navigate(`/dashboard/${project.id}`);
                                    }}
                                    className="w-[50%] bg-[#171C20] rounded-[10px] px-[25px] cursor-pointer border-[#515558] border-[1px] h-[86px]">
                                    <div className="flex flex-col p-[21px]">
                                        <span className="text-[#FFF] font-[Inter] font-regular text-[20px]">{project.title}</span>
                                        <div className="text-[#FFF] font-[Inter] font-regular text-[12px]">Last edit - </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};