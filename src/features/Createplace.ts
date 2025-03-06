import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryAccessToken from './baseQuery';


export const apiCreatePlace = createApi({
    reducerPath:'Place',
    baseQuery: baseQueryAccessToken,
    tagTypes: ['Places'],



endpoints:(builder)=>({
        createPlace: builder.mutation<any,string>({
            query: (name) => ({
                url: '/places/create-place/',
                method: 'POST',
                body:{name:name}

            }),
        }),
    })
})


export const {useCreatePlaceMutation}=apiCreatePlace;