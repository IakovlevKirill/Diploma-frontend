
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
    width: number;
    height: number;
    //     text?: string;
};
// REQUESTS

export type registerRequestType = {
    email: string,
    password: string,
    username: string
}

export type loginRequestType = {
    email: string,
    password: string
    username: string
}


// RESPONSES

export type registerResponseType = {
    access_token: string;
}

export type loginResponseType = {
    access_token: string;
}