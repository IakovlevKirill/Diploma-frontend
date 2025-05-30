import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const CurrentProjectIdSlice = createSlice({
    name: 'projectId',
    initialState: {
        projectId: ''
    },
    reducers: {
        setProjectId: (state, action: PayloadAction<string>) => {
            state.projectId = action.payload;
        },
    },
});

export const {
    setProjectId
} = CurrentProjectIdSlice.actions;

export default CurrentProjectIdSlice.reducer;