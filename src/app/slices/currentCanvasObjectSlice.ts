import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface currentObjectState {
    object_id: string
    object_name: string
    object_color: string
}

const initialState: currentObjectState = {
    object_id: '',
    object_name: '',
    object_color: '',
};

export const currentCanvasObjectSlice = createSlice({
    name: 'currentCanvasObject',
    initialState,
    reducers: {
        setCurrentObject: (state, action: PayloadAction<{id: string; name: string; color: string}>) => {
            state.object_id = action.payload.id;
            state.object_name = action.payload.name;
            state.object_color = action.payload.color;
        },
    },
});

export const { setCurrentObject } = currentCanvasObjectSlice.actions;

export default currentCanvasObjectSlice.reducer;