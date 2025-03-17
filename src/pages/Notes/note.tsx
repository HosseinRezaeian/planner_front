import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetNotewithIdQuery, usePatchContentNoteMutation, usePatchNotewithIdMutation } from "../../features/NoteFolderApi";
import { useLocalStorage } from "@mantine/hooks";
import { ActionIcon, Button, Group, Paper, Stack, Tabs, Text, TextInput, Textarea, ThemeIcon } from "@mantine/core";



import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { IconColumns2, IconSpacingHorizontal } from "@tabler/icons-react";
import "../../style/note.css"
import RichTextEditor from "./components/textEditor";
import MarkdownEdit from "./components/textMarkdown";
import TextEditor from "./components/textEditor";
import CheckBoxText from "./components/textCheckbox";


// import { Editor, EditorState } from 'draft-js';
// import 'draft-js/dist/Draft.css';


const NoteOpen: React.FC = () => {
    const { id } = useParams();
    const { folder } = useParams();
    const [selectedSpace, setSelectedSpace] = useLocalStorage({
        key: 'select_space',
        defaultValue: "",
    });
    const [selected_folder, setSelectedFolder] = useLocalStorage<string>({
        key: 'select_folder',
        defaultValue: '',
    });
    const [patchNote] = usePatchNotewithIdMutation();
    const { data } = useGetNotewithIdQuery({ select_space: selectedSpace, folder_id: String(folder), id: id ?? "" },
        { skip: !id });

    const [patchNoteContent] = usePatchContentNoteMutation();


    const old_name = data?.name;
    const old_note_value = data?.content;

    const [name, setName] = useState("");
    const [value, setValue] = useState("");

    useEffect(() => {
        setName(String(data?.name))
    }, [data])


    const handelSave = () => {
        patchNote({ folder_id: folder ?? "default_folder", select_space: selectedSpace, id: String(data?.id), data: { name: name } })
    }


    const handelContent = (content_id: string, data: any) => {
        patchNoteContent({ folder_id: String(folder), select_space: selectedSpace, note: String(id), id: content_id, data: data })
    }

    return (
        <Stack>
            <Group justify="space-between" w="100%">
                <h1>
                    <TextInput value={name} variant="unstyled" size="xl" onChange={(event) => setName(event.currentTarget.value)} />
                    {name !== old_name ? (<Button onClick={handelSave}>save</Button>) : ""}
                </h1>
                {/* <RichTextEditor /> */}
            </Group>


            {data &&
                data.content.map((item) =>
                    item.filed_type == "md" ? (
                        <div className="note-box">
                            <MarkdownEdit onChange={handelContent} id={item.id} value={item.content} />
                        </div>
                    ) : item.filed_type == "checkbox" ? (


                        <div className="note-box">
                            <CheckBoxText id={item.id} value={item.content} check={item.is_checked} onChange={handelContent} />
                        </div>

                    ) : item.filed_type == "text" ? (
                        <div className="note-box">
                            <TextEditor onChange={handelContent} id={item.id} value={item.content} />
                        </div>
                    ) : (
                        <p>i cant find type this!!!</p>
                    )
                )}

        </Stack>

    );
}
export default NoteOpen;