import { configureStore } from '@reduxjs/toolkit';
import { testApi } from '../api/testApi';
import {currentToolSlice} from "../app/slices/currentToolSlice.ts";
import {currentCanvasObjectSlice} from "../app/slices/currentCanvasObjectSlice.ts";

export const store = configureStore({
    reducer: {
        [testApi.reducerPath]: testApi.reducer,
        currentTool: currentToolSlice.reducer,
        currentObject: currentCanvasObjectSlice.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(testApi.middleware),
});

// Экспортируем тип для использования в useSelector и useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;