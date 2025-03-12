import { useEffect, useState } from "react";
import { Menu, Paper } from '@mantine/core';

const NoteMenu: React.FC = () => {
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent default right-click behavior
        setMenuPosition({ x: event.clientX, y: event.clientY });
    };

    const closeMenu = () => {
        setMenuPosition(null);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuPosition) {
                closeMenu();
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [menuPosition]);

    return (
        <div onContextMenu={handleContextMenu} style={{ position: "relative" }}>
            <h2>Right-click on this area</h2>

            {menuPosition && (
                <Paper
                    shadow="md"
                    p="xs"
                    style={{
                        position: "absolute",
                        top: menuPosition.y,
                        left: menuPosition.x,
                        zIndex: 1000,
                    }}
                >
                    <Menu shadow="md" width={200} opened>
                        <Menu.Item onClick={() => alert("Edit Clicked")}>Edit</Menu.Item>
                        <Menu.Item onClick={() => alert("Delete Clicked")}>Delete</Menu.Item>
                        <Menu.Item onClick={() => alert("Duplicate Clicked")}>Duplicate</Menu.Item>
                    </Menu>
                </Paper>
            )}
        </div>
    );
};

export default NoteMenu;
