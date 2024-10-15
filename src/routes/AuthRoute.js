import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Loader from './Loader';

// Shows loader and handles redirection logic
const RedirectWithLoader = ({ countdown, redirectTo }) => {
    const [timer, setTimer] = useState(countdown);

    useEffect(() => {
        if (timer > 0) {
            const timerId = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(timerId); // Clean up the timeout on unmount
        }
    }, [timer]);

    return (
        <div style={{ height: '100vh' }} className="d-flex flex-column align-items-center justify-content-center">
            <Loader />
            <h2>Access Restricted!</h2>
            <h2>Redirecting in {timer} seconds...</h2>
            {timer === 0 && <Navigate to={redirectTo} replace />} {/* Redirect when countdown reaches 0 */}
        </div>
    );
};

// Protects routes from unauthorized access (checks if logged in)
const PrivateRoute = ({ children }) => {
    const token = Cookies.get('token'); // Check if token exists

    if (!token) {
        return <RedirectWithLoader countdown={5} redirectTo="/login" />; // Show loader and redirect to login after countdown
    }

    return children; // If logged in, allow access
};

// Blocks access to login and register pages if already logged in (for public routes like login/register)
const PublicRoute = ({ children }) => {
    const token = Cookies.get('token'); // Check if token exists
    const authData = Cookies.get('auth');            // Get authentication details

    if (token && authData) {
        return <RedirectWithLoader countdown={5} redirectTo="/dashboard" />; // Regular user, redirect to user dashboard
    }

    return children;
};



export { PrivateRoute, PublicRoute };
