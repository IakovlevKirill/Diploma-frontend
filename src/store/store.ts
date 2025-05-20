import { configureStore } from '@reduxjs/toolkit';
import {diplomaApi} from '../api/testApi';
import {currentToolSlice} from "../app/slices/currentToolSlice.ts";
import {currentCanvasObjectSlice} from "../app/slices/currentCanvasObjectSlice.ts";
import {canvasObjectsSlice} from "../app/slices/CanvasObjectsSlice.ts";
import {objectCountSlice} from "../app/slices/objectCountSlice.ts";
import {currentProjectSlice} from "../app/slices/currentProjectSlice.ts";

export const store = configureStore({
    reducer: {
        [diplomaApi.reducerPath]: diplomaApi.reducer,
        currentTool: currentToolSlice.reducer,
        currentObject: currentCanvasObjectSlice.reducer,
        canvasObjects: canvasObjectsSlice.reducer,
        objectCount: objectCountSlice.reducer,
        currentProject: currentProjectSlice.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(diplomaApi.middleware),
});

// Экспортируем тип для использования в useSelector и useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;