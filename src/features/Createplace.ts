import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryAccessToken from './baseQuery';

export interface Space {
    id: string;
    name: string;
    select:boolean;

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

        getPlaceList: builder.query<Space[], null>({
            query: () => ({
                url: '/api/places/list/',
                method: 'GET'
                
            }),
            providesTags: ['Places'],
        }),

        patchPlace: builder.mutation<any, { id: string; data: Partial<Space> }>({
            query: ({ id, data }) => ({
                url: `/api/places/update/${id}/`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Places'],
        } )

    })
})


export const {useCreatePlaceMutation,useGetPlaceListQuery,usePatchPlaceMutation}=apiCreatePlace;