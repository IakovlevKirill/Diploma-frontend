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
    pinProjectRequestType,
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
        getProjectById: builder.query<getProjectByIdResponseType, void>({
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
        getPinnedProject: builder.query<getAllProjectsResponseType, string>({
            query: (userId) => ({
                url: `${baseUrl}/api/project/get/pinned?userId=${userId}`,
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
    useGetPinnedProjectQuery
} = diplomaApi;
