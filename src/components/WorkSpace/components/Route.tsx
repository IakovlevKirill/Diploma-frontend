import {useAppSelector} from "../../../app/hooks.ts";
import {useParams} from "react-router-dom";
import {useGetProjectByIdQuery} from "../../../api/testApi.ts";
import React from "react";

export const Route = () => {

    const { projectId } = useParams();

    const { data: project_data, isLoading: isProjectLoading } = useGetProjectByIdQuery(projectId);
    const project = project_data?.project

    const currentSelectedNodeName = useAppSelector((state) => state.currentObject.object_name);

    let currentRoute : string

    if (currentSelectedNodeName == '' && project) {
        currentRoute = project?.title
    } else {
        currentRoute = project?.title + ` / ` + currentSelectedNodeName
    }

    const handleRouteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Останавливаем всплытие события
    };

    return (
        <div onClick={handleRouteClick}
            className="absolute p-[1%] cursor-default left-[0%] top-[0%] z-100 flex flex-row">
            <span className="font-[Inter-medium]">{currentRoute}</span>
        </div>
    );
};
