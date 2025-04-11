import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {CanvasObject} from "../../store/types.ts";


interface CanvasObjectsState {
    objects: CanvasObject[];
}

const initialState: CanvasObjectsState = {
    objects: [],
};

// const currentSelectedObject = useAppSelector((state) => state.currentObject.object);
//
// const dispatch = useAppDispatch();

export const canvasObjectsSlice = createSlice({
    name: 'canvasObjects',
    initialState,
    reducers: {
        addObject: (state, action: PayloadAction<CanvasObject>) => {
            state.objects.push(action.payload);
        },
        //removeObject: (state, action: PayloadAction<string>) => {
        //             state.objects = state.objects.filter(obj => obj.id !== action.payload);
        //             if (currentSelectedObject === action.payload) {
        //                 dispatch(setCurrentObject(''))
        //             }
        //         },
        updateObject: (state, action: PayloadAction<{id: string; changes: Partial<CanvasObject>}>) => {
            const index = state.objects.findIndex(obj => obj.id === action.payload.id);
            if (index !== -1) {
                state.objects[index] = { ...state.objects[index], ...action.payload.changes };
            }
        },
        moveObject: (state, action: PayloadAction<{id: string; x: number; y: number}>) => {
            const obj = state.objects.find(obj => obj.id === action.payload.id);
            if (obj) {
                obj.x = action.payload.x;
                obj.y = action.payload.y;
            }
        },
        // Дополнительные редьюсеры по необходимости
        clearCanvas: (state) => {
            state.objects = [];
        },
    },
});

// Экспортируем actions
export const {
    addObject,
    //removeObject,
    updateObject,
    moveObject,
    clearCanvas
} = canvasObjectsSlice.actions;

export default canvasObjectsSlice.reducer;