import { configureStore } from '@reduxjs/toolkit';
import {diplomaApi} from '../api/testApi';
import {currentToolSlice} from "../app/slices/currentToolSlice.ts";
import {currentCanvasObjectSlice} from "../app/slices/Node/currentCanvasObjectSlice.ts";
import {canvasNodesSlice} from "../app/slices/Node/CanvasNodesSlice.ts";
import {objectCountSlice} from "../app/slices/Node/objectCountSlice.ts";
import {currentProjectSlice} from "../app/slices/Project/currentProjectSlice.ts";
import {PinnedProjectsSlice} from "../app/slices/Project/PinnedProjectsSlice.ts";
import {ProjectsSlice} from "../app/slices/Project/ProjectsSlice.ts";

export const store = configureStore({
    reducer: {
        [diplomaApi.reducerPath]: diplomaApi.reducer,
        currentTool: currentToolSlice.reducer,
        currentObject: currentCanvasObjectSlice.reducer,
        canvasObjects: canvasNodesSlice.reducer,
        objectCount: objectCountSlice.reducer,
        currentProject: currentProjectSlice.reducer,
        Projects: ProjectsSlice.reducer,
        PinnedProjects: PinnedProjectsSlice.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(diplomaApi.middleware),
});

// Экспортируем тип для использования в useSelector и useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;