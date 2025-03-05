import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import { Input, Stack, PasswordInput, Paper, Button, Container } from '@mantine/core';





const Login: React.FC = () => {
    const auth = useContext(AuthContext);
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("try");

        if (auth) {
            console.log("send");
          await auth.login(username, password);
          console.log(auth.isAuthenticated);
        }
      };
    return (
        <Container size={400} mt="150">
            <Paper
                shadow="lg"
                radius="lg"
                p="xl"
                style={{ backgroundColor: "#f0f0f0" }} 
            >
                <form onSubmit={handleLogin}  style={{ width: "100%" }}>
                    <Stack>
                        <h1 style={{ textAlign: "center", color: "#333" }}>Login</h1>
                        <Input onChange={(e) => setEmail(e.target.value)} placeholder="username" my="sm" />
                        <PasswordInput onChange={(e) => setPassword(e.target.value)} placeholder="password" my="sm" />
                        <Button  type="submit">submit</Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );

}
export default Login;