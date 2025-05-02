
export type currentToolType = {
    tool: 'default' | 'square' | 'link' | 'text'
}

export type CanvasObject = {
    id: string;
    name: string;
    type: 'default' | 'square' | 'link' | 'text'
    x: number;
    y: number;
    color: string;
    width: number;
    height: number;
    //     text?: string;
};

export type User = {
    createdAt: string
    email: string
    id: string
    isVerified: false
    projects: null
    updatedAt: string
    username: null
}

export type Project = {
    id: string;
    title: string;
    content: string;
    user: User
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
    title: string,
    content: string,
    userId: string,
}

export type getAllProjectsRequestsType = {
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
    id: string,
}

export type getAllProjectsResponseType = {
    projects: Project[]

}

export type getProjectByIdResponseType = {
    project: Project
}