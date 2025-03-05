import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/TodoApi';
import { apinoteSlice } from '../features/NoteApi';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apinoteSlice.reducerPath]: apinoteSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
