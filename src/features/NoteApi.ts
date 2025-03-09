import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryAccessToken from './baseQuery';


export interface Note{
    id:number,
    name:string,
    description:string,
    content:string
    
}
export interface Folder{
    id:number,
    name:string,
    description:string
    notes?:Note[]

}
const sapce = localStorage.getItem('select_space');
console.log("get spase",sapce);
if(!sapce){
    console.log("cant find space");
}
export const apinoteSlice = createApi({
    reducerPath:'noteCat',
    baseQuery: baseQueryAccessToken,
    tagTypes: ['NoteFolder'],
    

    endpoints:(builder)=>({
        getFolder: builder.query<Folder[], {select_space:string}>({
            query: ({select_space}) => ({
                url: `/api/${select_space}/folder/`,
                method: 'GET',
                providesTags: ['NoteFolder']
            }),
        }),
        getFolderWithNote: builder.query<Folder, {select_space:string,id:string}>({ 
            
            query: ({select_space,id}) => ({
                url: `/api/${select_space}/folder/${id}/`,

                method: 'GET',
            }),
        }),




    })
    
})

export const {
    useGetFolderQuery,
    useGetFolderWithNoteQuery,
}=apinoteSlice;