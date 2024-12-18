import React from "react";
import { Link } from "react-router-dom";
import Feed from "../components/Feed/Feed";
import { useAuthContext } from "../context/AuthContext";
import AddPost from "../components/CreatePost/AddPost";
function Home() {
  const { currentUser } = useAuthContext();



  return (
    <div className="relative bg-gray-100 h-screen p-4 w-screen">
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
      <AddPost/>
    </div>
  );
}

export default Home;
