import { BackgroundImage } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


interface InputWatcherProps {
    value: string;
    id:string; 
    onChange: (content_id:string,newValue: any) => void; 
  }
const TextEditor: React.FC<InputWatcherProps> = ({ value,id, onChange }) => {
    const [inputValue, setInputValue] = useState(value);
    const [debounced] = useDebouncedValue(inputValue, 500);
    useEffect(() => {
        setInputValue(value); 
    }, [value]);

    useEffect(() => {
        const data={content:inputValue}
        onChange(id,data); 
      }, [debounced]);
    

    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            ["bold", "italic", "underline"],
            [{ align: [] }],
            ["link", "image", "code-block"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "font",
        "list",
        "bold",
        "italic",
        "color",
        "background",
        "underline",
        "align",
        "link",
        "image",
        "code-block",
    ];


    return (

<div style={{ backgroundColor: 'white'}}>
   
    {debounced!=inputValue?("changeed"):""}

   
        <ReactQuill
            theme="snow"
            value={inputValue}
            onChange={(content) => setInputValue(content)}
            modules={modules}
            formats={formats}
        />
</div>
    );
};

export default TextEditor;
