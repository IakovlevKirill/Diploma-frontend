import { LeftSidebar } from "./components/LeftSidebar.tsx";
import { CanvasArea } from "./CanvasArea.tsx";
import { RightSidebar } from "./components/RightSidebar.tsx";
import { useAppDispatch } from "../../app/hooks.ts";
import React, { useEffect } from "react";
import { setCurrentTool } from "../../app/slices/currentToolSlice.ts";
import { setCurrentObject } from "../../app/slices/currentCanvasObjectSlice.ts";
import {LayoutBar} from "../LayoutBar.tsx";
import plus_icon from "../../assets/images/Add_Plus.png";
import paperclip from "../../assets/images/Paperclip_Attechment_Tilt.png";
import delete_icon from "../../assets/images/Trash_Full.png";
import {motion} from "framer-motion";

export const WorkSpace = () => {
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
        <div className="flex flex-col h-screen w-screen overflow-hidden">
            <LayoutBar></LayoutBar>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="h-[95%] w-[100vw] flex items-center justify-center"
            >
                <div className="font-[Inter-semibold] text-[#FFF] ">
                    WorkSpace пока что в разработке
                </div>
            </motion.div>

        </div>
    );
};