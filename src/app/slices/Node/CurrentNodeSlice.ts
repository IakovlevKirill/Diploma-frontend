import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit'

interface currentNodeState {
    node_id: string
    node_name: string
    node_color: string
}

const initialState: currentNodeState = {
    node_id: '',
    node_name: '',
    node_color: '',
};

export const CurrentNodeSlice = createSlice({
    name: 'currentNode',
    initialState,
    reducers: {
        setCurrentNode: (state, action: PayloadAction<{id: string; name: string; color: string}>) => {
            state.node_id = action.payload.id;
            state.node_name = action.payload.name;
            state.node_color = action.payload.color;
        },
    },
});

export const {
    setCurrentNode
} = CurrentNodeSlice.actions;

export default CurrentNodeSlice.reducer;