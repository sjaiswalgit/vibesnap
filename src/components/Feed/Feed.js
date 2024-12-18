import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase/config';
import {collection, query, orderBy, limit, startAfter, doc, getDoc, getDocs,updateDoc } from 'firebase/firestore';
import ImageCarousel from '../Swipper';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAuthContext } from '../../context/AuthContext';
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const { currentUser}=useAuthContext()

  // Fetch posts with user data
  const fetchPosts = useCallback(async () => {
    if (!hasMore) return;
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
      console.log( postsSnapshot.docs.length)
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
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, [db, hasMore, lastDoc,setPosts,posts]);

  // Infinite Scroll Handler
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const recentDate=(createdAt)=>{
    const date=createdAt.seconds*1000;
    const currentTimestamp= Date.now();

    if((currentTimestamp-date)/1000<60)
    {return ("just now")}
    else if((currentTimestamp-date)/1000<3600)
    {return (Math.floor((currentTimestamp-date)/60000)+" min ago")}
    else if((currentTimestamp-date)/1000<3600*24)
    {return (Math.floor((currentTimestamp-date)/3600000)+" hrs ago")}
    else
    {const formatedDate = new Date(date).toLocaleString(
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

const handleLike=async(post,index)=>{
  const postRef = doc(db, 'posts', post.id);
  console.log("hhhg")
  const newLiked=[...posts];
  try {
    if (post.likes[currentUser.uid]) {
      // Unlike the post
       updateDoc(postRef, {
        [`likes.${currentUser.uid}`]: false,
        likeCount: post.likeCount > 0 ? post.likeCount - 1 : 0,
      });
      newLiked[index].likes[currentUser.uid]=false;
      newLiked[index].likeCount -=1 
      setPosts(newLiked)
    } else {
      // Like the post
       updateDoc(postRef, {
        [`likes.${currentUser.uid}`]: true,
        likeCount: post.likeCount + 1,
      });

      newLiked[index].likes[currentUser.uid]=true;
      newLiked[index].likeCount += 1 
      setPosts(newLiked)
    }
    
  } catch (error) {
    console.error('Error updating like:', error);
  }
}






  return (
    <div className=" space-y-6 h-[calc(100%-7rem)] overflow-y-auto [::-webkit-scrollbar]:none scrollbar-none">
      {posts.map((post,index) => (
        <div key={index} className={`p-4 rounded-2xl shadow-md ${index%2===0?"bg-purple-100":"bg-yellow-50"}`}>
          <div className="flex items-center space-x-3 mb-2">
            <img
              src={post.displayPhoto}
              alt={post.displayName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-bold">{post.displayName}</h3>
              <p className="text-sm text-gray-400">{recentDate(post.createdAt)}</p>
            </div>
          </div>

          <p className="text-gray-700 mb-3">{post.caption}</p>

          <div>
            <ImageCarousel files={post.fileURLs || []} />
          </div>

          <div className="mt-4 flex items-center justify-between text-gray-600">
            <div onClick={()=>handleLike(post,index)} className="flex items-center space-x-1 text-red-500">
              <span className="text-xl">{post.likes[currentUser.uid]?<FaHeart />: <FaRegHeart />}</span>
              <span className="text-sm font-medium">{post.likeCount || ""}</span>
            </div>
            <button className="flex items-center space-x-1 text-gray-600 font-medium">
              <span className="text-lg">🚀</span>
              <span>Share</span>
            </button>
          </div>
        </div>
      ))}

      {hasMore && (
        <div className="text-center">
          <button onClick={fetchPosts} className="text-blue-500 font-medium">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Feed;
