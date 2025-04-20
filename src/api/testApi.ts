import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {getTestRequestResponseType} from "../store/types.ts";

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
    }),
});


export const {
    useGetTestRequestQuery
} = diplomaApi;
