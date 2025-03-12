import { NavLink } from "@mantine/core";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import React, { useContext } from "react";

const LoginORLogout: React.FC = () => {
    const auth = useContext(AuthContext);

    const logout = () => {
        auth?.logout();
    };

    return auth?.isAuthenticated ? (
        <NavLink
            className="nav-link"
            onClick={logout}
            label="Logout"
        />

    ) : (
        <NavLink
            className="nav-link"

            component={Link}
            to="/login"
            label="Login"
        />
    );
};

export default LoginORLogout;
