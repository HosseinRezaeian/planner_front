import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryAccessToken from './baseQuery';


export interface Note{
    id:number,
    name:string,
    description:string,
    content:string
    
}
export interface NoteCategory{
    id:number,
    name:string,
    description:string
    notes?:Note[]

}

export const apinoteSlice = createApi({
    reducerPath:'noteCat',
    baseQuery: baseQueryAccessToken,
    tagTypes: ['NoteCategory'],

    endpoints:(builder)=>({
        getNoteCategorys: builder.query<NoteCategory[], void>({
            query: () => ({
                url: '/note/category/',
                method: 'GET',

            }),
        }),
        getNoteCategorysWithNote: builder.query<NoteCategory, {id:string}>({ // عدد به عنوان id نیاز است
            
            query: ({id}) => ({
                url: `/note/category/${id}/`,

                method: 'GET',
            }),
        }),




    })
    
})

export const {
    useGetNoteCategorysQuery,
    useGetNoteCategorysWithNoteQuery,
}=apinoteSlice;