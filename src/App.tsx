import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Login from "./pages/Login";
import { configureStore } from '@reduxjs/toolkit';

import Router from "./routers/main_router"
import { apiSlice } from "./features/TodoApi";
import { Provider } from "react-redux";
import { apinoteSlice } from "./features/NoteApi";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apinoteSlice.reducerPath]: apinoteSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, apinoteSlice.middleware),
});

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>

      <Router/>
      </Provider>
    </MantineProvider>);
}
