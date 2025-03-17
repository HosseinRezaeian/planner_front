import { useEffect, useRef, useState } from "react";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { Button, Menu, Paper, Input, FocusTrap, Modal } from "@mantine/core";
import "../../../style/folder.css";
import "../../../style/note.css";
import { useCreateNoteMutation, useDeleteFolderMutation, useDeleteNoteMutation, useGetFolderWithNoteQuery } from "../../../features/NoteFolderApi";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import ContextMenu from "../../../components/RightClickMenu";

interface DropdownProps {
    label: string;
    id_folder?: string;
}

const DropdownFolder: React.FC<DropdownProps> = ({ label, id_folder }) => {
 const [selectedSpace, setSelectedSpace] = useLocalStorage({
        key: 'select_space',
        defaultValue: "",
    });



    
    const [isOpen, setIsOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
    const [menuItems, setMenuItems] = useState<{ label: string; action: () => void }[]>([]);
    const [targetId, setTargetId] = useState<string>("");
    const [inputNote, setInputNote] = useState(false);
    const [noteName, setNoteName] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [noteDeleteId, setDeleteNote] = useState("")
    const [deleteType, setDeleteType] = useState<"note" | "folder">("note");

    



    const [opened, { open:open_delete_modal, close:close_delete_modal }] = useDisclosure(false);
    const { data } = useGetFolderWithNoteQuery(
        { select_space: selectedSpace, id: String(id_folder) },
        { skip: !id_folder || !selectedSpace || !isOpen }
    );
    const [CreateNote] = useCreateNoteMutation();
    const [DeleteNoteApi]=useDeleteNoteMutation()
    const [DeleteFolderApi]=useDeleteFolderMutation()



    const navigate = useNavigate();
    const handleNote = (id: string,folder_id: String) => {
        navigate(`${folder_id}/note/${id}`);
    };



    const deleteNoteOrFolder = () => {
        console.log("deleted", noteDeleteId);
        if (noteDeleteId) {
            if (deleteType === "note") {
                DeleteNoteApi({ select_space: selectedSpace,folder_id:String(id_folder), id: noteDeleteId }); 
            } else {
                
                DeleteFolderApi({ select_space: selectedSpace, id: noteDeleteId }); 
            }
        }
        close_delete_modal();
    };




    const handleContextMenuFolder = (event: React.MouseEvent, folderId: string) => {
        event.preventDefault();
        setMenuPosition(null);
        setTargetId(folderId);

        setMenuItems([
            {
                label: "Add note",
                action: () => {
                    setInputNote(!inputNote);
                    setIsOpen(true);
                },
                
            },

            {
                label: "Delete folder", 
                action: () => {
                    console.log("delete folder", folderId);
                    setDeleteNote(folderId);
                    setDeleteType("folder"); 
                    open_delete_modal();
                },
                
            }
        ]);

        setMenuPosition({ x: event.clientX, y: event.clientY });
    };

    const handleContextMenuNote = (event: React.MouseEvent, noteId: string) => {
        event.preventDefault();
        setTargetId(noteId);

        setMenuItems([
            {
                label: "delete",
                action: () => {
                    
                    setDeleteNote(noteId);
                    setDeleteType("note"); 
                    open_delete_modal();
                },
            },
        ]);

        setMenuPosition({ x: event.clientX, y: event.clientY });
    };


    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            console.log("مقدار ورودی:", noteName);
            if (noteName) {
                CreateNote({ select_space: selectedSpace,folder_id: String(id_folder), data: {  name: noteName } })
            }
            setInputNote(false);
        }
    };

    useEffect(() => {
        if (inputNote && inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputNote]);

    return (
 
        <div className="relative">
            <div onContextMenu={(event) => handleContextMenuFolder(event, String(id_folder))}>
                <Button onClick={() => setIsOpen((prev) => !prev)} variant="subtle" className="dropdown">
                    {label}
                    {isOpen ? <IconChevronDown size="24" strokeWidth={2} /> : <IconChevronRight />}
                </Button>
            </div>

            <Modal opened={opened} onClose={close_delete_modal} title="WORNING">
                <h2>Are you sure for delete this note?</h2>
                <Button onClick={()=>{deleteNoteOrFolder()}}>Yes</Button>
                <Button onClick={close_delete_modal}>No</Button>
            </Modal>

            <ContextMenu position={menuPosition} onClose={() => setMenuPosition(null)} items={menuItems} targetId={targetId} />


            {isOpen && (
                <>
                    {inputNote && (
                        <FocusTrap active>
                            <Input onChange={(e) => setNoteName(e.target.value)}
                                ref={inputRef}
                                placeholder="Add a name for note ..."
                                onKeyDown={handleKeyDown}
                                variant="filled" size="xs"
                                onBlur={() => setInputNote(false)}
                            />
                        </FocusTrap>
                    )}

                    <div className="children" >
                        {data &&
                            data.notes?.map((item) => (
                                <div key={id_folder} onContextMenu={(event) => handleContextMenuNote(event, String(item.id))}>
                                    <Button variant="subtle" onClick={() => handleNote(item.id, id_folder ?? "default_value")} className="note" key={item.id}>
                                        📝 {item.name}
                                    </Button>
                                </div>
                            ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default DropdownFolder;
