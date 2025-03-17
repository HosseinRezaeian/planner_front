import { ReactNode } from "react";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import "../style/folder.css";

interface DropdownProps {
    children?: ReactNode;
    isOpen: boolean;  // ✅ دریافت وضعیت باز/بسته بودن
    setIsOpen: (open: boolean) => void; // ✅ تابعی برای تغییر وضعیت
}

const Dropdown: React.FC<DropdownProps> = ({ children, isOpen, setIsOpen }) => {
    const childrenArray = Array.isArray(children) ? children : [children];
    const [parent, ...childElements] = childrenArray;

    return (
        <div className="relative">
            {parent && (
                <Button
                    onClick={() => setIsOpen(!isOpen)}  // ✅ کنترل باز/بسته شدن
                    variant="subtle"
                    className="dropdown"
                >
                    {parent}
                    {isOpen ? <IconChevronDown /> : <IconChevronRight />}
                </Button>
            )}

            {isOpen && childElements.length > 0 && (
                <div className="children">{childElements}</div>
            )}
        </div>
    );
};

export default Dropdown;
