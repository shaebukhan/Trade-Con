import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";
import Loader from '../../components/Loader';
import Cookies from 'js-cookie';
import { useAuth } from '../../Context/authContext';
const Login = () => {

    const navigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useAuth();
    const isLoggedIn = auth.token;

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard/admin'); // Redirect to login if no token
        }
    }, [isLoggedIn, navigate]);



    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


    // Handling checkbox change
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    //Handling form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "") {
            toast.error("Email is Required !!");
            return;
        } else if (password === "") {
            toast.error("Password is Required !!");
            return;
        } else

            setLoading(true); // Show loader

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {

                email,
                password,
            });


            if (res.data.condition === 204) {
                toast.error(res.data.message);
                Cookies.set("protectverify", res.data.protect, { expires: 1 });
                navigate("/verify-email");
            } else if (res.data.success) {
                toast.success(res.data.message);
                // Save token to cookies
                Cookies.set("token", res.data.token, { expires: 1 }); // Token valid for 1 day
                Cookies.set("auth", JSON.stringify({
                    user: res.data.user,
                    token: res.data.token,
                }), { expires: 1 });

                // Update auth context
                setAuth({
                    user: res.data.user,
                    token: res.data.token,
                });

                if (res.data.user.role === 1) {
                    navigate("/dashboard/admin");
                } else {
                    navigate("/dashboard/user");

                }

            } else {
                toast.error(res.data.message);

            }
        } catch (error) {
            console.log(error);
            // toast.error("Something Went Wrong !!");
        } finally {
            setLoading(false); // Hide loader
        }
    };

    return (
        <>
            <Navbar />
            {loading && <Loader />}
            <div className='mt-top'>

                <div className="container">

                    <div className="reg-main">
                        <div className="reg-sub">

                            <div className="reg-right">
                                <h1 className='mt-5 fw-bold text-center'>Login</h1>

                                <form onSubmit={handleSubmit}>

                                    <div className="auth-inp-main">
                                        <label className='form-label'>Email*</label>
                                        <input type="email" className='login-inp' value={email}
                                            onChange={(e) => setEmail(e.target.value)} placeholder='info@gmail.com' />
                                    </div>
                                    <div className="auth-inp-main position-relative">
                                        <label className="form-label">Password*</label>
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            className="login-inp"
                                            placeholder="abc12345"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span
                                            className="toggle-btn"
                                            id="togglePassword"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                                        </span>
                                    </div>
                                    <div className="d-flex">
                                        <input type="checkbox" checked={isChecked}
                                            onChange={handleCheckboxChange} />
                                        <label className='form-label ms-3'>Remember Me</label>
                                    </div>
                                    <div className="text-center login-btn-main mt-3 mb-4">
                                        <button className='login-sub login-sub-c'>LOGIN</button>
                                        <Link className='login-sub login-sub-r' to="/register">CREATE ACCOUNT</Link>
                                    </div>

                                </form>
                            </div>
                            <div className="login-left px-5">
                                <p className="text-white login-wel">
                                    WELCOME TO
                                </p>
                                <h3 className="text-white login-t">DWELLY FIX</h3>
                                <p className="text-white  login-wel">
                                    Login to Access Dashboard
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
};

export default Login;