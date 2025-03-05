import { DirectionProvider, MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import AppView from "../pages/AppShell";
import { AuthProvider } from "../contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Todo from "../pages/Todo";
import Note from "../pages/file_note";
import DisjointGraph from "../pages/graph";
import NoteView from "../pages/noteView";
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
                                <Route path="note/view" element={<NoteView/>} />
                            </Route>

                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </DirectionProvider>
        </MantineProvider>

    );
}