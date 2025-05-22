import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CanvasNode } from "../../store/types.ts";

interface CanvasNodesState {
    objects: CanvasNode[];
}

const initialState: CanvasNodesState = {
    objects: [],
};

export const canvasObjectsSlice = createSlice({
    name: 'canvasObjects',
    initialState,
    reducers: {
        addObject: (state, action: PayloadAction<CanvasNode>) => {
            state.objects.push(action.payload);
        },
        updateObject: (state, action: PayloadAction<{id: string; changes: Partial<CanvasNode>}>) => {
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
        changeColor: (state, action: PayloadAction<{id: string; color: string}>) => {
            const obj = state.objects.find(obj => obj.id === action.payload.id);
            if (obj) {
                obj.color = action.payload.color;
            }
        },
        clearCanvas: (state) => {
            state.objects = [];
        },
    },
});

export const {
    addObject,
    updateObject,
    moveObject,
    changeColor,
    clearCanvas
} = canvasObjectsSlice.actions;

export default canvasObjectsSlice.reducer;