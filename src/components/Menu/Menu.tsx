import {useCreateProjectMutation, useGetAllProjectsQuery} from "../../api/testApi.ts";
import icon from "../../assets/images/icon.png"
import avatar_example from "../../assets/images/avatar_example.png"
import user_group from "../../assets/images/Users_Group.png"
import polygon_sidebar_open from "../../assets/images/polygon_sidebar_open.png"
import {useNavigate} from "react-router-dom";

export const Menu = () => {
    const [createProject, { isLoading: isProjectCreationLoading }] = useCreateProjectMutation();
    const current_user_userId = localStorage.getItem("userId");
    const { data: projectsData, isLoading: isAllProjectsLoading } = useGetAllProjectsQuery(current_user_userId);
    const navigate = useNavigate();

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
                    navigate(`/workspace/${response.id}`);
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
            <div className="flex flex-row items-center gap-[20px] px-[30px] w-screen min-h-[50px] h-[5%] bg-[#0D0E11] border-b-[1px] border-[#535558]">
                <img className="w-[26px] h-[26px]" src={icon} alt=""/>
                <span className="text-[#FFF] font-[Inter] font-bold text-[15px]">Lorem ipsum</span>
            </div>
            <div className="w-[100vw] h-[95%] flex flex-row">
                <div className="flex flex-col items-center w-[16%] h-full  bg-[#191C21] border-r-[1px] border-[#535558]">

                    <div className="flex flex-col h-[90%]">
                        <div className="flex flex-col h-[50%] w-full">
                            <div className="flex text-[#FFF] font-[Inter] font-regular text-[15px] px-[30px]">Search projects</div>
                            <div className="flex w-full py-[16px] ">
                                <div className="flex flex-col w-full px-[30px]">
                                    <input
                                        className="flex w-[100%] bg-[#1F2A37] border-[1px] border-[#575F69] rounded-[10px] text-center py-[12px] focus:outline-none font-[Inter] text-[#FFF] font-medium text-[16px]"
                                        type="text"
                                        placeholder="@Project"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-col h-[50%] gap-[15px]">
                            <button className="flex flex-row items-center gap-[15px] px-[30px] cursor-pointer bg-[#191C21] border-0">
                                <img className="w-[24px] h-[24px]" src={user_group} alt=""/>
                                <div className="text-[#FFF] font-[Inter] font-medium text-[16px]">Inbox</div>
                            </button>
                            <button className="flex flex-row items-center gap-[15px] px-[30px] cursor-pointer bg-[#191C21] border-0">
                                <img className="w-[24px] h-[24px]" src={user_group} alt=""/>
                                <div className="text-[#FFF] font-[Inter] font-medium text-[16px]">Teams</div>
                            </button>
                            <button className="flex flex-row items-center gap-[15px] px-[30px] cursor-pointer bg-[#191C21] border-0">
                                <img className="w-[24px] h-[24px]" src={user_group} alt=""/>
                                <div className="text-[#FFF] font-[Inter] font-medium text-[16px]">Templates</div>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-row w-full h-[10%] justify-between items-center py-[18px] cursor-pointe border-t-[1px] border-[#535558]">
                        <div className="flex flex-row gap-[14px] items-center pl-[25px] ">
                            <img src={avatar_example} alt=""/>
                            <div className="flex flex-col">
                                <div className="text-[#FFF] font-[Inter] font-semibold text-[20px]">Steve Jobs</div>
                                <div className="text-[#A8A9AC] font-[Inter] font-regular text-[12px]">Maintainer</div>
                            </div>
                        </div>
                        <img className="pr-[12px]" src={polygon_sidebar_open} alt=""/>
                    </div>

                </div>
                <div className="w-[84%] p-[50px] flex flex-row bg-[#131519] overflow-y-scroll ">
                    <div className="w-[83%] flex flex-col">
                        <div className="flex flex-col w-full gap-[16px]">
                            <div className="text-[#FFF] font-[Inter] font-semibold text-[40px]">Templates</div>
                            <div className="flex flex-row ">
                                <button
                                    onClick={onCreateProject}
                                    className="w-[50%] flex items-center px-[25px] text-[24px] text-[#FFF] font-[Inter] font-semibold rounded-[10px] bg-[#333E42] border-[1px] border-[#666E71] cursor-pointer">
                                    <div>Create new project</div>
                                </button>
                                <div className="w-[50%] gap-[25px] flex flex-row justify-between">
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
                        </div>
                        <div className="flex flex-col w-full gap-[16px] mt-[56px]">
                            <div className="text-[#FFF] font-[Inter] font-semibold text-[40px]">Pinned Projects</div>
                            <div className="flex flex-row mt-[30px] flex-wrap">
                                {projectsData?.projects.map((project) => (
                                    <button
                                        key={project.id}
                                        onClick={() => {
                                            navigate(`/workspace/${project.id}`);
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
                                            navigate(`/workspace/${project.id}`);
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
                    <div className="w-[17%]"></div>
                </div>

            </div>
        </div>
    );
};