import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currentToolType } from "../../store/types.ts"

const initialState: currentToolType = {
    tool: 'default',
};

export const currentToolSlice = createSlice({
    name: 'currentTool',
    initialState,
    reducers: {
        setCurrentTool: (state, action: PayloadAction<'default' | 'node_creation' | 'link' | 'text' >) => {
            state.tool = action.payload;
        },
    },
});

export const { setCurrentTool } = currentToolSlice.actions;

export default currentToolSlice.reducer;