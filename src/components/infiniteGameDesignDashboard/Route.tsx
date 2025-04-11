import {useAppSelector} from "../../app/hooks.ts";

export const Route = () => {

    const currentSelectedObjectName = useAppSelector((state) => state.currentObject.object_name);

    const current_project_name = 'Project name' // потом брать из урла

    const current_branch = 'main' // потом брать из урла

    let currentRoute : string

    if (currentSelectedObjectName == '') {
        currentRoute = current_project_name + ` / ` + current_branch
    } else {
        currentRoute = current_project_name + ` / ` + current_branch + ` / ` + currentSelectedObjectName
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
