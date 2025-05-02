import {useCreateProjectMutation, useGetAllProjectsQuery} from "../api/testApi.ts";
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
        <div className="w-[100vw] flex flex-row">
            <div className="min-h-[100vh] flex flex-col w-[17%] bg-[#211D1E]">
                <div className="h-[80%]"></div>
                <div className="h-[20%] p-[30px] flex flex-col justify-end items-center">
                    <button className="font-[Inter] w-[50%]" onClick={OnLogout}>
                        Выйти
                    </button>
                </div>
            </div>
            <div className="w-[83%] p-[30px] flex flex-col">
                <div>
                    <button className="font-[Inter]" onClick={onCreateProject}>
                        Новый проект
                    </button>
                </div>
                <div className="mt-[30px] flex flex-wrap gap-[30px]">
                    {projectsData?.projects?.length ? (
                        projectsData.projects.map((project) => (
                            <div key={project.id} className="flex flex-col">
                                <div className="w-[300px] h-[180px] border-[1px] border-[black]"></div>
                                <button
                                    className="border-0 text-left cursor-pointer pl-[0px] bg-[#FFF] ml-[10px] mt-[10px] text-[24px] font-[Inter]"
                                    onClick={() => {
                                        navigate(`/dashboard/${project.id}`);
                                    }}
                                >
                                    {project.title}
                                </button>
                                <span className="ml-[10px] mt-[10px] text-[12px] font-[Inter] text-[#5A5A5A]">
                                    Last edit - {new Date(project.updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div>No projects found</div>
                    )}
                </div>
            </div>
        </div>
    );
};