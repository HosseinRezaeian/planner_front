import { Modal, Group, NativeSelect, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconSettings } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

const SelectSpace: React.FC = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [options, setOptions] = useState<string[]>([]);
    const [selected, setSelected] = useState<string>("");

    useEffect(() => {

    
        const storedOptions = localStorage.getItem("spaces");
        console.log(storedOptions);
        if (storedOptions) {

            setOptions(JSON.parse(storedOptions));
        }

    }, []);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Authentication">
                {/* Modal content */}
            </Modal>
            <Group style={{ marginTop: "10px" }}>
                <NativeSelect
                    size="xs"
                    style={{ width: "75%" }}
                    onChange={(event) => setSelected(event.currentTarget.value)}
                    data={options.map((item) => ({
                        value: item.id,
                        label: item.name, 
                    }))}
                    rightSection={
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <IconChevronDown size={15} />
                        </div>
                    }
                />
                <ActionIcon onClick={open}>
                    <IconSettings size={18} />
                </ActionIcon>
            </Group>
        </>
    );
};

export default SelectSpace;
