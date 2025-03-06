import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/TodoApi';
import { apinoteSlice } from '../features/NoteApi';
import { apiCreatePlace } from '../features/Createplace';


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apinoteSlice.reducerPath]: apinoteSlice.reducer,
    [apiCreatePlace.reducerPath]: apiCreatePlace.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, apinoteSlice.middleware),
});
export default store;