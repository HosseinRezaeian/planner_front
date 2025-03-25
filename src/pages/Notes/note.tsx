import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateNoteContentMutation, useDeleteNoteContentMutation, useGetNotewithIdQuery, usePatchContentNoteMutation, usePatchNotewithIdMutation } from "../../features/NoteFolderApi";
import { useLocalStorage } from "@mantine/hooks";
import { ActionIcon, Button, FocusTrap, Group, Modal, Paper, Stack, Tabs, Text, TextInput, Textarea, ThemeIcon } from "@mantine/core";



import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { IconArrowRight, IconColumns2, IconSpacingHorizontal, IconSquareX, IconX } from "@tabler/icons-react";
import "../../style/note.css"
import RichTextEditor from "./components/textEditor";
import MarkdownEdit from "./components/textMarkdown";
import TextEditor from "./components/textEditor";
import CheckBoxText from "./components/textCheckbox";



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

    const [addBtn, setAddBtn] = useState("");
    const [addNoteText, setNoteText] = useState("");
    const [deleteBtnValue, setdeleteBtnValue] = useState("");


    const [patchNote] = usePatchNotewithIdMutation();
    const { data } = useGetNotewithIdQuery({ select_space: selectedSpace, folder_id: String(folder), id: id ?? "" },
        { skip: !id });

    const [patchNoteContent] = usePatchContentNoteMutation();
    const [createNoteContent] = useCreateNoteContentMutation();
    const [deleteNoteContent] = useDeleteNoteContentMutation();
    const inputRef = useRef<HTMLInputElement>(null);

    const old_name = data?.name;


    const [name, setName] = useState("");


    useEffect(() => {
        setName(String(data?.name))
    }, [data])

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [addBtn]);


    const handelDeleteContent=()=>{
        deleteNoteContent({folder_id: String(folder), select_space: selectedSpace, note: String(id),id:deleteBtnValue})
        setdeleteBtnValue("")
    }
    const handelSave = () => {
        patchNote({ folder_id: folder ?? "default_folder", select_space: selectedSpace, id: String(data?.id), data: { name: name } })
    }

    const handelContent = (content_id: string, data: any) => {
        patchNoteContent({ folder_id: String(folder), select_space: selectedSpace, note: String(id), id: content_id, data: data })
    }

    const handelCreateNote = () => {
        const data = { filed_type: addBtn, content: addNoteText }
        createNoteContent({ folder_id: String(folder), select_space: selectedSpace, note: String(id), data: data })
        setAddBtn("");
        setNoteText("");
    }
    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log('Enter key pressed!');
            handelCreateNote();
        }
    };


    return (

        <Stack>
            <Modal opened={deleteBtnValue!=""?true:false} onClose={()=>setdeleteBtnValue("")} title="Authentication" centered>
            <h2>Are you sure for delete this note?</h2>
                <Button onClick={()=>{handelDeleteContent()}}>Yes</Button>
                <Button onClick={()=>setdeleteBtnValue("")}>No</Button>
            </Modal>
            <Group justify="space-between" w="100%">
                <h1>
                    <TextInput value={name} variant="unstyled" size="xl" onChange={(event) => setName(event.currentTarget.value)} />
                    {name !== old_name ? (<Button onClick={handelSave}>save</Button>) : ""}
                </h1>
                
            </Group>

            <div className="note-contents">
                {data &&
                    data.content.map((item) =>
                        item.filed_type == "md" ? (
                            <div className="note-box">
                                <ActionIcon
                                    onClick={() => { setdeleteBtnValue(item.id); }}
                                    variant="filled"
                                    radius="xl"
                                    size="lg"
                                    color="red"
                                >
                                    <IconX stroke={2} />
                                </ActionIcon>
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
                            <p>i cant find this type!!!</p>
                        )
                    )}

            </div>
            <div className="fixed-box">

                <Group justify="space-between" w="100%">
                    {addBtn == "" ? (<>
                        <Button className="add-btn" onClick={() => { setAddBtn("checkbox") }} color="gray" radius="lg" size="xs" fullWidth>Task</Button>
                        <Button className="add-btn" onClick={() => { setAddBtn("text") }} color="gray" radius="lg" size="xs" fullWidth>Note</Button>
                        <Button className="add-btn" onClick={() => { setAddBtn("md") }} color="gray" radius="lg" size="xs" fullWidth>MarkDown</Button></>)
                        : (
                            <Group justify="space-between" w="100%" style={{ display: 'flex', alignItems: 'center' }}>
                                <ActionIcon
                                    onClick={() => { setAddBtn(""); }}
                                    variant="filled"
                                    aria-label="Settings"
                                    radius="xl"
                                    size="lg"
                                    style={{ flex: "0 1 auto" }}  // تنظیم عرض به اندازه محتوای داخلی
                                >
                                    <IconX stroke={2} />
                                </ActionIcon>

                                <FocusTrap active>
                                    <TextInput
                                        variant="filled"
                                        radius="xl"
                                        size="xs"
                                        onChange={(e) => { setNoteText(e.currentTarget.value) }}
                                        ref={inputRef}
                                        onKeyDown={handleEnter}
                                        style={{
                                            flex: "1",         // اجازه می‌دهد که TextInput فضا را پر کند
                                            margin: "0 10px"   // فاصله از اطراف
                                        }}
                                    />
                                </FocusTrap>
                                <ActionIcon
                                    onClick={handelCreateNote}
                                    variant="filled"
                                    aria-label="Settings"
                                    radius="xl"
                                    size="lg"
                                    style={{ flex: "0 1 auto" }}  // تنظیم عرض به اندازه محتوای داخلی
                                >
                                    <IconArrowRight stroke={2} />
                                </ActionIcon>
                            </Group>

                        )}
                </Group>
            </div>

        </Stack>

    );
}
export default NoteOpen;