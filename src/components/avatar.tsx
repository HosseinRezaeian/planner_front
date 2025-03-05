import React from "react";
import { Avatar } from "@mantine/core";






const AvatarProfile:React.FC=()=>{

    const user = localStorage.getItem("username") ?? "Guest";
    console.log("uuuuu",user)

    return (
        <Avatar  key={user} name={user??""} color="red" bg="gray" />
    );
}
export default AvatarProfile;