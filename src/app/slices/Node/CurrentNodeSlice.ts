import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit'
import {CanvasNode} from "../../../store/types.ts";

interface currentNodeState {
    node: CanvasNode | null;
}

const initialState: currentNodeState = {
    node: null,
};

export const CurrentNodeSlice = createSlice({
    name: 'currentNode',
    initialState,
    reducers: {
        setCurrentNode: (state, action: PayloadAction<CanvasNode>) => {
            state.node = action.payload;
        },
        unsetCurrentNode: (state) => {
            state.node = null;
        },
    }
});

export const {
    setCurrentNode,
    unsetCurrentNode
} = CurrentNodeSlice.actions;

export default CurrentNodeSlice.reducer;