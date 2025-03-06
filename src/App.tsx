import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Router from "./routers/main_router"
import { Provider } from "react-redux";
import store from "./store/store";


export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>

      <Router/>
      </Provider>
    </MantineProvider>);
}
