import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    User,
    Project,
    CanvasNode,
} from "../store/types.ts";

const host = import.meta.env.VITE_HOST
const port = import.meta.env.VITE_PORT
const baseUrl = `${host}:${port}`

export const diplomaApi = createApi({
    reducerPath: 'diplomaApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({

        /// AUTH

        registerRequest: builder.mutation<{
            result: "success" | "failure",
            data: {
                access_token: string;
                id: string;
            }
        }, {
            email: string;
            password: string;
        }>({
            query: arg => ({
                url: `${baseUrl}/api/auth/register`,
                method: 'POST',
                body: arg,
            })
        }),

        loginRequest: builder.mutation<{
            result: "success" | "failure";
            data: {
                access_token: string;
                id: string;
            },
        }, {
            email: string;
            password: string;
        }>({
            query: arg => ({
                url: `${baseUrl}/api/auth/login`,
                method: 'POST',
                body: arg,
            })
        }),

        /// USER

        changeUserPassword: builder.mutation<{
            result: "success" | "failure",
            data: {
                message: string
            }
        }, {
            userId: string,
            new_password: string,
            old_password: string
        }>({
            query: arg => ({
                url: `${baseUrl}/api/user/change/password`,
                method: 'POST',
                body: arg
            })
        }),

        getUserById: builder.query<{
            result: "success" | "failure";
            data: {
                user: User
            }
        }, {
            userId: string
        }>({
            query: (userId) => ({
                url: `${baseUrl}/api/user/get?userId=${userId.userId}`,
                method: 'GET',
            })
        }),

        /// PROJECTS

        createProject: builder.mutation<{
            result: "success" | "failure";
            data: {
                project: Project;
            }
        }, {
            userId: string;
        }>({
            query: arg => ({
                url: `${baseUrl}/api/project/create`,
                method: 'POST',
                body: arg,
            })
        }),
        getAllProjects: builder.query<{
            result: "success" | "failure",
            data: {
                projects: Project[];
            }
        }, {
            userId: string
        }>({
            query: (userId) => ({
                url: `${baseUrl}/api/project/get/all?userId=${userId.userId}`,
                method: 'GET',
            })
        }),
        getProjectById: builder.query<{
            result: "success" | "failure",
            data: {
                project: Project;
            }
        }, {
            projectId: string;
        }>({
            query: (projectId) => ({
                url: `${baseUrl}/api/project/get?projectId=${projectId.projectId}`,
                method: 'GET',
            })
        }),
        deleteProject: builder.mutation<{
            result: "success" | "failure",
            message: string
        }, {
            projectId: string;
        }>({
            query: (projectId) => ({
                url: `${baseUrl}/api/project/delete?projectId=${projectId.projectId}`,
                method: 'DELETE',
            })
        }),
        pinProject: builder.mutation<{
            result: "success" | "failure",
            message: string,
        }, {
            projectId: string
        }>({
            query: (arg) => ({
                url: `${baseUrl}/api/project/pin`,
                method: 'POST',
                body: arg
            })
        }),
        unpinProject: builder.mutation<{
            result: "success" | "failure",
            message: string,
        }, {
            projectId: string
        }>({
            query: (arg) => ({
                url: `${baseUrl}/api/project/unpin`,
                method: 'POST',
                body: arg
            })
        }),
        getPinnedProjects: builder.query<{
            result: "success" | "failure",
            data: {
                projects: Project[]
            }
        }, {
            userId: string
        }>({
            query: (userId) => ({
                url: `${baseUrl}/api/project/get/pinned?userId=${userId.userId}`,
                method: 'GET',
            })
        }),
        changeProjectTitle: builder.mutation<{
            result: "success" | "failure",
            message: string,
        }, {
            projectId: string,
            projectTitle: string
        }>({
            query: arg => ({
                url: `${baseUrl}/api/project/change/title`,
                method: 'POST',
                body: arg
            })
        }),
        duplicateProject: builder.mutation<{
            result: "success" | "failure",
            data: {
                project: Project
            }
        }, {
            userId: string,
            newTitle: string
        }>({
            query: arg => ({
                url: `${baseUrl}/api/project/duplicate`,
                method: 'POST',
                body: arg,
            })
        }),

        /// NODES

        createNode: builder.mutation<{
            result: "success" | "failure",
            data: {
                created_node: CanvasNode,
            }
        }, {
            id: string,
            pointColor: string,
            name: string,
            projectId: string,
            position: { x: number; y: number },
            size: { width: number; height: number; },
            parentId: string,
            children: string[],
            color: string
        }>({
            query: arg => ({
                url: `${baseUrl}/api/project/node/create`,
                method: 'POST',
                body: arg,
            })
        }),
        getAllProjectNodesByProjectId: builder.query<{
            result: "success" | "failure",
            data: {
                nodes: CanvasNode[]
            }
        }, {
            projectId: string
        }>({
            query: (projectId) => ({
                url: `${baseUrl}/api/project/nodes/get?projectId=${projectId.projectId}`,
                method: 'GET',
            })
        }),
        deleteNode: builder.mutation<{
            result: "success" | "failure";
            message: string;
        }, {
            nodeId: string
        }>({
            query: (nodeId) => ({
                url: `${baseUrl}/api/project/node/delete?nodeId=${nodeId.nodeId}`,
                method: 'DELETE',
            })
        }),
        updateNode: builder.mutation<{
            result: "success" | "failure",
            message: string
        }, {
            id: string,
            pointColor: string,
            name: string,
            position: { x: number; y: number },
            size: { width: number; height: number; },
            parentId: string,
            children: string[],
            color: string
        }>({
            query: (arg) => ({
                url: `${baseUrl}/api/project/node/update`,
                method: 'POST',
                body: arg,
            })
        }),
        getNodeChildren: builder.query<{
            result: "success" | "failure",
            data: {
                nodes: CanvasNode[]
            }
        }, {
            nodeId: string
        }>({
            query: (nodeId) => ({
                url: `${baseUrl}/api/project/node/get/children?nodeId=${nodeId.nodeId}`,
                method: 'GET',
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
    useGetPinnedProjectsQuery,
    useChangeUserPasswordMutation,
    useGetUserByIdQuery,
    useChangeProjectTitleMutation,
    useDuplicateProjectMutation,
    useUnpinProjectMutation,
    useCreateNodeMutation,
    useDeleteNodeMutation,
    useGetAllProjectNodesByProjectIdQuery,
    useUpdateNodeMutation,
    useLazyGetNodeChildrenQuery
} = diplomaApi;
