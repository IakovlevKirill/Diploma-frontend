import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface currentObjectState {
    object_id: string
    object_name: string
}

const initialState: currentObjectState = {
    object_id: '',
    object_name: '',
};

export const currentCanvasObjectSlice = createSlice({
    name: 'currentCanvasObject',
    initialState,
    reducers: {
        setCurrentObject: (state, action: PayloadAction<{id: string; name: string}>) => {
            state.object_id = action.payload.id;
            state.object_name = action.payload.name;
        },
    },
});

export const { setCurrentObject } = currentCanvasObjectSlice.actions;

export default currentCanvasObjectSlice.reducer;