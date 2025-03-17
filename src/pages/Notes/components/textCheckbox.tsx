import { Checkbox, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect, useState } from "react";



interface InputWatcherProps {
    value: string;
    check: boolean;
    id: string;
    onChange: (content_id: string, newValue: any) => void;
}
const CheckBoxText: React.FC<InputWatcherProps> = ({ value, check, id, onChange }) => {
    const [inputValue, setInputValue] = useState(value);
    const [checkstate, setcheckValue] = useState(check);
    const [debouncValue] = useDebouncedValue(inputValue, 500);
    const [debouncCheck] = useDebouncedValue(checkstate, 500);

    useEffect(() => {
        setInputValue(value);
        setcheckValue(check);
    }, [value, check]);

    useEffect(() => {
        const data = { content: inputValue, is_checked: checkstate }
        onChange(id, data);
    }, [debouncValue, debouncCheck]);



    return (


        <div style={{ display: "flex", alignItems: "center", gap: "8px" ,width: "100%"}}>
            <Checkbox 
                size="md"
                checked={checkstate}
                onChange={(event) => setcheckValue(event.currentTarget.checked)}
            />
            <TextInput style={{ width: "100%",flexGrow: "1"}}
                variant="unstyled"
                
                value={inputValue}
                onChange={(event) => setInputValue(event.currentTarget.value)}
            />
        </div>

    );
};

export default CheckBoxText;
