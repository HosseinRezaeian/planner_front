import { DirectionProvider, MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Login from "../pages/Users/Login";
import AppView from "../pages/Appshell/AppShell";
import { AuthProvider } from "../contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
// import Todo from "../pages/Todo";
import DisjointGraph from "../pages/graph";

import CreatePlace from "../pages/Space/create_place";
import NoteOpen from "../pages/Notes/note";
import ContextMenu from "../pages/test_rightclickmenu";
import Mark from "../pages/test_md";
import Calendar from "../pages/calendar";
import DropDND from "../pages/dropdown";


// import { theme } from "./theme"; 
const auth = { isAuthenticated: false }; // Change to true for testing

export default function Router() {
    return (

        <MantineProvider>

            <DirectionProvider>
                <BrowserRouter>
                    <AuthProvider>

                        <Routes>
                            <Route path="login" element={<Login />} />
                            <Route path="create-place" element={<CreatePlace />} />
                            <Route path="graph/org" element={<DisjointGraph />} />



                            <Route path="/" element={
                                <ProtectedRoute>
                                    <AppView />
                                </ProtectedRoute>
                            } >
                                <Route index element={<h1>Home</h1>} />

                                <Route path="calendar" element={<Calendar />} />

                                <Route path="graph" element={<DisjointGraph />} />
                                <Route path="dnd" element={<DropDND />} />


                                <Route path=":folder/note/:id" element={<NoteOpen />} />
             



                            </Route>

                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </DirectionProvider>
        </MantineProvider>

    );
}