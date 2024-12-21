import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const userDocRef = doc(db, 'users', res.user.uid);

            // Check if the document exists
            const docSnapshot = await getDoc(userDocRef);

            if (!docSnapshot.exists()) {
                // Create the user document if it doesn't exist
                await setDoc(userDocRef, {
                    uid: res.user.uid,
                    displayName: name,
                    email: email,
                });
            }
            toast("Signup successful!",{type:"success"});
            navigate(-1);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSignup} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-4 py-2 border rounded-md"
                        value={name}
                        minLength={4}
                        maxLength={30}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-md pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            disabled={isLoading}
                        >
                            {showPassword ? (
                                <IoEyeOffOutline size={20} />
                            ) : (
                                <IoEyeOutline size={20} />
                            )}
                        </button>
                    </div>
                    <button 
                        className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center ${
                            isLoading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <AiOutlineLoading className="animate-spin mr-2" size={20} />
                                Signing up...
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>
                <div className="text-sm text-center mt-4">
                    <Link 
                        to="/otherlogin" 
                        className={`text-blue-500 hover:text-blue-600 ${
                            isLoading ? 'pointer-events-none opacity-70' : ''
                        }`}
                    >
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;