import { DirectionProvider, MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Login from "../pages/Users/Login";
import AppView from "../pages/Appshell/AppShell";
import { AuthProvider } from "../contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Todo from "../pages/Todo";
import DisjointGraph from "../pages/graph";

import CreatePlace from "../pages/Space/create_place";
import NoteOpen from "../pages/Notes/note";
import ContextMenu from "../pages/test_rightclickmenu";

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
                            <Route path="create-place" element={<CreatePlace/>} />
                            <Route path="graph/org" element={<DisjointGraph/>} />
                            
                            
                            <Route path="/" element={
                                <ProtectedRoute>
                                    <AppView />
                                </ProtectedRoute>
                            } >
                                <Route index element={<h1>Home</h1>} />
                                <Route path="todo" element={<Todo/>} />
                                {/* <Route path="note" element={<Note/>} /> */}
                                <Route path="graph" element={<DisjointGraph/>} />
                                {/* <Route path="note/:id" element={<Note/>} /> */}

                                <Route path="note/:id" element={<NoteOpen/>} />
                                {/* <Route path="menu" element={<ContextMenu/>} /> */}

                                
                            </Route>

                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </DirectionProvider>
        </MantineProvider>

    );
}