import { LeftSidebar } from "./components/LeftSidebar.tsx";
import { CanvasArea } from "./CanvasArea.tsx";
import {useAppDispatch, useDocumentTitle} from "../../app/hooks.ts";
import React, { useEffect } from "react";
import { setCurrentTool } from "../../app/slices/currentToolSlice.ts";
import { setCurrentObject } from "../../app/slices/currentCanvasObjectSlice.ts";
import {LayoutBar} from "../LayoutBar.tsx";
import {motion} from "framer-motion";
import {
    setCurrentProjectId,
} from "../../app/slices/currentProjectSlice.ts";
import {useParams} from "react-router-dom";
import {useGetProjectByIdQuery} from "../../api/testApi.ts";

export const WorkSpace = () => {

    const dispatch = useAppDispatch();

    const { projectId } = useParams();

    const userId = localStorage.getItem("userId");

    const { data: project_data, isLoading: isProjectLoading } = useGetProjectByIdQuery(String(projectId));
    const project = project_data?.project

    useDocumentTitle(`${project?.title} - WebNode`);

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
                    dispatch(setCurrentTool("node_creation"));
                    break;
                default:
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch]);

    useEffect(() => {
        if (projectId) {
            dispatch(setCurrentProjectId(projectId))
        }
    }, [dispatch, projectId, project_data]);

    interface NodeGateWayProps {
        type: string;
    }

    interface GateWayDotProps {
        type: string;
    }

    const GatewayDot = (props: GateWayDotProps) => {
        return (
            <>
                {(props.type == 'input') && (
                    <div className="cursor-pointer hover:border-[1px] hover:border-[#FFF] border-[#7CD4ED] border-[1px] left-[-5px] absolute w-[10px] h-[10px] bg-[#7CD4ED] rounded-[100%]"></div>
                )}
                {(props.type == 'output') && (
                    <div className="cursor-pointer hover:border-[1px] hover:border-[#FFF] border-[#7CD4ED] border-[1px] right-[-5px] absolute w-[10px] h-[10px] bg-[#7CD4ED] rounded-[100%]"></div>
                )}
            </>
        )
    }

    const NodeGateway = (props: NodeGateWayProps) => {
        return (
            <>
                {(props.type == "input") && (
                    <div className="cursor-pointer flex flex-row items-center gap-[10px]">
                        <GatewayDot type={"input"}></GatewayDot>
                        <div className="font-[sans-serif] text-[14px]">Input 1</div>
                    </div>
                )}
                {(props.type == "output") && (
                    <div className="cursor-pointer flex flex-row items-center gap-[10px]">
                        <div className="font-[sans-serif] text-[14px]">Output</div>
                        <GatewayDot type={"output"}></GatewayDot>
                    </div>
                )}
            </>
        )
    }

    const Node = () => {
        return(
            <div className="relative w-[200px] flex flex-col justify-center rounded-[15px] rounded text-[#FFF] border-[1px] border-[#505356]">
                <div className="flex justify-center w-[100%] font-[sans-serif] text-[14px] py-[7px] border-b-[1px] border-[#505356]">
                    Math / Add
                </div>
                <div className="w-[calc(100%-30px)] flex flex-row items-center px-[15px] py-[20px] justify-center  text-[12px]">
                    <div className="w-[50%] flex flex-col gap-[10px]">
                        <NodeGateway type={'input'}></NodeGateway>
                        <NodeGateway type={'input'}></NodeGateway>
                        <NodeGateway type={'input'}></NodeGateway>
                    </div>
                    <div className="w-[50%] flex flex-col items-end justify-center gap-[10px]">
                        <NodeGateway type={'output'}></NodeGateway>
                    </div>
                </div>
            </div>
        )
    }

    if (isProjectLoading) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden">
            <LayoutBar></LayoutBar>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="h-[95%] w-[100vw] flex flex-row items-center justify-center"
            >
                {/*z-2 flex h-full w-[calc(15%-1px)] bg-[#1C1F24] border-r-[1px] border-[#535558]*/}
                <LeftSidebar projectTitle={String(project?.title)} userId={String(userId)}></LeftSidebar>
                {/*z-1 relative flex h-full w-[85%]*/}
                <CanvasArea></CanvasArea>
            </motion.div>
        </div>
    );
};