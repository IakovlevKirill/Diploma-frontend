import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    createProjectRequestType,
    createProjectResponseType,
    getAllProjectsResponseType,
    getProjectByIdResponseType,
    loginRequestType,
    loginResponseType,
    registerRequestType,
    registerResponseType,
    pinProjectRequestType, User, Project, CanvasNode,
} from "../store/types.ts";

const host = import.meta.env.VITE_HOST
const port = import.meta.env.VITE_PORT
const baseUrl = `${host}:${port}`

export const diplomaApi = createApi({
    reducerPath: 'diplomaApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        registerRequest: builder.mutation<registerResponseType, registerRequestType>({
            query: arg => ({
                url: `${baseUrl}/api/auth/register`,
                method: 'POST',
                body: arg,
            })
        }),
        loginRequest: builder.mutation<loginResponseType, loginRequestType>({
            query: arg => ({
                url: `${baseUrl}/api/auth/login`,
                method: 'POST',
                body: arg,
            })
        }),
        createProject: builder.mutation<createProjectResponseType, createProjectRequestType>({
            query: arg => ({
                url: `${baseUrl}/api/project/create`,
                method: 'POST',
                body: arg,
            })
        }),
        getAllProjects: builder.query<getAllProjectsResponseType, string>({
            query: (userId) => ({
                url: `${baseUrl}/api/project/get/all?userId=${userId}`,
                method: 'GET',
            })
        }),
        getProjectById: builder.query<{project: Project}, string>({
            query: (projectId) => ({
                url: `${baseUrl}/api/project/get?projectId=${projectId}`,
                method: 'GET',
            })
        }),
        deleteProject: builder.mutation<void, string>({
            query: (projectId) => ({
                url: `${baseUrl}/api/project/delete?projectId=${projectId}`,
                method: 'DELETE',
            })
        }),
        pinProject: builder.mutation<void, pinProjectRequestType>({
            query: (arg) => ({
                url: `${baseUrl}/api/project/pin`,
                method: 'POST',
                body: arg
            })
        }),
        unpinProject: builder.mutation<void, pinProjectRequestType>({
            query: (arg) => ({
                url: `${baseUrl}/api/project/unpin`,
                method: 'POST',
                body: arg
            })
        }),
        getPinnedProject: builder.query<getAllProjectsResponseType, string>({
            query: (userId) => ({
                url: `${baseUrl}/api/project/get/pinned?userId=${userId}`,
                method: 'GET',
            })
        }),
        changeUserPassword: builder.mutation<void, {userId: string, new_password: string, old_password: string}>({
            query: arg => ({
                url: `${baseUrl}/api/user/change/password`,
                method: 'POST',
                body: arg
            })
        }),
        getUserById: builder.query<User, void>({
            query: (userId) => ({
                url: `${baseUrl}/api/user/get?userId=${userId}`,
                method: 'GET',
            })
        }),
        changeProjectTitle: builder.mutation<void, {projectId: string, projectTitle: string}>({
            query: arg => ({
                url: `${baseUrl}/api/project/change/title`,
                method: 'POST',
                body: arg
            })
        }),
        duplicateProject: builder.mutation<createProjectResponseType, { userId: string, newTitle: string }>({
            query: arg => ({
                url: `${baseUrl}/api/project/duplicate`,
                method: 'POST',
                body: arg,
            })
        }),

        /// NODES

        createNode: builder.mutation<{created_node_id :string}, {
            name: string,
            projectId: string,
            position: { x: number; y: number },
            size: { width: number; height: number ; },
            parent: string,
            children: string[],
            color: string,
        }>({
            query: arg => ({
                url: `${baseUrl}/api/project/node/create`,
                method: 'POST',
                body: arg,
            })
        }),
        getNodesByProjectId: builder.query<CanvasNode[], string>({
            query: (projectId) => ({
                url: `${baseUrl}/api/project/nodes/get?projectId=${projectId}`,
                method: 'GET',
            })
        }),
        deleteNode: builder.mutation<void, string>({
            query: (nodeId) => ({
                url: `${baseUrl}/api/project/node/delete?nodeId=${nodeId}`,
                method: 'DELETE',
            })
        }),
        updateNode: builder.mutation<void, {id: string, x: number, y: number}>({
            query: (arg) => ({
                url: `${baseUrl}/api/project/node/update`,
                method: 'POST',
                body: arg,
            })
        }),
    }),
});


export const {
    useRegisterRequestMutation,
    useLoginRequestMutation,
    useCreateProjectMutation,
    useGetAllProjectsQuery,
    useGetProjectByIdQuery,
    useDeleteProjectMutation,
    usePinProjectMutation,
    useGetPinnedProjectQuery,
    useChangeUserPasswordMutation,
    useGetUserByIdQuery,
    useChangeProjectTitleMutation,
    useDuplicateProjectMutation,
    useUnpinProjectMutation,
    useCreateNodeMutation,
    useDeleteNodeMutation,
    useGetNodesByProjectIdQuery,
    useUpdateNodeMutation,
} = diplomaApi;
