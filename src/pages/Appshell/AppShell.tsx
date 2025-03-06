import { AppShell, Burger, Text, Group, Stack } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import MenuAppshell from "./menuAppshell";
import "../../style/appshell.css"; 
function AppView() {
    const [opened, { toggle, close }] = useDisclosure(false);

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
                    <Burger opened={opened} onClick={close} size="sm" />
                </Group>

                <Stack mt="md">
                    <MenuAppshell/>
                </Stack>
            </AppShell.Navbar>


            <AppShell.Main style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Group>
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

                </Group>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}

export default AppView;
