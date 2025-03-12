import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryAccessToken from './baseQuery';
import { data } from 'react-router-dom';


export interface Note {
    id: string,
    name: string,
    description: string,
    content: string,
    folder: string,
    created_at: string,
    updated_at: string,
    

}
export interface Folder {
    id: number,
    name: string,
    description: string
    notes?: Note[]

}

export const apinoteSlice = createApi({
    reducerPath: 'noteCat',
    baseQuery: baseQueryAccessToken,
    tagTypes: ['NoteFolder', 'note'],


    endpoints: (builder) => ({

        getFolder: builder.query<Folder[], { select_space: string }>({
            query: ({ select_space }) => ({
                url: `/api/${select_space}/folder/`,
                method: 'GET',
                providesTags: ['NoteFolder']
            }),
        }),
        getFolderWithNote: builder.query<Folder, { select_space: string, id: string }>({

            query: ({ select_space, id }) => ({
                url: `/api/${select_space}/folder/${id}/`,

                method: 'GET',
            }),
            providesTags: ['NoteFolder']
        }),

        getFolderWithNotelazy: builder.query<any, { select_space: string; id: string }>({
            query: ({ select_space, id }) => `folders/${id}?space=${select_space}`,
            providesTags: ['note']
        }),



        getNotewithId: builder.query<Note, { select_space: string, id: string }>({

            query: ({ select_space, id }) => ({
                url: `/api/${select_space}/note/${id}/`,

                method: 'GET',
            }),
            providesTags: ['note']
        }),

        PatchNotewithId: builder.mutation<Note, { select_space: string, id: string, data: Partial<Note> }>({

            query: ({ select_space, id ,data}) => ({
                url: `/api/${select_space}/note/${id}/`,

                method: 'PATCH',
                body: data
                
            }),
            // transformResponse: (response: Note) => response, 
            invalidatesTags: ['note','NoteFolder']
        }),

        CreateNote: builder.mutation<Note, { select_space: string, data: Partial<Note> }>({

            query: ({ select_space,  data}) => ({
                url: `/api/${select_space}/note/`,

                method: 'POST',
                body: data
                
            }),
            
            invalidatesTags: ['note','NoteFolder']
        }),


        DeleteNote: builder.mutation<void, { select_space: string; id: string }>({
            query: ({ select_space, id }) => ({
                url: `/api/${select_space}/note/${id}/`,  // Assuming your backend follows RESTful structure
                method: 'DELETE',
            }),
            invalidatesTags: ['note', 'NoteFolder'], // This ensures the cache is updated
        }),


    })

})

export const {
    useGetFolderQuery,
    useGetFolderWithNoteQuery, 
    useLazyGetFolderWithNoteQuery,
    useGetNotewithIdQuery,
    usePatchNotewithIdMutation,
    useCreateNoteMutation,
    useDeleteNoteMutation
} = apinoteSlice;