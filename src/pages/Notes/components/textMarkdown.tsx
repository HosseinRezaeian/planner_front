import { Tabs, ThemeIcon, Group, Textarea } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconColumns2, IconSpacingHorizontal } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


interface InputWatcherProps {
    value: string;
    id: string; // مقدار ورودی
    onChange: (content_id: string, newValue: any) => void;
}



const MarkdownEdit: React.FC<InputWatcherProps> = ({ value, id, onChange }) => {
    const [inputValue, setInputValue] = useState(value);
    const [debounced] = useDebouncedValue(inputValue, 500);


    useEffect(() => {
        setInputValue(value);
    }, [value]);

    useEffect(() => {
        const data = { content: inputValue }
        onChange(id, data);
    }, [debounced]);

    return (
        <Tabs defaultValue="first" variant="outline" w="100%" >
            <Tabs.List >
                <Tabs.Tab value="first"><ThemeIcon variant="white" size="xs"><IconColumns2></IconColumns2></ThemeIcon> </Tabs.Tab>
                <Tabs.Tab value="second"><ThemeIcon variant="white" size="xs"><IconSpacingHorizontal></IconSpacingHorizontal></ThemeIcon></Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="first">
                <Group justify="space-between" w="100%" style={{ display: "flex", alignItems: "stretch" }}>
                    <Textarea
                        value={inputValue}
                        size="md"
                        autosize
                        onChange={(event) => setInputValue(event.currentTarget.value)}
                        // minRows={5}
                        style={{ width: "50%" }}

                    />
                    <div
                        className="markdown-body"
                        style={{
                            // padding: "20px",
                            width: "50%",
                            flex: 1,
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            backgroundColor: "#f9f9f9",
                            overflowY: "auto",
                            padding:"10px"
                        }}
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{inputValue}</ReactMarkdown>
                    </div>
                </Group>
            </Tabs.Panel>
            <Tabs.Panel value="second">

                <Group justify="space-between" w="100%" >

                    <Tabs defaultValue="first" w="100%" >
                        <Tabs.List>
                            <Tabs.Tab value="first"> Edit</Tabs.Tab>
                            <Tabs.Tab value="second">Pereview</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="first">
                            <Textarea
                                value={inputValue}
                                size="md"
                                autosize
                                onChange={(event) => setInputValue(event.currentTarget.value)}
                                minRows={5}


                            />
                        </Tabs.Panel>
                        <Tabs.Panel value="second">

                            <div
                                className="markdown-body"
                                style={{
                                    padding: "20px",
                                    width: "100%",

                                    flex: 1,
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    backgroundColor: "#f9f9f9",
                                    overflowY: "auto"
                                }}
                            >
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{inputValue}</ReactMarkdown>
                            </div>

                        </Tabs.Panel>
                    </Tabs>
                </Group>

            </Tabs.Panel>
        </Tabs>

    )

}
export default MarkdownEdit;