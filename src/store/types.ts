
export type currentToolType = {
    tool: 'default' | 'square' | 'link' | 'text'
}

export type CanvasObject = {
    id: string;
    name: string;
    type: currentToolType
    x: number;
    y: number;
    color: string;
    //width?: number;
    //     height?: number;
    //     text?: string;
};