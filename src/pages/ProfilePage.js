import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { db } from '../firebase/config';
import { collection, query, orderBy, limit, startAfter, doc, getDoc, getDocs, where } from 'firebase/firestore';
import AddPost from "../components/CreatePost/AddPost";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const { currentUser } = useAuthContext()
  const navigate = useNavigate();
  const scrollRef = useRef(null)
  // Fetch posts with user data
  const fetchPosts = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true)
    try {
      const postsQuery = query(
        collection(db, 'posts'),
        where('uid', '==', currentUser.uid),
        orderBy('createdAt', 'desc'),
        limit(5),
        ...(lastDoc ? [startAfter(lastDoc)] : [])
      );

      const postsSnapshot = await getDocs(postsQuery);
      const fetchedPosts = [];
      let lastVisible = null;
      for (const docSnapshot of postsSnapshot.docs) {
        const postData = docSnapshot.data();


        fetchedPosts.push(postData);

        lastVisible = docSnapshot;
      }

      setPosts((prev) => [...posts, ...fetchedPosts]);
      setLastDoc(lastVisible);
      setHasMore(postsSnapshot.docs.length === 5);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false)
    }
  }, [db, hasMore, lastDoc, setPosts, posts, setLoading]);

  useEffect(() => {
    fetchPosts();

  }, []);


  return (
    <div className="bg-gray-100 h-screen w-screen">
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
      <div className="px-4 mt-6 ">
        <h2 className="text-lg font-bold mb-4">My Posts</h2>
        <div className="w-[100%] h-[30rem] overflow-y-auto">
          {/* Posts Grid */}
          <div className="w-[100%] " style={{ columns: "2" }}>
            {/* Post 1 */}
            {posts.filter((e)=>e.fileURLs.length>0).map((post, index) => (
              <div key={index} className="relative w-full bg-white rounded-lg shadow-md overflow-hidden mb-2">
                {post.fileURLs.length > 0 && post.fileURLs[0].type == "image" &&
                  <img
                    src={post.fileURLs[0].src}
                    alt="posts pic"
                    className="w-full h-auto object-cover"
                  />}
                {post.fileURLs.length > 0 && post.fileURLs[0].type == "video" &&
                  <video
                    src={post.fileURLs[0].src}
                    alt="posts pic"
                    className="w-full h-auto object-cover"
                  />}
                <div className="absolute bottom-2 left-0 p-2">
                <p className="w-[8rem] text-white font-medium overflow-ellipsis overflow-hidden whitespace-nowrap">{post.caption || ""}</p>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <span><FaHeart /></span>
                    <span className="ml-1">{post.likeCount || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
        {loading && (
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-4 border-t-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            <span className=" font-semibold text-md">Loading...</span>
          </div>
        </div>
      )}
      </div>

      {/* Floating Action Button */}
      <AddPost />
    </div>
  );
}

export default ProfilePage;
