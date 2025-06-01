
export type currentToolType = {
    tool: 'default' | 'node_creation' | 'link' | 'text'
}

export type CanvasNode = {
    id: string;
    name: string;
    position: {x: number, y: number};
    size: {width: number, height: number};
    parent: string;
    children: string[];
    color: string;
};

export type User = {
    id: string
    email: string
    username: null
    role: string
    isVerified: false
    createdAt: string
    updatedAt: string
}

export type Project = {
    id: string;
    title: string;
    isPinned: boolean
    createdAt: string
    updatedAt: string
    content: string;
}

// REQUESTS


// RESPONSES
