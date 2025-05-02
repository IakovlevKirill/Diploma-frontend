import { LeftSidebar } from "./util_components/LeftSidebar.tsx";
import { CanvasArea } from "./CanvasArea.tsx";
import { RightSidebar } from "./util_components/RightSidebar.tsx";
import { useAppDispatch } from "../../app/hooks.ts";
import { useEffect } from "react";
import { setCurrentTool } from "../../app/slices/currentToolSlice.ts";
import { setCurrentObject } from "../../app/slices/currentCanvasObjectSlice.ts";

export const InfiniteGameDesignDashboard = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape":
                    dispatch(setCurrentTool("default"));
                    dispatch(setCurrentObject({ id: '', name: '', color: '' }));
                    break;
                case "1":
                    dispatch(setCurrentTool("default"));
                    break;
                case "2":
                    dispatch(setCurrentTool("square"));
                    break;
                default:
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch]); // Добавил dispatch в зависимости useEffect

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <LeftSidebar />
            <CanvasArea />
            <RightSidebar />
        </div>
    );
};