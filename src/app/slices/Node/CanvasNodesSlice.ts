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

        // CANVAS

        setAllNodes: (state, action: PayloadAction<CanvasNode[]>) => {
            state.all_nodes = action.payload;
        },
        setCanvasNodes: (state, action: PayloadAction<CanvasNode[]>) => {
            state.canvas_nodes = action.payload;
        },
        clearCanvas: (state) => {
            state.canvas_nodes = [];
        },

        // NODE CRUD

        addNode: (state, action: PayloadAction<CanvasNode>) => {
            state.all_nodes.push(action.payload);
            state.canvas_nodes.push(action.payload);
        },
        deleteNode: (state, action: PayloadAction<string>) => {
            state.all_nodes = state.all_nodes.filter(node => node.id !== action.payload);
            state.canvas_nodes = state.canvas_nodes.filter(node => node.id !== action.payload);
        },

        /// TARGET NODE CHANGES

        updateNodeName: (state, action: PayloadAction<{id: string, name: string}>) => {
            const { id,  name} = action.payload;
            const canvas_node = state.canvas_nodes.find(node => node.id === id);
            const node = state.all_nodes.find(node => node.id === id);
            if (node) {
                node.name = name;
            }
            if (canvas_node) {
                canvas_node.name = name;
            }
        },
        updateNodeColor: (state, action: PayloadAction<{id: string; color: string}>) => {
            const node = state.all_nodes.find(node => node.id === action.payload.id);
            const canvas_node = state.canvas_nodes.find(node => node.id === action.payload.id);
            if (node) {
                node.color = action.payload.color;
            }
            if (canvas_node) {
                canvas_node.color = action.payload.color;
            }
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
        },
        updateNodeX: (state, action: PayloadAction<{id: string; x: number}>) => {
            const { x } = action.payload;
            const node = state.all_nodes.find(node => node.id === action.payload.id);
            const canvas_node = state.canvas_nodes.find(node => node.id === action.payload.id);
            if (node) {
                node.position.x = x;
            }
            if (canvas_node) {
                canvas_node.position.x = x;
            }
        },
        updateNodeY: (state, action: PayloadAction<{id: string; y: number}>) => {
            const { y } = action.payload;
            const node = state.all_nodes.find(node => node.id === action.payload.id);
            const canvas_node = state.canvas_nodes.find(node => node.id === action.payload.id);
            if (node) {
                node.position.y = y;
            }
            if (canvas_node) {
                canvas_node.position.y = y;
            }
        },
        updateNodeWidth: (state, action: PayloadAction<{id: string; width: number}>) => {
            const { width } = action.payload;
            const node = state.all_nodes.find(node => node.id === action.payload.id);
            const canvas_node = state.canvas_nodes.find(node => node.id === action.payload.id);
            if (node) {
                node.size.width = width;
            }
            if (canvas_node) {
                canvas_node.size.width = width;
            }
        },
        updateNodeHeight: (state, action: PayloadAction<{id: string; height: number}>) => {
            const { height } = action.payload;
            const node = state.all_nodes.find(node => node.id === action.payload.id);
            const canvas_node = state.canvas_nodes.find(node => node.id === action.payload.id);
            if (node) {
                node.size.height = height;
            }
            if (canvas_node) {
                canvas_node.size.height = height;
            }
        },
    },
});

export const {

    // canvas
    setAllNodes,
    setCanvasNodes,
    clearCanvas,

    // node crud
    addNode,
    deleteNode,

    // target node changes
    updateNodeName,
    updateNodePosition,
    updateNodeColor,
    updateNodeX,
    updateNodeY,
    updateNodeWidth,
    updateNodeHeight

} = NodesSlice.actions;

export default NodesSlice.reducer;