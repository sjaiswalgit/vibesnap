import React from "react";
import { Link } from "react-router-dom";
import Feed from "../components/Feed/Feed";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AddPost from "../components/CreatePost/AddPost";
import ProfileIcon from "../assests/profileIcon.jpg"
function Home() {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate()


  return (
    <div className="relative bg-gray-100 h-screen p-4 w-screen">
      {/* Header Section */}
      <div onClick={()=>{navigate(`/profile/${currentUser.uid}`)}}>
        <header className="flex items-center space-x-4 mb-6">
          <img
            src={currentUser.photoURL || ProfileIcon}
            alt="User Avatar"
            onError={(e)=>{e.target.src=ProfileIcon}}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-sm text-gray-400">Welcome Back,</p>
            <h1 className="text-xl font-bold capitalize">{currentUser.displayName}</h1>
          </div>
        </header>
      </div>
      {/* Feeds Heading */}
      <h2 className="text-2xl font-bold mb-4">Feeds</h2>

      {/* Feeds Section */}
      <Feed />
      {/* Post 1 */}
      <AddPost />
    </div>
  );
}

export default Home;
