import { useLocalStorage } from "@mantine/hooks";
import React from "react";
import {  useSearchParams } from "react-router-dom";
import { NavLink } from '@mantine/core';
import { useGetFolderQuery, useGetFolderWithNoteQuery } from "../../features/NoteApi";
import "../../style/note_menu.css"



const NoteMenu: React.FC = () => {

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id"); 


    const [selected, setSelected] = useLocalStorage<string>({
        key: 'select_space',
        defaultValue: '',
    });

    const { data: folder, error, isLoading } = useGetFolderQuery(
        {select_space: selected ?? ''}, { skip: !selected, refetchOnMountOrArgChange: true }
);


    const { data } = useGetFolderWithNoteQuery(
        {select_space: selected, id: id ?? "" },
        { skip: !id }
    );



    return (
    <NavLink  label="📂 Notes" className="notes" >
        {/* {data ?? ""} notecate={folder || []}  */}
        {folder?.map((item)=>(
               <NavLink  label={item.name} className="nav-link" /> 
        ))}
        {/* <NavLink ></NavLink> */}
    </NavLink>



    )
}
export default NoteMenu;

