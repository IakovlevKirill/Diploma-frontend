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
    },
});

export const {
    setCurrentNode
} = CurrentNodeSlice.actions;

export default CurrentNodeSlice.reducer;