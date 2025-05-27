import {useAppSelector} from "../../../app/hooks.ts";

export const Route = () => {

    const currentProjectId = useAppSelector((state) => state.currentProject.currentProjectId);
    const currentSelectedNodeName = useAppSelector((state) => state.currentNode.node_name);


    const handleRouteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Останавливаем всплытие события
    };

    return (
        <div onClick={handleRouteClick}
            className="absolute p-[1%] cursor-default left-[0%] top-[0%] z-100 flex flex-row">
            <span className="font-[Inter-medium]"></span>
        </div>
    );
};
