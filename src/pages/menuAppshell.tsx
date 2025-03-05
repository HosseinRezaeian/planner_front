import React from "react";
import { NavLink } from "react-router-dom";
import LoginORLogout from "../components/AuthComponenets";
import AvatarProfile from "../components/avatar";

const MenuAppshell: React.FC = () => {
    const closeMenu = () => {
        console.log("Menu closed!");
    };

    return (
        <div>
            <AvatarProfile />
            <NavLink to="/" className="nav-link" onClick={closeMenu}>🏠 Home</NavLink>
            <NavLink to="/todo" className="nav-link" onClick={closeMenu}>✅ Todo</NavLink>
            <NavLink to="/graph" className="nav-link" onClick={closeMenu}>📊 Graph</NavLink>
            <NavLink to="/note" className="nav-link" onClick={closeMenu}>📝 Note</NavLink>
            <NavLink to="/note/view" className="nav-link" onClick={closeMenu}>📂 Note View</NavLink>
            <LoginORLogout />
        </div>
    );
};

export default MenuAppshell;
