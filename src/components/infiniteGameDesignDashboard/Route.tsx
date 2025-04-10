
export const Route = () => {

    const currentRoute = 'Project name / main / children_node'

    const handleRouteClick = (e) => {
        e.stopPropagation(); // Останавливаем всплытие события
    };

    return (
        <div onClick={handleRouteClick}
            className="absolute p-[1%] cursor-default left-[0%] top-[0%] z-100 flex flex-row">
            <span className="font-[Inter]">{currentRoute}</span>
        </div>
    );
};
