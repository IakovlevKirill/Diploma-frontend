import {LeftSidebar} from "./LeftSidebar.tsx";
import {CanvasArea} from "./CanvasArea.tsx";
import {RightSidebar} from "./RightSidebar.tsx";
import {useAppDispatch} from "../../app/hooks.ts";
import {useEffect} from "react";
import {setCurrentTool} from "../../app/slices/currentToolSlice.ts";


export const InfiniteGameDesignDashboard = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleKeyDown = (e : any) => {
            if (e.key === "Escape") {
                dispatch(setCurrentTool("default"))
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">
            <LeftSidebar />
            <CanvasArea />
            <RightSidebar />
        </div>
    );
};
