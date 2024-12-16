import React from "react";
import { Link } from "react-router-dom";
import Feed from "../components/Feed/Feed";
import { useAuthContext } from "../context/AuthContext";
function Home() {
  const { currentUser } = useAuthContext();



  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Header Section */}
      <Link to="/profile">
      <header className="flex items-center space-x-4 mb-6">
        <img
          src={currentUser.photoURL}
          alt="User Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-sm text-gray-400">Welcome Back,</p>
          <h1 className="text-xl font-bold capitalize">{currentUser.displayName}</h1>
        </div>
      </header>
      </Link>
      {/* Feeds Heading */}
      <h2 className="text-2xl font-bold mb-4">Feeds</h2>

      {/* Feeds Section */}
      <Feed />
        {/* Post 1 */}
        
    </div>
  );
}

export default Home;
