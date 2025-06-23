import { createSlice } from '@reduxjs/toolkit';

export const ModalNewObjectTypeCreationVisibilitySlice = createSlice({
    name: 'isVisible',
    initialState: {
        isVisible: false
    },
    reducers: {
        setVisible: (state,) => {
            state.isVisible = true;
        },
        setInvisible: (state,) => {
            state.isVisible = false;
        },
    }
});

export const {
    setVisible,
    setInvisible,
} = ModalNewObjectTypeCreationVisibilitySlice.actions;

export default ModalNewObjectTypeCreationVisibilitySlice.reducer;