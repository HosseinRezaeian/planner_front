import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { data } from 'react-router-dom';
import baseQueryWithReAuth from './baseQueryAccessToken';

export interface NoteContent{

    id: string,
    filed_type: string,
    is_checked: boolean,
    content: string,
    order: number,

}

export interface Note {
    id: string,
    name: string,
    description: string,
    folder: string,
    created_at: string,
    updated_at: string,
    content:NoteContent[],
    

}
export interface Folder {
    id: number,
    name: string,
    description: string
    notes?: Note[]

}

export const apinoteSlice = createApi({
    reducerPath: 'noteCat',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['NoteFolder', 'note','NoteContent'],


    endpoints: (builder) => ({

        getFolder: builder.query<Folder[], { select_space: string }>({
            query: ({ select_space }) => ({
                url: `/api/${select_space}/folders/`,
                method: 'GET',
                providesTags: ['NoteFolder']
            }),
            providesTags: ['NoteFolder']
        }),
        getFolderWithNote: builder.query<Folder, { select_space: string, id: string }>({
            query: ({ select_space, id }) => ({
                url: `/api/${select_space}/folders/${id}/`,
                method: 'GET',
            }),
            providesTags: ['NoteFolder']
        }),

        CreateFolder: builder.mutation<Note, { select_space: string, data: Partial<Folder> }>({
            query: ({ select_space,  data}) => ({
                url: `/api/${select_space}/folders/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['NoteFolder']
        }),

        DeleteFolder: builder.mutation<void, { select_space: string; id: string }>({
            query: ({ select_space, id }) => ({
                url: `/api/${select_space}/folders/${id}/`,  // Assuming your backend follows RESTful structure
                method: 'DELETE',
            }),
            invalidatesTags: [ "note",'NoteFolder'], 
        }),




        
        getNotewithId: builder.query<Note, { select_space: string,folder_id: string, id: string }>({
            query: ({ select_space,folder_id, id }) => ({
                url: `/api/${select_space}/folders/${folder_id}/notes/${id}/`,
                method: 'GET',
            }),
            providesTags: ['note']
        }),

        PatchNotewithId: builder.mutation<Note, { select_space: String,folder_id: string, id: string, data: Partial<Note> }>({
            query: ({ select_space,folder_id, id ,data}) => ({
                url: `/api/${select_space}/folders/${folder_id}/notes/${id}/`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['note','NoteFolder']
        }),

        CreateNote: builder.mutation<Note, { select_space: string,folder_id: string, data: Partial<Note> }>({
            query: ({ select_space,folder_id,  data}) => ({
                url: `/api/${select_space}/folders/${folder_id}/notes/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['note','NoteFolder']
        }),

        DeleteNote: builder.mutation<void, { select_space: string;folder_id:String; id: string }>({
            query: ({ select_space,folder_id, id }) => ({
                url: `/api/${select_space}/folders/${folder_id}/notes/${id}/`,  // Assuming your backend follows RESTful structure
                method: 'DELETE',
            }),
            invalidatesTags: ['NoteFolder'], // This ensures the cache is updated
        }),




        PatchContentNote: builder.mutation<Note, { select_space: string,note:string,folder_id: string,id:string, data: Partial<NoteContent> }>({
            query: ({ select_space,note,folder_id,id,  data}) => ({
                url: `/api/${select_space}/folders/${folder_id}/notes/${note}/content/${id}/`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['note']
        }),




    })

})

export const {
    useGetFolderQuery,
    useGetFolderWithNoteQuery, 
    useCreateFolderMutation,
    useDeleteFolderMutation,

    useGetNotewithIdQuery,
    usePatchNotewithIdMutation,
    useCreateNoteMutation,
    useDeleteNoteMutation,


    usePatchContentNoteMutation,
  
} = apinoteSlice;