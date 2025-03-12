import { useLocalStorage } from "@mantine/hooks";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { NavLink } from '@mantine/core';
import { useGetFolderQuery, useGetFolderWithNoteQuery } from "../../../features/NoteFolderApi";
import "../../../style/note_menu.css"
import Dropdown from "../../../components/dropdown";
import DropdownFolder from "./dropdown_note";



const NoteMenu: React.FC = () => {


    const [searchParams] = useSearchParams();
    const id_get_folder = searchParams.get("folder");


    const [selected, setSelected] = useLocalStorage<string>({
        key: 'select_space',
        defaultValue: '',
    });

    const { data: folder, error, isLoading } = useGetFolderQuery(
        { select_space: selected ?? '' }, { skip: !selected, refetchOnMountOrArgChange: true }
    );

    console.log("id_get_folder", id_get_folder);
    const { data } = useGetFolderWithNoteQuery(
        { select_space: selected, id: id_get_folder ?? "" },
        { skip: !selected || !id_get_folder, refetchOnMountOrArgChange: true }
    );



    return (



        <Dropdown label="📁 Notes" >
            {/* {data ?? ""} notecate={folder || []}  */}
            {folder?.map((item) => (
                // <NavLink key={item.id}
                // to={`?folder=${item.id}`} 
                // component={Link} label={`📂 ${item.name}`} className="nav-link" />
                <div >
                    <DropdownFolder label={`📂 ${item.name}`} id={`${item.id}`} ></DropdownFolder>
                </div>
            ))}
            {/* <NavLink ></NavLink> */}
        </Dropdown>



    )
}
export default NoteMenu;

