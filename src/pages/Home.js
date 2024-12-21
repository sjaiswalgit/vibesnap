import React, { useEffect } from "react";
import Feed from "../components/Feed/Feed";
import SingleFeed from "../components/Feed/SingleFeed";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { PiSignOutThin } from "react-icons/pi";
import AddPost from "../components/CreatePost/AddPost";
import ProfileIcon from "../assests/profileIcon.jpg"
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from "antd";
function Home() {
  const [searchParams] = useSearchParams();
  const postid = searchParams.get('id');
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();


  return (
    <div className="relative bg-gray-100 h-screen p-4 w-screen">
      {/* Header Section */}

      <header className="flex items-center space-x-4 mb-6">
        <Dropdown
          menu={{
            items: [{
              key: '1',
              label: "My Profile",
              onClick: () => { navigate(`/profile/${currentUser.uid}`) },
            },
            {
              type: 'divider',
            },
            {
              key: '2',
              label: "Log Out",
              extra: <PiSignOutThin />,
              onClick: () => signOut(auth)
            }]
          }}>
          <div className="flex items-center space-x-4">
          <img
            src={currentUser.photoURL || ProfileIcon}
            alt="User Avatar"
            onError={(e) => { e.target.src = ProfileIcon }}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col items-start">
          <p className="text-sm text-gray-400">Welcome Back,</p>
          <h1 className="text-xl font-bold capitalize">{currentUser.displayName}</h1>
        </div>
        </div>
        </Dropdown>
      </header>

      {/* Feeds Heading */}
      <h2 className="text-2xl font-bold mb-4">Feeds</h2>

      {/* Feeds Section */}
      {postid ? <SingleFeed postId={postid} /> : <Feed />}
      {/* Post 1 */}
      <AddPost />
    </div>
  );
}

export default Home;
