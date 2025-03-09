import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryAccessToken from './baseQuery';

export interface Space {
    id: number;
    name: string;

}
export const apiCreatePlace = createApi({
    reducerPath:'Place',
    baseQuery: baseQueryAccessToken,
    tagTypes: ['Places'],



endpoints:(builder)=>({
        createPlace: builder.mutation<any,string>({
            query: (name) => ({
                url: 'api/places/create-place/',
                method: 'POST',
                body:{name:name}

            }),
        }),

        getPlaceList: builder.query<Space[], void>({
            query: () => ({
                url: '/api/places/list/',
                method: 'GET'

            }),
        }),


    })
})


export const {useCreatePlaceMutation,useGetPlaceListQuery}=apiCreatePlace;