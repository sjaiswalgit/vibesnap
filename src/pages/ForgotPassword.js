import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import {
    sendPasswordResetEmail,
} from "firebase/auth";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent!");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
                {message && <p className="text-green-500 text-sm">{message}</p>}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <form onSubmit={handleForgotPassword} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button className="w-full bg-blue-500 text-white py-2 rounded-md">
                        Send Reset Email
                    </button>
                </form>
                <div className="text-sm text-center mt-4">
                    <Link to="/otherlogin" className="text-blue-500">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword
