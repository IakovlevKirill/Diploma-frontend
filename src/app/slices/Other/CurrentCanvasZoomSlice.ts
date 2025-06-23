import { createSlice } from '@reduxjs/toolkit';

export const CurrentCanvasZoomSlice = createSlice({
    name: 'zoom',
    initialState: {
        zoom: 1,
    },
    reducers: {
        setZoom: (state, action) => {
            state.zoom = action.payload;
        },
    }
});

export const {
    setZoom
} = CurrentCanvasZoomSlice.actions;

export default CurrentCanvasZoomSlice.reducer;