import { configureStore } from '@reduxjs/toolkit';
import {diplomaApi} from '../api/testApi';
import {currentToolSlice} from "../app/slices/WorkSpace/currentToolSlice.ts";
import {NodesSlice} from "../app/slices/Node/CanvasNodesSlice.ts";
import {NodeCountSlice} from "../app/slices/Node/NodeCountSlice.ts";
import {currentProjectSlice} from "../app/slices/Project/currentProjectSlice.ts";
import {PinnedProjectsSlice} from "../app/slices/Project/PinnedProjectsSlice.ts";
import {ProjectsSlice} from "../app/slices/Project/ProjectsSlice.ts";
import {CurrentNodeSlice} from "../app/slices/Node/CurrentNodeSlice.ts";
import {CurrentUserIdSlice} from "../app/slices/Other/CurrentUserIdSlice.ts";
import {CurrentProjectIdSlice} from "../app/slices/WorkSpace/CurrentProjectIdSlice.ts";
import {DeleteProjectModalSlice} from "../app/slices/WorkSpace/DeleteProjectModalSlice.ts"
import {BreadCrumbsSlice} from "../app/slices/Other/BreadCrumbsSlice.ts";
import {CurrentActiveLayerSlice} from "../app/slices/Other/CurrentActiveLayerSlice.ts";
import {
    ModalNewObjectTypeCreationVisibilitySlice
} from "../app/slices/Other/ModalNewObjectTypeCreationVisibilitySlice.tsx";
import {CurrentCanvasZoomSlice} from "../app/slices/Other/CurrentCanvasZoomSlice.ts";
import {CursorPositionZoomSlice} from "../app/slices/Other/CursorPositionSlice.ts";

export const store = configureStore({
    reducer: {
        [diplomaApi.reducerPath]: diplomaApi.reducer,

        // OTHERS

        currentTool: currentToolSlice.reducer,
        userId: CurrentUserIdSlice.reducer,
        projectId: CurrentProjectIdSlice.reducer,
        isModalVisible: DeleteProjectModalSlice.reducer,
        breadCrumbs: BreadCrumbsSlice.reducer,
        activeLayer: CurrentActiveLayerSlice.reducer,
        isNewObjectTypeModalVisible: ModalNewObjectTypeCreationVisibilitySlice.reducer,
        zoomCanvas: CurrentCanvasZoomSlice.reducer,
        cursorPosition: CursorPositionZoomSlice.reducer,

        /// PROJECTS

        currentProject: currentProjectSlice.reducer,
        Projects: ProjectsSlice.reducer,
        PinnedProjects: PinnedProjectsSlice.reducer,

        /// NODES

        currentNode: CurrentNodeSlice.reducer,
        nodes: NodesSlice.reducer,
        nodeCount: NodeCountSlice.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(diplomaApi.middleware),
});

// Экспортируем тип для использования в useSelector и useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;