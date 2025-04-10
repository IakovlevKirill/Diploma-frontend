import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface currentObjectState {
    object: string
}

const initialState: currentObjectState = {
    object: '',
};

export const currentCanvasObjectSlice = createSlice({
    name: 'currentCanvasObject',
    initialState,
    reducers: {
        setCurrentObject: (state, action: PayloadAction<string>) => {
            state.object = action.payload;
        },
    },
});

export const { setCurrentObject } = currentCanvasObjectSlice.actions;

export default currentCanvasObjectSlice.reducer;