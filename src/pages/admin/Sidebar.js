import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import './sidebar.css';
import SignLogo from "../../assets/images/logo.jpg";
import { MdDashboardCustomize } from "react-icons/md";
import Cookies from 'js-cookie';
import { AiOutlineLogout } from "react-icons/ai";
import axios from 'axios';
import { useAuth } from '../../Context/authContext';
import { toast } from 'react-toastify';
import { IoMdApps } from "react-icons/io";
const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();


    const handleLogout = async () => {
        try {
            // Send POST request to the server to log out
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/logout`);

            if (res.data.success) {
                // Update auth state and remove cookies
                setAuth({
                    ...auth, user: null, token: ""
                });

                Cookies.remove("token"); // Removes the 'token' cookie
                Cookies.remove("auth");  // Removes the 'auth' cookie

                // Show a logout notification
                toast.info("Logged out successfully");

                // Redirect to the login page
                navigate('/login');
            } else {
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during logout:", error);

        }
    };

    return (
        <nav id="sidebar" className={sidebarOpen ? "active" : ""}>
            <div className="custom-menu">
                <button type="button" id="closeSidebar" onClick={toggleSidebar}>
                    <IoClose />
                </button>
            </div>

            <div className="py-2">
                <div className="my-2">
                    <Link to="/dashboard">
                        <img className='sidebar-logo' src={SignLogo} alt="logo" />
                    </Link>
                </div>

                <ul className="list-unstyled components mb-5">
                    <li className='active-sidebar'>
                        <Link to="/dashboard">
                            <MdDashboardCustomize className="mr-3" /> Dashboard
                        </Link>
                    </li>
                    <li className=''>
                        <Link to="/dashboard/listings">
                            <IoMdApps className="mr-3" />  All Listings
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => {
                            handleLogout();

                        }}>
                            <AiOutlineLogout className="mr-3" /> Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
