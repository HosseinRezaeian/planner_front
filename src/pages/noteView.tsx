
import { useGetFolderQuery, useGetFolderWithNoteQuery } from "../features/NoteApi";
import { List, NavLink, Stack, Group } from "@mantine/core";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import NoteFile from "./file_note";
import { useMemo } from "react";
import { useLocalStorage } from "@mantine/hooks";


const NoteView: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id"); 


    const [selected, setSelected] = useLocalStorage<string>({
        key: 'select_space',
        defaultValue: '',
    });

    const { data: notecate, error, isLoading } = useGetFolderQuery(
        {select_space: selected ?? ''}, { skip: !selected, refetchOnMountOrArgChange: true }
);


    const { data } = useGetFolderWithNoteQuery(
        {select_space: selected, id: id ?? "" },
        { skip: !id }
    );


    return (<Group><Stack><NoteFile data={data ?? ""} notecate={notecate || []} /></Stack><Stack>g</Stack></Group>);
};

export default NoteView;
