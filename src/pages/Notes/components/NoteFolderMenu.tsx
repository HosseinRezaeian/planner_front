import { useLocalStorage } from "@mantine/hooks";
import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FocusTrap, Input, NavLink } from '@mantine/core';
import { useCreateFolderMutation, useGetFolderQuery, useGetFolderWithNoteQuery } from "../../../features/NoteFolderApi";
import "../../../style/note_menu.css"
import Dropdown from "../../../components/dropdown";
import DropdownFolder from "./dropdown_note";
import ContextMenu from "../../../components/RightClickMenu";



const NoteMenu: React.FC = () => {


    const [searchParams] = useSearchParams();
   
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
    const [menuItems, setMenuItems] = useState<{ label: string; action: () => void }[]>([]);
    const [targetId, setTargetId] = useState<string>("");
    const [inputFolder, setInputFolder] = useState(false);
    const [folderName, setFolderName] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [dropdownstate,setOpenDropDown]=useState(false);
 const [selectedSpace, setSelectedSpace] = useLocalStorage({
        key: 'select_space',
        defaultValue: "",
    });
    const [selected_folder, setSelectedFolder] = useLocalStorage<string>({
        key: 'select_folder',
        defaultValue: '',
    });
    

    const { data: folder, error, isLoading } = useGetFolderQuery(
        { select_space: selectedSpace ?? '' }, { skip: !selectedSpace, refetchOnMountOrArgChange: true }
    );


    const { data } = useGetFolderWithNoteQuery(
        { select_space: selectedSpace, id: "" },
        { skip: !selectedSpace , refetchOnMountOrArgChange: true }
    );


    const [createFolder]=useCreateFolderMutation()


    const MenuNotes = (event: React.MouseEvent) => {
        event.preventDefault();
        // setTargetId(folderId);

        setMenuItems([
            {
                label: "Add Folder",
                action: () => {
                    setOpenDropDown(true)
                    setInputFolder(!inputFolder);
                    
                    console.log("test create folder")
                },

            },


        ]);

        setMenuPosition({ x: event.clientX, y: event.clientY });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            console.log("مقدار ورودی:", folderName);
            if (folderName) {
                createFolder({ select_space: selectedSpace, data: { name: folderName } })
            }
            setInputFolder(false);
        }
    };


    return (

        <div>

            <Dropdown isOpen={dropdownstate} setIsOpen={setOpenDropDown} >
                <div onContextMenu={(event) => MenuNotes(event)}>
                    📁 Notes
                </div>


                {inputFolder && (
                    <FocusTrap active>
                        <Input onChange={(e) => setFolderName(e.target.value)}
                            ref={inputRef}
                            placeholder="Add a name for folder ..."
                            onKeyDown={handleKeyDown}
                            variant="filled" size="xs"
                            onBlur={() => setInputFolder(false)}
                        />
                    </FocusTrap>
                )}

                {folder?.map((item) => (
                    <div>
                        
                        <DropdownFolder  label={`📂 ${item.name}`} id_folder={`${item.id}`} ></DropdownFolder>
                    </div>
                ))}
            </Dropdown>
            <ContextMenu position={menuPosition} onClose={() => setMenuPosition(null)} items={menuItems} targetId={targetId} />
        </div>



    )
}
export default NoteMenu;

