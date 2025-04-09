
export const Route = () => {

    const currentRoute = ''

    return (
        <div className="absolute left-[2%] top-[2%] z-100 flex flex-row">
            <span className="font-[Inter]">Project name</span>
            <span>{currentRoute}</span>
        </div>
    );
};
