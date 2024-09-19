import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import Logo from "../assets/images/logo.jpg";
const Navbar = () => {

    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openMenu = () => setIsMenuOpen(true);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>

            <div className="navbarr">
                <Link to="/">
                    <img className="nav-logo" src={Logo} alt="" />
                </Link>
                <div className="search-main">
                    <input type="text" className="search-inp" placeholder="Search here..." />
                    <span className="search-icon"><IoSearchSharp /></span>
                </div>
            </div>

        </>
    );
};

export default Navbar;
