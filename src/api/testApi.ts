import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const host = import.meta.env.VITE_HOST
const port = import.meta.env.VITE_PORT
const baseUrl = `${host}:${port}`

export const testApi = createApi({
    reducerPath: 'testApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({

    }),
});


export const {

} = testApi;
