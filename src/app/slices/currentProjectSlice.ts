import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';

export const currentProjectSlice = createSlice({
    name: 'currentProject',
    initialState: {
        currentProjectId: '',
        currentProjectTitle: '',
    },
    reducers: {
        setCurrentProjectId: (state, action: PayloadAction<string>) => {
            state.currentProjectId = action.payload;
        },
        setCurrentProjectTitle: (state, action: PayloadAction<string>) => {
            state.currentProjectTitle = action.payload;
        },
    },
});

export const {
    setCurrentProjectId,
    setCurrentProjectTitle
} = currentProjectSlice.actions;

export default currentProjectSlice.reducer;