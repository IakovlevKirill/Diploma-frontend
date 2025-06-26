
export type currentToolType = {
    tool:
        'default' |
        'node_creation' |
        'quest_creation' |
        'location_creation' |
        'character_creation' |
        'event_creation' |
        'boss_creation' |
        'item_creation' |
        'cluster_creation'
}

export type CanvasNode = {
    id: string | "-";
    type:
        "untyped" |
        "quest" |
        "location" |
        "character" |
        "event" |
        "boss" |
        "item" |
        "cluster"
    name: string  | "-";
    pointColor: string | "-";
    projectId: string | "-";
    position: {x: number | "-", y: number | "-"};
    size: {width: number | "-", height: number | "-"};
    parentId: string | "-";
    children: string[];
    color: string | "-";
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
