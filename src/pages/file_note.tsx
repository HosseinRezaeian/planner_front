import React from "react";
import { NavLink } from "@mantine/core";
import { Link, useSearchParams } from "react-router-dom";
import { NoteCategory } from "../features/NoteApi"; // ایمپورت مدل داده‌ها

interface NoteFileProps {
    data: NoteCategory | null | string;  // داده‌های مربوط به یک دسته
    notecate: NoteCategory[];  // لیست دسته‌بندی‌ها
}

const NoteFile: React.FC<NoteFileProps> = ({ data, notecate }) => {
    const [searchParams] = useSearchParams();
    const selectedId = searchParams.get("id");

    // if (!data || typeof data === "string") return null; // جلوگیری از مقدار نامعتبر
    console.log("type",typeof data );
    return (
        <>
            {notecate.length === 0 ? (
                <p>دسته‌بندی‌ای موجود نیست</p>
            ) : (
                notecate.map((cate) => (
                    <NavLink
                        key={cate.id}
                        component={Link}
                        to={`?id=${cate.id}`} // استفاده از search params
                        label={cate.name}
                        className={selectedId === String(cate.id) ? "active-link" : ""}
                    >

                        {data?.id === cate.id &&
                            data.notes?.map((note) => (
                                <div key={note.id}>{note.content}</div>
                            ))}
                    </NavLink>
                ))
            )}
        </>
    );
};

export default NoteFile;
