import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect, useState } from "react";

import { RichTextEditorMantine } from "./richEditor";


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


 






    return (
<RichTextEditorMantine value={inputValue} onChange={setInputValue}/>

    );
};

export default TextEditor;
