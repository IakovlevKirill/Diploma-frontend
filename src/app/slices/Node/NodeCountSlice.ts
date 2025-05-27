import { createSlice } from '@reduxjs/toolkit';

export const NodeCountSlice = createSlice({
    name: 'nodeCount',
    initialState: {
        nodeCount: 1,
    },
    reducers: {
        incrementNodeCount: (state) => {
            state.nodeCount += 1;
        },
        setNodeCount: (state, action) => {
            state.nodeCount = action.payload;
        }
    }
});

export const {
    incrementNodeCount,
    setNodeCount
} = NodeCountSlice.actions;

export default NodeCountSlice.reducer;