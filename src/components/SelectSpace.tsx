import { Modal, Group, NativeSelect, ActionIcon, Loader, Input, Button, Stack } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { IconChevronDown, IconCirclePlusFilled, IconSettings } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useGetPlaceListQuery, usePatchPlaceMutation } from "../features/Createplace";
import { Navigate } from "react-router-dom";

const SelectSpace: React.FC = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const { data: spaces, error, isLoading } = useGetPlaceListQuery(null,{
        refetchOnMountOrArgChange:true
    });
    const [patchPlace] = usePatchPlaceMutation();

    const [selectedSpace, setSelectedSpace] = useLocalStorage({
        key: 'select_space',
        defaultValue: "",
    });

    useEffect(() => {

        if (spaces && spaces.length > 0) {
            const selectedSpace = spaces.find((item) => item.select)?.id || spaces[0]?.id;
            setSelectedSpace(selectedSpace);
        }
    }, [spaces]); 




    if (!isLoading && spaces && spaces.length === 0) {
        return <Navigate to="/create-place" replace />;
    }

    const handelspace = (value: string) => {
        setSelectedSpace(value);
        patchPlace({ id: value, data: { "select": true } });
    };

    if (isLoading) {
        return <Loader size="lg" />;
    }

    if (error) {
        return <div>Error loading spaces</div>;
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title="Create New Space">
                <Stack>
                <Input></Input>
                <Button>create</Button>
                </Stack>
            </Modal>

            <Group style={{ marginTop: "10px" }}>
                {spaces && spaces.length > 0 && (
                    <NativeSelect
                        size="xs"
                        style={{ width: "75%" }}
                        value={selectedSpace}
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
                    <IconCirclePlusFilled size={18} />
                </ActionIcon>
            </Group>
        </>
    );
};

export default SelectSpace;
