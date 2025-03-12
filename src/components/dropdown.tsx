import { useState } from "react";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import "../style/folder.css"
interface DropdownProps {
    label: string;
    id?: string;
    children?: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ label, id, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="subtle"
                className="dropdown"
            >
                {label}

                {isOpen ? <IconChevronDown /> : <IconChevronRight />}
            </Button>

            {isOpen && (
                <div className="children" >
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
