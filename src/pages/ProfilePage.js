import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { db } from '../firebase/config';
import { collection, query, orderBy, limit, startAfter, doc, getDoc, getDocs, where } from 'firebase/firestore';
import AddPost from "../components/CreatePost/AddPost";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import ProfileIcon from "../assests/profileIcon.jpg"
function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false)
  const [userDetails, setUserDetails] = useState({})
  const { currentUser } = useAuthContext()
  const { id } = useParams()
  const navigate = useNavigate();
  const scrollRef = useRef(null)
  // Fetch posts with user data
  const fetchPosts = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true)
    try {
      const postsQuery = query(
        collection(db, 'posts'),
        where('uid', '==', id),
        orderBy('createdAt', 'desc'),
        limit(20),
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

      setPosts([...posts, ...fetchedPosts]);
      setLastDoc(lastVisible);
      setHasMore(postsSnapshot.docs.length === 20);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false)
    }
  }, [db, hasMore, lastDoc, setPosts, posts, setLoading]);

  const fetchUserDetails = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', id));
      if (userDoc.exists()) {
        const user = userDoc.data()
        setUserDetails(user)
      }
    }
    catch (err) {

    }
  }


  useEffect(() => {
    fetchUserDetails()
    fetchPosts();

  }, []);

   const handleScroll = () => {
      const scrollbar = scrollRef.current;
      if (scrollbar && !loading) {
        const { scrollTop, scrollHeight, clientHeight } = scrollbar;
        if (scrollHeight - scrollTop <= clientHeight + 1500) {
          console.log("Near the bottom, load more items!");
          fetchPosts();
          // Call your function to load more data here
        }
      }
    };
  
  
    useEffect(() => {
      const scrollbar = scrollRef.current;
      if (scrollbar) {
        scrollbar.addEventListener("scroll", handleScroll);
      }
  
      return () => {
        if (scrollbar) {
          scrollbar.removeEventListener("scroll", handleScroll);
        }
      };
    }, [loading]);


  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      {/* Header Section */}
      <div className="relative">
        <div className="absolute top-1 left-1 flex items-center p-4 text-white">
          <button onClick={() => { navigate(-1) }}>
            <FaArrowLeft className="text-lg" />
          </button>

        </div>
        {/* Background Image */}
        <img
          src={userDetails.coverURL || "https://placehold.co/600x300?text=Cover%20+%20Image"}
          alt="Cover"
          onError={(e) => e.target.src = "https://placehold.co/600x300?text=Cover%20+%20Image"}
          className="w-full h-40 object-cover rounded-b-[1rem]"
        />
        {/* Profile Picture */}
        <div className="absolute -bottom-12 left-4">
          <img
            src={userDetails.photoURL || ProfileIcon}
            alt="Profile"
            onError={(e) => { e.target.src = ProfileIcon }}
            className="w-28 h-28 rounded-full object-cover shadow-md"
          />
        </div>
        {id === currentUser.uid &&
          <div className="absolute bottom-[-3rem] right-4">
            <Link to="/edit-profile">
              <button className="bg-white font-bold text-gray-800 px-4 py-2 rounded-full border border-gray-300 w-[12rem]">
                Edit Profile
              </button>
            </Link>
          </div>}
      </div>


      {/* User Bio */}
      <div className="mt-16 px-4">
        <h1 className="text-2xl font-bold capitalize">{userDetails.displayName}</h1>
        <p className="text-gray-600 mt-2 font-kumbh">
          {userDetails.bio}
        </p>
      </div>

      {/* My Posts Section */}
      <div className="px-4 mt-6 ">
        <h2 className="text-lg font-bold mb-4">My Posts</h2>
        <div ref={scrollRef} className="w-[100%] h-[30rem] overflow-y-auto">
          {/* Posts Grid */}
          <div className="w-[100%] " style={{ columns: "2" }}>
            {/* Post 1 */}
            {posts.map((post, index) => (
              <div key={index} className="relative w-full bg-white rounded-lg shadow-md overflow-hidden mb-2">
                {post.fileURLs.length > 0 && post.fileURLs[0].type == "image" &&
                  <img
                    src={post.fileURLs[0].src}
                    alt="posts pic"
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />}
                {post.fileURLs.length > 0 && post.fileURLs[0].type == "video" &&
                  <video
                    src={post.fileURLs[0].src}
                    alt="posts pic"
                    className="w-full h-auto object-cover"
                  />}
                {
                  post.fileURLs.length === 0 &&
                  <div className={`w-full h-60 flex items-center justify-center ${index % 2 === 0 ? "bg-purple-100" : "bg-yellow-50"}`} >
                    <p className="text-gray-500 text-center">{post.caption || ""}</p>
                  </div>
                }
                <div className="absolute bottom-2 left-0 p-2">
                  {post.fileURLs.length > 0 && <p className="w-[8rem] text-white font-medium overflow-ellipsis overflow-hidden whitespace-nowrap font-kumbh">{post.caption || ""}</p>}
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
