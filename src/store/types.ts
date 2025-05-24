
export type currentToolType = {
    tool: 'default' | 'node_creation' | 'link' | 'text'
}

export type CanvasNode = {
    id: string;
    name: string;
    type: 'default' | 'node_creation' | 'link' | 'text'
    x: number;
    y: number;
    color: string;
    width: number;
    height: number;
    //     text?: string;
};

export type User = {
    email: string
    id: string
    isVerified: false
    projects: null
    createdAt: string
    updatedAt: string
    username: null
    role: 'user' | 'admin'
}

export type Project = {
    id: string;
    title: string;
    content: string;
    createdAt: string
    updatedAt: string
    user: User
    isPinned: boolean
}

// REQUESTS

export type registerRequestType = {
    email: string,
    password: string,
}

export type loginRequestType = {
    email: string,
    password: string
}

export type createProjectRequestType = {
    userId: string
}

export type getAllProjectsRequestsType = {
    userId: string,
}

export type pinProjectRequestType = {
    projectId: string,
}

export type getPinnedProjectsRequestType = {
    userId: string,
}
// RESPONSES

export type registerResponseType = {
    access_token: string;
    id: string;
}

export type loginResponseType = {
    access_token: string;
    id: string;
}

export type createProjectResponseType = {
    project: Project
}

export type getAllProjectsResponseType = {
    projects: Project[]

}

export type getProjectByIdResponseType = {
    project: Project
}