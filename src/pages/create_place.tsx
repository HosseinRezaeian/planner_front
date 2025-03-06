import { TextInput, Stack, Container, Paper, Button } from "@mantine/core";
import React, { useState } from "react";
import { useCreatePlaceMutation } from "../features/Createplace";
import { Navigate } from "react-router-dom";

const CreatePlace: React.FC = () => {
    const [CreatePlaceApi] = useCreatePlaceMutation();
    const [placeName, setPlaceName] = useState("");
    const [redirect, setRedirect] = useState(false); // 🚀 مدیریت ریدایرکت

    const createPlace = async () => {
        try {
            await CreatePlaceApi(placeName).unwrap(); // منتظر پاسخ می‌مانیم
            setRedirect(true); // بعد از موفقیت، تغییر state برای ریدایرکت
        } catch (error) {
            console.error("Error creating place:", error);
        }
    };

    // اگر redirect مقدار true داشته باشد، هدایت انجام می‌شود
    if (redirect) {
        return <Navigate to="/" replace />;
    }

    return (
        <Container size={400} mt="150">
            <Paper shadow="lg" radius="lg" p="xl" style={{ backgroundColor: "#f0f0f0" }}>
                <Stack>
                    <TextInput
                        label="Name Space"
                        onChange={(e) => setPlaceName(e.target.value)}
                    />
                    <Button onClick={createPlace}>Create Space</Button>
                </Stack>
            </Paper>
        </Container>
    );
};

export default CreatePlace;
