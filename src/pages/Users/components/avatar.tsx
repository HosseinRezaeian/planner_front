import React from "react";
import { Avatar } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";






const AvatarProfile:React.FC=()=>{
 const [username, setUsername] = useLocalStorage({
    key: 'username',
    defaultValue: "",
});

    
    return (
        <Avatar  key={username} name={username??""} color="red" bg="gray" />
    );
}
export default AvatarProfile;