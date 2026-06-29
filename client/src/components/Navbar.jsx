import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    FaBell,
    FaClipboardList,
    FaUserCircle,
    FaChevronDown,
    FaSignOutAlt,
    FaKey
} from "react-icons/fa";

import "../styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const admin = JSON.parse(localStorage.getItem("admin"));

    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        navigate("/login");

    };

    return (

        <header className="navbar">

            <div className="navbar-container">

                <div className="navbar-brand">

                    <div className="brand-icon-wrapper">
                        <FaClipboardList className="brand-icon" />
                    </div>

                    <span className="brand-title">
                        License Management System
                    </span>

                </div>

                <nav className="navbar-links">

                    <NavLink to="/dashboard">Dashboard</NavLink>

                    <NavLink to="/licenses">Licenses</NavLink>

                    <NavLink to="/add-license">Add License</NavLink>

                    <NavLink to="/admins">Manage Admins</NavLink>

                    <NavLink to="/settings">Settings</NavLink>

                </nav>

                <div className="navbar-right">

                    <button className="notification-btn">

                        <FaBell />

                    </button>

                    <div className="profile-container">

                        <button
                            className="profile-btn"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >

                            <FaUserCircle className="profile-icon" />

                            <span>{admin?.username}</span>

                            <FaChevronDown size={12} />

                        </button>

                        {

                            showDropdown && (

                                <div className="profile-dropdown">

                                    <button>

                                        <FaUserCircle />

                                        My Profile

                                    </button>

                                    <button>

                                        <FaKey />

                                        Change Password

                                    </button>

                                    <hr />

                                    <button
                                        className="logout"
                                        onClick={handleLogout}
                                    >

                                        <FaSignOutAlt />

                                        Logout

                                    </button>

                                </div>

                            )

                        }

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Navbar;
