import { useEffect, useRef, useState } from "react";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { Button, Menu, Paper, Input, FocusTrap, Modal } from "@mantine/core";
import "../../../style/folder.css";
import "../../../style/note.css";
import { useCreateNoteMutation, useDeleteNoteMutation, useGetFolderWithNoteQuery } from "../../../features/NoteFolderApi";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import ContextMenu from "../../../components/RightClickMenu";

interface DropdownProps {
    label: string;
    id?: string;
}

const DropdownFolder: React.FC<DropdownProps> = ({ label, id }) => {
    const [selected, setSelected] = useLocalStorage<string>({
        key: "select_space",
        defaultValue: "",
    });

    const [isOpen, setIsOpen] = useState(false);

    const { data } = useGetFolderWithNoteQuery(
        { select_space: selected, id: String(id) },
        { skip: !id || !selected || !isOpen }
    );

    const navigate = useNavigate();
    const handleNote = (id: string) => {
        navigate(`/note/${id}`);
    };

    const [CreateNote] = useCreateNoteMutation();

    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
    const [menuItems, setMenuItems] = useState<{ label: string; action: () => void }[]>([]);
    const [targetId, setTargetId] = useState<string>("");
    const [inputNote, setInputNote] = useState(false);
    const [noteName, setNoteName] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [noteDeleteId, setDeleteNote] = useState("")
    const [DleteNoteApi]=useDeleteNoteMutation()
    
    const [opened, { open:open_delete_modal, close:close_delete_modal }] = useDisclosure(false);

    const handleContextMenuFolder = (event: React.MouseEvent, folderId: string) => {
        event.preventDefault();
        setTargetId(folderId);

        setMenuItems([
            {
                label: "Add note",
                action: () => {
                    setInputNote(!inputNote);
                    setIsOpen(true);
                },
            },
        ]);

        setMenuPosition({ x: event.clientX, y: event.clientY });
    };

    const deleteNotewithModal=()=>{
        console.log("deleted",noteDeleteId);
        if(noteDeleteId){
            DleteNoteApi({select_space:selected,id:noteDeleteId})
        }
        close_delete_modal()
    }


    const handleContextMenuNote = (event: React.MouseEvent, noteId: string) => {
        event.preventDefault();
        setTargetId(noteId);

        setMenuItems([
            {
                label: "delete",
                action: () => {
                    
                    console.log("delete", noteId);
                    setDeleteNote(noteId);
                    open_delete_modal();
                },
            },
        ]);

        setMenuPosition({ x: event.clientX, y: event.clientY });
    };

    useEffect(() => {
        if (inputNote && inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputNote]);



    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            console.log("مقدار ورودی:", noteName);
            if (noteName) {
                CreateNote({ select_space: selected, data: { folder: id, name: noteName, content: "" } })
            }
            setInputNote(false);
        }
    };



    return (
 
        <div className="relative">
            <div onContextMenu={(event) => handleContextMenuFolder(event, String(id))}>
                <Button onClick={() => setIsOpen((prev) => !prev)} variant="subtle" className="dropdown">
                    {label}
                    {isOpen ? <IconChevronDown size="24" strokeWidth={2} /> : <IconChevronRight />}
                </Button>
            </div>

            <Modal opened={opened} onClose={close_delete_modal} title="WORNING">
                <h2>Are you sure for delete this note?</h2>
                <Button onClick={()=>{deleteNotewithModal()}}>Yes</Button>
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
                                <div key={id} onContextMenu={(event) => handleContextMenuNote(event, String(item.id))}>
                                    <Button variant="subtle" onClick={() => handleNote(item.id)} className="note" key={item.id}>
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
