import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetNotewithIdQuery, usePatchNotewithIdMutation } from "../../features/NoteFolderApi";
import { useLocalStorage } from "@mantine/hooks";
import { Button, Group, Paper, Stack, Text, TextInput, Textarea } from "@mantine/core";
// import { Input } from "postcss";



const NoteOpen: React.FC = () => {
    const { id } = useParams();
    const [selected, setSelected] = useLocalStorage({
        key: 'select_space',
        defaultValue: "",
    });
    const [patchNote] = usePatchNotewithIdMutation();
    const { data } = useGetNotewithIdQuery({ select_space: selected, id: id ?? "" },
        { skip: !id });

 
    const old_name=data?.name;
    const old_note_value=data?.content
    const [name, setName] = useState("")
    const [value, setValue] = useState("")


    useEffect(() => {
        if (data) {
            setName(data.name || "");  // Avoid undefined
            setValue(data.content || "");
        }
    }, [data]);



    const handelSave = () => {
        const send_data: Record<string, any> = {};
        if (name.trim() !== "") {
            send_data.name = name;
        }
        if (value.trim() !== "") {
            send_data.content = value;
        }
        if (Object.keys(send_data).length > 0) {
            patchNote({ id: id ?? "", select_space: selected, data: send_data })
        }

    }



    return (


        <Stack>
            <Group justify="space-between" w="100%">
                <h2>                <TextInput value={name} variant="unstyled" size="xl"  onChange={(event) => setName(event.currentTarget.value)}></TextInput>
                </h2>                {name != old_name || value != old_note_value ? (<Button onClick={handelSave}>save</Button>) : ""}

            </Group>
            <div>
                <p>folder:{data?.folder}</p>
                <p>create date:{data?.created_at}</p>
                <p>update date:{data?.updated_at}</p>
            </div>
            <Group>
            </Group>

            <iframe 
            src="http://localhost:3000/graph/org" 
            width="800" 
            height="600" 
            style={{ border: "1px solid black" }} 
        />
            <Textarea
                value={value}
                size="md"
                autosize
                onChange={(event) => setValue(event.currentTarget.value)}
                minRows={30}


            ></Textarea>
        </Stack>


    )


}

export default NoteOpen;