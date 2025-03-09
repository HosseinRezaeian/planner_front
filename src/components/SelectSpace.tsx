import { Modal, Group, NativeSelect, ActionIcon } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { IconChevronDown, IconSettings } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { apinoteSlice, useGetFolderQuery } from "../features/NoteApi";
import { useDispatch } from "react-redux";
import { useGetPlaceListQuery } from "../features/Createplace";

const SelectSpace: React.FC = () => {
    const [opened, { open, close }] = useDisclosure(false);
    
    const { data: spaces, error, isLoading } = useGetPlaceListQuery()
 
    const [selected, setSelected] = useLocalStorage({
        key: 'select_space',
        defaultValue: '',
      });


    const handelspace=(value:string)=>{

        setSelected(value)
    

    }

    console.log("spaces",spaces);
    return (
        <>
            <Modal opened={opened} onClose={close} title="Authentication">
                
            </Modal>

            <Group style={{ marginTop: "10px" }}>
                {spaces  && (
                    <NativeSelect
                    size="xs"
                    style={{ width: "75%" }}
                    value={selected}
                    onChange={(event) => handelspace(event.currentTarget.value)}
                    data={spaces.map((item) => ({
                        value: String(item.id),
                        label: item.name, 
                    }))}
                    rightSection={
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <IconChevronDown size={15} />
                        </div>
                    }
                />
                )}
                <ActionIcon onClick={open}>
                    <IconSettings size={18} />
                </ActionIcon>
            </Group>
        </>
    );
};

export default SelectSpace;
