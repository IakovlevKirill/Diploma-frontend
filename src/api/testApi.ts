import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    createProjectRequestType,
    createProjectResponseType, getAllProjectsRequestsType,
    getAllProjectsResponseType,
    getProjectByIdResponseType,
    loginRequestType,
    loginResponseType,
    registerRequestType,
    registerResponseType
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
        getAllProjects: builder.query<getAllProjectsResponseType, { userId : string}>({
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
    }),
});


export const {
    useRegisterRequestMutation,
    useLoginRequestMutation,
    useCreateProjectMutation,
    useGetAllProjectsQuery,
    useGetProjectByIdQuery
} = diplomaApi;
