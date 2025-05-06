import {useAppSelector} from "../../../app/hooks.ts";
import {useParams} from "react-router-dom";
import {useGetProjectByIdQuery} from "../../../api/testApi.ts";

export const Route = () => {

    const { projectId } = useParams();

    const { data: project_data, isLoading: isProjectLoading } = useGetProjectByIdQuery(projectId);
    const project = project_data?.project

    const currentSelectedObjectName = useAppSelector((state) => state.currentObject.object_name);

    const current_branch = 'main' // потом брать из урла

    let currentRoute : string

    if (currentSelectedObjectName == '') {
        currentRoute = project?.title + ` / ` + current_branch
    } else {
        currentRoute = project?.title + ` / ` + current_branch + ` / ` + currentSelectedObjectName
    }

    const handleRouteClick = (e: any) => {
        e.stopPropagation(); // Останавливаем всплытие события
    };

    return (
        <div onClick={handleRouteClick}
            className="absolute p-[1%] cursor-default left-[0%] top-[0%] z-100 flex flex-row">
            <span className="font-[Inter]">{currentRoute}</span>
        </div>
    );
};
