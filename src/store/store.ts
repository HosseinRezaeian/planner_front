import { configureStore } from '@reduxjs/toolkit';
// import { apiSlice } from '../features/TodoApi';
import { apinoteSlice } from '../features/NoteFolderApi';
import { apiCreatePlace } from '../features/Createplace';


const store = configureStore({
  reducer: {
    // [apiSlice.reducerPath]: apiSlice.reducer,
    [apinoteSlice.reducerPath]: apinoteSlice.reducer,
    [apiCreatePlace.reducerPath]: apiCreatePlace.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // .concat(apiSlice.middleware)
      .concat(apinoteSlice.middleware)
      .concat(apiCreatePlace.middleware),
});
export default store;