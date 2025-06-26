import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit'
import {CanvasNode} from "../../../store/types.ts";

interface currentNodeState {
    node: CanvasNode | null;
}

const initialState: currentNodeState = {
    node: {
        id: '-',
        type: 'untyped',
        name: '-',
        pointColor: '-',
        projectId: '-',
        position: {
            x: "-",
            y: "-"
        },
        size: {
            width: "-",
            height: "-"
        },
        parentId: '-',
        children: [],
        color: '-'
    }
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
            if (state.node) {
                state.node.projectId = "-";
                state.node.name = "-";
                state.node.position.x = "-";
                state.node.position.y = "-";
                state.node.size.width = "-";
                state.node.size.height = "-";
                state.node.id = "-";
                state.node.pointColor = "-";
                state.node.parentId = "-";
                state.node.color = "-";
            }
        },
    }
});

export const {
    setCurrentNode,
    unsetCurrentNode,
    updateCurrentNodePosition
} = CurrentNodeSlice.actions;

export default CurrentNodeSlice.reducer;