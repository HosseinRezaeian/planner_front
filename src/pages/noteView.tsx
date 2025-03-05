
import { useGetNoteCategorysQuery, useGetNoteCategorysWithNoteQuery } from "../features/NoteApi";
import { List, NavLink,Stack ,Group} from "@mantine/core";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import NoteFile from "./file_note";


const NoteView: React.FC = () => {
const [searchParams] = useSearchParams();
    const id = searchParams.get("id"); // دریافت مقدار id از search params

    const { data: notecate, error, isLoading } = useGetNoteCategorysQuery();
    

    const { data } = useGetNoteCategorysWithNoteQuery(
        { id: id ?? "" },
        { skip: !id }
    );

    
    return (<Group><Stack><NoteFile data={data??""}  notecate={notecate||[]} /></Stack><Stack>g</Stack></Group>);
};

export default NoteView;
