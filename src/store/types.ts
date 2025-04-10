
export type currentToolType = {
    tool: 'default' | 'square' | 'link' | 'text'
}

export type CanvasObject = {
    id: string;
    type: currentToolType
    x: number;
    y: number;
};