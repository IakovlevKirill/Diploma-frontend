import { createSlice } from '@reduxjs/toolkit';

export const CursorPositionZoomSlice = createSlice({
    name: 'cursorPosition',
    initialState: {
        cursor_position: {
            x: 0,
            y: 0,
        },
    },
    reducers: {
        setCursorPosition: (state, action) => {
            state.cursor_position = action.payload;
        },
    }
});

export const {
    setCursorPosition
} = CursorPositionZoomSlice.actions;

export default CursorPositionZoomSlice.reducer;