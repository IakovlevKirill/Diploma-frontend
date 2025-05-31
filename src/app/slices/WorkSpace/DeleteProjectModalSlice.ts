import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const DeleteProjectModalSlice = createSlice({
    name: 'isModalVisible',
    initialState: {
        visibility: false,
    },
    reducers: {
        setModalVisibility: (state, action: PayloadAction<boolean>) => {
            state.visibility = action.payload;
        },
    },
});

export const {
    setModalVisibility
} = DeleteProjectModalSlice.actions;

export default DeleteProjectModalSlice.reducer;