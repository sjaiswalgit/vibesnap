import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";

const OtherSignIN = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={loading}
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
              loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <AiOutlineLoading className="animate-spin mr-2" size={20} /> Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        <div className="text-sm text-center mt-4 space-y-2">
          <Link to="/forgot-password" className={`text-blue-500 hover:text-blue-600 block ${loading ? 'pointer-events-none opacity-70' : ''}`}>
            Forgot Password?
          </Link>
          <Link to="/signup" className={`text-blue-500 hover:text-blue-600 block ${loading ? 'pointer-events-none opacity-70' : ''}`}>
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtherSignIN;