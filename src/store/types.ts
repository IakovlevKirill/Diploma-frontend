
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