import { createSlice } from '@reduxjs/toolkit';

export const CurrentActiveLayerSlice = createSlice({
    name: 'active_layer',
    initialState: {
      active_layer: ""
    },
    reducers: {
        setActiveLayer: (state, action) => {
            state.active_layer = action.payload;
        },
    }
});

export const {
    setActiveLayer
} = CurrentActiveLayerSlice.actions;

export default CurrentActiveLayerSlice.reducer;