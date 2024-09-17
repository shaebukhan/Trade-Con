import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/Navbar';
import VerifyLogo from "../../assets/images/logo-w.png";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import axios from 'axios';
import Loader from '../../components/Loader';

const VerifyCode = () => {
    const navigate = useNavigate();
    const protect = Cookies.get('protectverify');
    const email = Cookies.get('useremail');
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const [loading, setLoading] = useState(false);


    // Check if the protect is available
    useEffect(() => {
        if (!protect) {
            navigate('/login'); // Redirect to login if no token
        }
    }, [protect, navigate]);

    // Handle input changes
    const handleChange = (index, value) => {
        const newCode = [...code];

        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    // Handle Backspace key press
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalCode = code.join(""); // Concatenate the code

        if (finalCode.length === 6) {
            setLoading(true); // Start loading

            try {
                const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/verify-email`, { code: finalCode });

                if (res.data.success) {
                    toast.success(res.data.message);
                    navigate("/verified");
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error(error.message || "Something went wrong!");
            } finally {
                setLoading(false); // Stop loading
            }
        } else {
            toast.error("Please enter a valid 6-digit code");
        }
    };
    const handleResend = async (e) => {
        e.preventDefault();



        setLoading(true); // Start loading

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/send-otp-again`, { email });

            if (res.data.success) {
                toast.success(res.data.message);

            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong!");
        } finally {
            setLoading(false); // Stop loading
        }

    };
    // Check if all inputs are filled
    const isButtonDisabled = code.some((digit) => digit === "");

    return (
        <>
            <Navbar />
            {loading && <Loader />}
            <div className="mt-top m-h-75 d-flex align-items-center justify-content-center mb-5">
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="verify-card">
                                <div className="text-center">
                                    <img src={VerifyLogo} alt="" />
                                </div>
                                <h2 className="mt-3 text-center text-coomon-color">
                                    A verification code has been sent to  {email}
                                </h2>
                                <p className="common-text d-clr text-center pb-5">
                                    Please check your inbox and enter the verification code below to
                                    verify your email address. The code will expire in 09:59
                                </p>
                                <form onSubmit={handleSubmit}>
                                    <div className='d-flex justify-content-between'>
                                        {code.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => (inputRefs.current[index] = el)}
                                                type='number'
                                                value={digit}
                                                onChange={(e) => handleChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                className="d-flex justify-content-center align-items-center pinCode-inp"
                                                min="0"
                                                max="9"
                                                maxLength="1" // Limit input length to 1
                                            />
                                        ))}
                                    </div>
                                    <div className="my-3">
                                        <button
                                            type="submit"
                                            className='sub-btn-b w-100'
                                            disabled={isButtonDisabled} // Disable button if inputs are incomplete
                                        >
                                            Verify
                                        </button>
                                    </div>
                                </form>
                                <div className="d-flex justify-content-around">
                                    <button onClick={handleResend} className=' fs-5 text-coomon-color bg-transparent border-0'>Resend</button>
                                    <Link className=' fs-5 text-coomon-color bg-transparent border-0'>Change Email</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerifyCode;
