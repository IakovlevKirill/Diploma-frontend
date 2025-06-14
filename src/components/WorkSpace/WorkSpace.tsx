import { LeftSidebar } from "./components/LeftSidebar.tsx";
import { CanvasArea } from "./CanvasArea.tsx";
import {useAppDispatch, useAppSelector, useDocumentTitle} from "../../app/hooks.ts";
import {RingLoader} from "react-spinners";
import React, {useEffect} from "react";
import { setCurrentTool } from "../../app/slices/WorkSpace/currentToolSlice.ts";
import { setCurrentNode } from "../../app/slices/Node/CurrentNodeSlice.ts";
import {LayoutBar} from "../LayoutBar.tsx";
import {motion} from "framer-motion";
import {setCurrentProjectId,} from "../../app/slices/Project/currentProjectSlice.ts";
import {
    useLocation,
    useParams,
} from "react-router-dom";
import {
    useDeleteNodeMutation,
    useGetAllProjectNodesByProjectIdQuery,
    useGetProjectByIdQuery,
} from "../../api/testApi.ts";
import {
    deleteNode,
    setAllNodes,
    setCanvasNodes
} from "../../app/slices/Node/CanvasNodesSlice.ts";
import {setNodeCount} from "../../app/slices/Node/NodeCountSlice.ts";
import {DeleteProjectModal} from "./components/DeleteProjectModal.tsx";
import {CanvasNode} from "../../store/types.ts";

export const WorkSpace = () => {

    const location = useLocation();

    const pathParts = location.pathname.split('/')

    const currentLayerId = pathParts[pathParts.length-1] || 'root';

    const { projectId } = useParams();
    
    const [deleteNodeQuery] = useDeleteNodeMutation();

    const currentSelectedNodeId = useAppSelector((state) => state.currentNode.node?.id);
    const isDeleteProjectModalVisible = useAppSelector((state) => state.isModalVisible.visibility);

    const dispatch = useAppDispatch();

    const userId = String(localStorage.getItem("userId"))

    const { data: project_data, isLoading: isProjectLoading } = useGetProjectByIdQuery({ projectId: String(projectId) });
    const { data: project_nodes, isLoading: isNodesLoading } = useGetAllProjectNodesByProjectIdQuery({ projectId: String(projectId) });

    console.log(project_nodes?.data.nodes);

    useEffect(() => {
        if (projectId) {
            dispatch(setCurrentProjectId(projectId))
        }
    }, [dispatch, projectId, project_data]);

    useEffect(() => {
        if (project_nodes) {
            dispatch(setAllNodes(project_nodes.data.nodes));
            dispatch(setNodeCount(project_nodes.data.nodes.length));
        }
    }, [project_nodes, dispatch]);

    useEffect(() => {
        if (project_nodes) {
            const nodes = project_nodes.data.nodes;
            const current_layer_nodes : CanvasNode[] = [];
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].parentId == currentLayerId) {
                    current_layer_nodes.push(nodes[i]);
                }
            }
            dispatch(setCanvasNodes(current_layer_nodes))
        }
    }, [dispatch, currentLayerId, project_nodes]);
    
    const project = project_data?.data.project

    useDocumentTitle(`${project?.title} - WebNode`);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape":
                    dispatch(setCurrentTool("default"));
                    dispatch(setCurrentNode({
                        children: [],
                        color: "",
                        id: "",
                        name: "",
                        parentId: "",
                        position: {x: 0, y: 0},
                        size: {height: 0, width: 0}
                    }));
                    break;
                case "1":
                    dispatch(setCurrentTool("default"));
                    break;
                case "2":
                    dispatch(setCurrentTool("node_creation"));
                    break;
                case "Delete":
                    if (currentSelectedNodeId) {
                        deleteNodeQuery({ nodeId: currentSelectedNodeId })
                        dispatch(deleteNode(currentSelectedNodeId))
                    }
                    break;
                default:
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentSelectedNodeId, deleteNodeQuery, dispatch]);
    
    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden relative">
            <LayoutBar></LayoutBar>
            {(isDeleteProjectModalVisible) && (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                <DeleteProjectModal project={project} projectId={String(project?.id)}></DeleteProjectModal>
            )}
            {(isProjectLoading || isNodesLoading) && (
                <div className="h-[95vh] w-[100vw] flex flex-col items-center justify-center font-[Inter-medium] text-[#FFF]">
                    <RingLoader
                        color={'#ffffff'}
                        speedMultiplier={1}
                    />
                </div>
            )}
            {!(isProjectLoading || isNodesLoading) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="h-[95vh] w-[100vw] flex flex-row items-center justify-center"
                >
                    {/*z-2 flex h-full w-[calc(15%-1px)] bg-[#1C1F24] border-r-[1px] border-[#535558]*/}
                    <LeftSidebar projectTitle={String(project?.title)} userId={userId} projectId={String(project?.id)}></LeftSidebar>
                    {/*z-1 relative flex h-full w-[85%]*/}
                    <CanvasArea></CanvasArea>
                </motion.div>
            )}
        </div>
    );
};