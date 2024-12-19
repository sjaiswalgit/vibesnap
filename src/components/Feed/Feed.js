import React, { useState, useEffect, useCallback, useRef } from 'react';
import { db } from '../../firebase/config';
import { collection, query, orderBy, limit, startAfter, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import ImageCarousel from '../Swipper';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa6";
import SharePost from './ShareFeed';
import ProfileIcon from '../../assests/profileIcon.jpg'
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const { currentUser } = useAuthContext()
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  // Fetch posts with user data
  const fetchPosts = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true)
    try {
      const postsQuery = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        limit(20),
        ...(lastDoc ? [startAfter(lastDoc)] : [])
      );

      const postsSnapshot = await getDocs(postsQuery);
      const fetchedPosts = [];
      let lastVisible = null;
      for (const docSnapshot of postsSnapshot.docs) {
        const postData = docSnapshot.data();
        const userDoc = await getDoc(doc(db, 'users', postData.uid));

        fetchedPosts.push({
          ...postData,
          id: docSnapshot.id,
          displayName: userDoc.exists() ? userDoc.data().displayName : 'Unknown User',
          displayPhoto: userDoc.exists() ? userDoc.data().photoURL : 'https://via.placeholder.com/40',
        });

        lastVisible = docSnapshot;
      }

      setPosts((prev) => [...posts, ...fetchedPosts]);
      setLastDoc(lastVisible);
      setHasMore(postsSnapshot.docs.length === 20);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false)
    }
  }, [db, hasMore, lastDoc, setPosts, posts, setLoading]);

  // Infinite Scroll Handler
  useEffect(() => {
    fetchPosts();

  }, []);

  const recentDate = (createdAt) => {
    const date = createdAt.seconds * 1000;
    const currentTimestamp = Date.now();

    if ((currentTimestamp - date) / 1000 < 60) { return ("just now") }
    else if ((currentTimestamp - date) / 1000 < 3600) { return (Math.floor((currentTimestamp - date) / 60000) + " min ago") }
    else if ((currentTimestamp - date) / 1000 < 3600 * 24) { return (Math.floor((currentTimestamp - date) / 3600000) + " hrs ago") }
    else {
      const formatedDate = new Date(date).toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      );
      return formatedDate
    }

  }

  const handleLike = async (post, index) => {

    const postRef = doc(db, 'posts', post.id);
    const newLiked = [...posts];
    try {
      if (post.likes[currentUser.uid]) {
        // Unlike the post
        updateDoc(postRef, {
          [`likes.${currentUser.uid}`]: false,
          likeCount: post.likeCount > 0 ? post.likeCount - 1 : 0,
        });
        newLiked[index].likes[currentUser.uid] = false;
        newLiked[index].likeCount -= 1
        setPosts(newLiked)
      } else {
        // Like the post
        updateDoc(postRef, {
          [`likes.${currentUser.uid}`]: true,
          likeCount: post.likeCount + 1,
        });

        newLiked[index].likes[currentUser.uid] = true;
        newLiked[index].likeCount += 1
        setPosts(newLiked)
      }

    } catch (error) {
      console.error('Error updating like:', error);
    }
  }


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

  const renderHashtags = (content) => {
    if (!content) return ""
    return content.split(/(\s+)/).map((word, index) => {
      // Check if the word starts with '#'
      if (word.startsWith("#")) {
        return (
          <span key={index} className="text-blue-500">
            {word}
          </span>
        );
      }
      return word; // Return non-hashtag words as is
    });
  };

  return (
    <div ref={scrollRef} className="space-y-6 h-[calc(100%-7rem)] overflow-y-auto no-scrollbar">
      {posts.map((post, index) => (
        <div key={index} className={`p-4 rounded-2xl shadow-md ${index % 2 === 0 ? "bg-purple-100" : "bg-yellow-50"}`}>
          <div onClick={()=>{navigate(`/profile/${post.uid}`)}} className="flex items-center space-x-3 mb-2">
            <img
              src={post.displayPhoto || ProfileIcon}
              alt={post.displayName}
              className="w-10 h-10 rounded-full"
              loading='lazy'
            />
            <div>
              <h3 className="font-bold capitalize">{post.displayName}</h3>
              <p className="text-sm text-gray-400">{recentDate(post.createdAt)}</p>
            </div>
          </div>

          <p className="text-gray-700 mb-3 font-kumbh">{renderHashtags(post.caption)}</p>

          <div>
            <ImageCarousel files={post.fileURLs || []} />
          </div>

          <div className="mt-4 flex items-center justify-between text-gray-600">
            <div onClick={() => handleLike(post, index)} className="flex items-center space-x-1 text-red-500">
              <span className="text-xl">{post.likes[currentUser.uid] ? <FaHeart /> : <FaRegHeart />}</span>
              <span className="text-sm font-medium">{post.likeCount || ""}</span>
            </div>
            <button onClick={() => { setShowShare(true) }} className={`pl-3 pr-3 pt-1 pb-1 rounded-full flex items-center space-x-1 text-gray-800 font-bold ${index % 2 === 0 ? "bg-purple-200" : "bg-yellow-100"}`}>
              <span className="text-lg"><FaLocationArrow /></span>
              <span>Share</span>
            </button>
          </div>
        </div>
      ))}

      {loading && (
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-4 border-t-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            <span className=" font-semibold text-md">Loading...</span>
          </div>
        </div>
      )}
      {/* Share Menu */}
      {showShare &&
        <div onClick={() => { setShowShare(false) }} className="fixed top-[-1.5rem] left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
          <SharePost setShowShare={setShowShare} />
        </div>
      }
    </div>
  );
};

export default Feed;
