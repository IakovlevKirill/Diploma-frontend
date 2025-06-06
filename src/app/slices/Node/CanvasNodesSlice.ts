import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CanvasNode } from "../../../store/types.ts";

interface NodesState {
    all_nodes: CanvasNode[];
    canvas_nodes: CanvasNode[];
}

const initialState: NodesState = {
    all_nodes: [],
    canvas_nodes: []
};

export const NodesSlice = createSlice({
    name: 'canvasNodes',
    initialState,
    reducers: {
        addNode: (state, action: PayloadAction<CanvasNode>) => {
            state.all_nodes.push(action.payload);
            state.canvas_nodes.push(action.payload);
        },
        deleteNode: (state, action: PayloadAction<string>) => {
            state.all_nodes = state.all_nodes.filter(node => node.id !== action.payload);
            state.canvas_nodes = state.canvas_nodes.filter(node => node.id !== action.payload);
        },
        setAllNodes: (state, action: PayloadAction<CanvasNode[]>) => {
            state.all_nodes = action.payload;
        },
        changeColor: (state, action: PayloadAction<{id: string; color: string}>) => {
            const node = state.all_nodes.find(node => node.id === action.payload.id);
            if (node) {
                node.color = action.payload.color;
            }
        },
        setCanvasNodes: (state, action: PayloadAction<CanvasNode[]>) => {
            state.canvas_nodes = action.payload;
        },
        clearCanvas: (state) => {
            state.canvas_nodes = [];
        },
        updateNodePosition: (state, action: PayloadAction<{id: string; x: number; y: number}>) => {
            const { id, x, y } = action.payload;
            const canvas_node = state.canvas_nodes.find(node => node.id === id);
            const node = state.all_nodes.find(node => node.id === id);
            if (node && canvas_node) {
                node.position.x = x;
                node.position.y = y;
                canvas_node.position.x = x;
                canvas_node.position.y = y;
            }
        }
    },
});

export const {
    addNode,
    setAllNodes,
    setCanvasNodes,
    changeColor,
    deleteNode,
    updateNodePosition,
    clearCanvas
} = NodesSlice.actions;

export default NodesSlice.reducer;