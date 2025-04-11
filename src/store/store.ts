import { configureStore } from '@reduxjs/toolkit';
import { testApi } from '../api/testApi';
import {currentToolSlice} from "../app/slices/currentToolSlice.ts";
import {currentCanvasObjectSlice} from "../app/slices/currentCanvasObjectSlice.ts";
import {canvasObjectsSlice} from "../app/slices/CanvasObjectsSlice.ts";
import {objectCountSlice} from "../app/slices/objectCountSlice.ts";

export const store = configureStore({
    reducer: {
        [testApi.reducerPath]: testApi.reducer,
        currentTool: currentToolSlice.reducer,
        currentObject: currentCanvasObjectSlice.reducer,
        canvasObjects: canvasObjectsSlice.reducer,
        objectCount: objectCountSlice.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(testApi.middleware),
});

// Экспортируем тип для использования в useSelector и useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;