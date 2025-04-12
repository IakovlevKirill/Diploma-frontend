import {LeftSidebar} from "./LeftSidebar.tsx";
import {CanvasArea} from "./CanvasArea.tsx";
import {RightSidebar} from "./RightSidebar.tsx";
import {useAppDispatch} from "../../app/hooks.ts";
import {useEffect} from "react";
import {setCurrentTool} from "../../app/slices/currentToolSlice.ts";
import {setCurrentObject} from "../../app/slices/currentCanvasObjectSlice.ts";


export const InfiniteGameDesignDashboard = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleKeyDown = (e : any) => {
            if (e.key === "Escape") {
                dispatch(setCurrentTool("default"))
                dispatch(setCurrentObject({ id: '', name: '' }))
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <LeftSidebar />
            <CanvasArea />
            <RightSidebar />
        </div>
    );
};
