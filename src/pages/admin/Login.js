import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from 'js-cookie';
import { useAuth } from '../../Context/authContext';
import "./common.css";
import Loader from '../../components/Loader';
const Login = () => {

    const navigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useAuth();
    const isLoggedIn = auth.token;

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };



    // Handle form submit with email validation
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

            if (res.data.success) {
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
                navigate("/dashboard");
                return;
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Hide loader
        }
    };

    return (
        <>
            <Navbar />
            {loading && <Loader />}
            <div className="reg-main">
                <div className="reg-sub">
                    <div className="reg-right">

                        <form onSubmit={handleSubmit}>
                            <div className="auth-inp-main position-relative">
                                <label className='form-label'>Email*</label>
                                <input
                                    type="email"  // Email input hidden by default
                                    className='login-inp'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='support@trade.com'
                                />

                            </div>
                            <div className="auth-inp-main position-relative">
                                <label className="form-label">Password*</label>
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    className="login-inp"
                                    placeholder="trade12345"
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

                            <div className="text-center login-btns-sub mt-3 mb-4">
                                <button className='login-sub login-sub-c'>LOGIN</button>

                            </div>

                        </form>
                    </div>

                </div>
            </div>

        </>
    );
};

export default Login;
