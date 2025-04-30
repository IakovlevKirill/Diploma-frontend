import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    getTestRequestResponseType,
    loginRequestType, loginResponseType,
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
        getTestRequest: builder.query<getTestRequestResponseType, void>({
            query: arg => ({
                url: `${baseUrl}/api/test`,
                method: 'GET',
                body: arg,
            })
        }),
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
    }),
});


export const {
    useGetTestRequestQuery,
    useRegisterRequestMutation,
    useLoginRequestMutation
} = diplomaApi;
