import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit'
import {CanvasNode} from "../../../store/types.ts";
import {number} from "framer-motion";

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
        updateCurrentNodePosition: (state, action: PayloadAction<{x: number, y: number}>) => {
            if (state.node) {
                state.node.position.x = action.payload.x
                state.node.position.y = action.payload.y
            }
        },
        unsetCurrentNode: (state) => {
            state.node = null;
        },
    }
});

export const {
    setCurrentNode,
    unsetCurrentNode,
    updateCurrentNodePosition
} = CurrentNodeSlice.actions;

export default CurrentNodeSlice.reducer;