import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currentToolType } from "../../../store/types.ts"

const initialState: currentToolType = {
    tool: 'default',
};

export const currentToolSlice = createSlice({
    name: 'currentTool',
    initialState,
    reducers: {
        setCurrentTool: (state, action: PayloadAction<
            'default' |
            'node_creation' |
            'quest_creation' |
            'location_creation' |
            'character_creation' |
            'event_creation' |
            'boss_creation' |
            'item_creation' |
            'cluster_creation'
        >) => {
            state.tool = action.payload;
        },
    },
});

export const {
    setCurrentTool
} = currentToolSlice.actions;

export default currentToolSlice.reducer;