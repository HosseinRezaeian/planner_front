import React from "react";
import { NavLink } from "react-router-dom";
import LoginORLogout from "../Users/components/AuthComponenets";
import AvatarProfile from "../Users/components/avatar";
import { ActionIcon, Group, Modal, NativeSelect } from "@mantine/core";
import { IconChevronDown, IconHome, IconSettings } from "@tabler/icons-react";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import SelectSpace from "../../components/SelectSpace";
import NoteMenu from "../Notes/components/NoteFolderMenu";
import close from "./AppShell"
const MenuAppshell: React.FC = () => {

    const [opened, setOpened] = useLocalStorage({
        key: "navbar_opened",
        defaultValue: false,
    });

    const closeMenu = () => {
        console.log("Menu closed!");
        setOpened(false);
    };
    return (
        <div>

            

            <AvatarProfile />
            <SelectSpace/>
            <NavLink to="/" className="nav-link" onClick={close}>🏠 Home</NavLink>
            <NavLink to="/folder" className="nav-link" onClick={closeMenu}>note view</NavLink>
            <NoteMenu/>
            <NavLink to="/graph" className="nav-link" onClick={closeMenu}>📊 Graph</NavLink>
            <LoginORLogout />
        </div>
    );
};

export default MenuAppshell;
