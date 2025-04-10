import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CanvasObject {
    id: string;
    type: 'square' | 'link' | 'circle' | 'text'; // добавьте другие типы по необходимости
    x: number;
    y: number;
    // дополнительные свойства объекта
    width?: number;
    height?: number;
    color?: string;
    text?: string;
    // и т.д.
}

interface CanvasObjectsState {
    objects: CanvasObject[];
    selectedObjectId: string | null;
}

const initialState: CanvasObjectsState = {
    objects: [],
    selectedObjectId: null,
};

export const canvasObjectsSlice = createSlice({
    name: 'canvasObjects',
    initialState,
    reducers: {
        addObject: (state, action: PayloadAction<CanvasObject>) => {
            state.objects.push(action.payload);
        },
        removeObject: (state, action: PayloadAction<string>) => {
            state.objects = state.objects.filter(obj => obj.id !== action.payload);
            if (state.selectedObjectId === action.payload) {
                state.selectedObjectId = null;
            }
        },
        updateObject: (state, action: PayloadAction<{id: string; changes: Partial<CanvasObject>}>) => {
            const index = state.objects.findIndex(obj => obj.id === action.payload.id);
            if (index !== -1) {
                state.objects[index] = { ...state.objects[index], ...action.payload.changes };
            }
        },
        setSelectedObject: (state, action: PayloadAction<string | null>) => {
            state.selectedObjectId = action.payload;
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
            state.selectedObjectId = null;
        },
    },
});

// Экспортируем actions
export const {
    addObject,
    removeObject,
    updateObject,
    setSelectedObject,
    moveObject,
    clearCanvas
} = canvasObjectsSlice.actions;

export default canvasObjectsSlice.reducer;