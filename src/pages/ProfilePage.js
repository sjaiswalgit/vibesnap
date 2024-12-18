import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import AddPost from "../components/CreatePost/AddPost";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext()
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="relative">
        <div className="absolute top-1 left-1 flex items-center p-4 text-white">
          <button onClick={() => { navigate(-1) }}>
            <FaArrowLeft className="text-lg" />
          </button>

        </div>
        {/* Background Image */}
        <img
          src={currentUser.coverURL || "https://via.placeholder.com/600x300?text=Cover+Image"}
          alt="Cover"
          className="w-full h-40 object-cover rounded-b-[1rem]"
        />
        {/* Profile Picture */}
        <div className="absolute -bottom-12 left-4">
          <img
            src={currentUser.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover shadow-md"
          />
        </div>
        <div className="absolute bottom-[-3rem] right-4">
          <Link to="/edit-profile">
            <button className="bg-white font-bold text-gray-800 px-4 py-2 rounded-full border border-gray-300 w-[12rem]">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>


      {/* User Bio */}
      <div className="mt-16 px-4">
        <h1 className="text-2xl font-bold capitalize">{currentUser.displayName}</h1>
        <p className="text-gray-600 mt-2">
          {currentUser.bio}
        </p>
      </div>

      {/* My Posts Section */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold mb-4">My Posts</h2>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Post 1 */}
          <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
           
            
          </div>

          {/* Post 2 */}
          <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden">
            <img
              src="https://via.placeholder.com/150x200?text=B2B+Work"
              alt="B2B Work"
              className="w-full h-48 object-cover opacity-75"
            />
            <div className="p-2">
              <p className="text-gray-700 font-medium truncate">
                Working on a B2B...
              </p>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <span>🤍</span>
                <span className="ml-1">40</span>
              </div>
            </div>
          </div>

          {/* Post 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://via.placeholder.com/150x200?text=Parachute"
              alt="Parachute"
              className="w-full h-48 object-cover"
            />
            <div className="p-2">
              <p className="text-gray-700 font-medium">Parachute ❤️</p>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <span>❤️</span>
                <span className="ml-1">65</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <AddPost />
    </div>
  );
}

export default ProfilePage;
