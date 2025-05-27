import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CanvasNode } from "../../../store/types.ts";

interface CanvasNodesState {
    nodes: CanvasNode[];
}

const initialState: CanvasNodesState = {
    nodes: [],
};

export const canvasNodesSlice = createSlice({
    name: 'canvasNodes',
    initialState,
    reducers: {
        addNode: (state, action: PayloadAction<CanvasNode>) => {
            state.nodes.push(action.payload);
        },
        setNodes: (state, action: PayloadAction<CanvasNode[]>) => {
            state.nodes = action.payload;
        },
        changeColor: (state, action: PayloadAction<{id: string; color: string}>) => {
            const node = state.nodes.find(node => node.id === action.payload.id);
            if (node) {
                node.color = action.payload.color;
            }
        },
        clearCanvas: (state) => {
            state.nodes = [];
        },
    },
});

export const {
    addNode,
    setNodes,
    changeColor,
    clearCanvas
} = canvasNodesSlice.actions;

export default canvasNodesSlice.reducer;