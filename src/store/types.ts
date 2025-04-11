
export type currentToolType = {
    tool: 'default' | 'square' | 'link' | 'text'
}

export type CanvasObject = {
    id: string;
    name: string;
    type: currentToolType
    x: number;
    y: number;
    //width?: number;
    //     height?: number;
    //     color?: string;
    //     text?: string;
};