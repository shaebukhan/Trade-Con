
import { Link } from "react-router-dom";

import Logo from "../assets/images/logo.jpg";

const Navbar = () => {

    return (
        <>
            <div className="navbarr">
                <Link to="/">
                    <img className="nav-logo" src={Logo} alt="Logo" />
                </Link>

            </div>
        </>
    );
};

export default Navbar;



