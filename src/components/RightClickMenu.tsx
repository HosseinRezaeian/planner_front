import React, { useEffect } from "react";
import { Menu, Paper } from "@mantine/core";

interface ContextMenuProps {
    position: { x: number; y: number } | null;
    onClose: () => void;
    items: { label: string; action: (id: string) => void }[];
    targetId: string; // ID آیتم انتخاب شده
}

const ContextMenu: React.FC<ContextMenuProps> = ({ position, onClose, items, targetId }) => {
    // بستن منو هنگام کلیک بیرون از آن
    useEffect(() => {
        const handleClickOutside = () => {
            onClose();
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [onClose]);

    if (!position) return null; // اگر موقعیت منو مشخص نبود، منو نمایش داده نشود

    return (
        <Paper
            shadow="md"
            p="xs"
            style={{
                position: "absolute",
                top: position.y,
                left: position.x,
                zIndex: 1000,
            }}
        >
            <Menu shadow="md" width={200} opened>
                {items.map((item, index) => (
                    <Menu.Item key={index} onClick={() => item.action(targetId||"")}>
                        {item.label}
                    </Menu.Item>
                ))}
            </Menu>
        </Paper>
    );
};

export default ContextMenu;
