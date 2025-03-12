import { AppShell, Burger, Text, Group, Stack } from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import MenuAppshell from "./menuAppshell";
import "../../style/appshell.css";
function AppView() {
    // const [opened, { toggle, close }] = useDisclosure(false);


    const [opened, setOpened] = useLocalStorage({
        key: "navbar_opened",
        defaultValue: false,
    });

    return (
        <AppShell
            navbar={{
                width: 250,
                breakpoint: "sm",
                collapsed: { mobile: !opened, desktop: false },
            }}
            padding="md"
        >
            {/* NAVBAR */}
            <AppShell.Navbar className="navbar">
                {/* دکمه بستن Navbar در موبایل */}
                <Group className="navbar-header" hiddenFrom="sm">
                    <Text className="navbar-title">📁 Menu</Text>
                    <Burger opened={opened} onClick={() => setOpened((prev) => !prev)} size="sm" />
                </Group>

                <Stack mt="md">

                    <MenuAppshell />
                </Stack>
            </AppShell.Navbar>


            <AppShell.Main style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Group>
                    <Burger opened={opened} onClick={() => setOpened((prev) => !prev)} hiddenFrom="sm" size="sm" />

                </Group>
                <>

                    <Outlet />
                </>
            </AppShell.Main>
        </AppShell>
    );
}

export default AppView;
