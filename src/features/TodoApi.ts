// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// // import baseQueryAccessToken from './baseQuery';


// export interface Todo{
//     id:number,
//     title:string,
//     done:boolean

// }




// export const apiSlice = createApi({
//     reducerPath:'todoApi',
//     baseQuery: baseQueryAccessToken,
//     tagTypes: ['Todos'],

//     endpoints:(builder)=>({
//         getTodos: builder.query<Todo[], void>({
//             query: () => ({
//                 url: '/todo/list/',
//                 method: 'GET',

//             }),
//             providesTags: ['Todos'],
//         }),
//         createTodo: builder.mutation<Todo, { title: string; done: boolean }>({
//             query: (newTodo) => ({
//                 url: '/todo/',
//                 method: 'POST',
//                 body: newTodo,
//             }),
//             invalidatesTags: ['Todos'],
//         }),


//     })
// })

// export const {useGetTodosQuery,useCreateTodoMutation}=apiSlice;