import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { BsImages } from "react-icons/bs";
import { PiVideoFill } from "react-icons/pi";
import { FaCamera } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import ImageCarousel from "../components/Swipper";
function CreatePost() {
  const [images, setImages] = useState([]); // State to store selected images
  const [caption, setCaption] = useState(""); // State for caption
  const navigate = useNavigate();
  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...uploadedImages]);
  };

  // Handle image deletion
  const deleteImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 ">
        <button onClick={()=>{navigate(-1)}}>
          <FaArrowLeft className="text-lg" />
        </button>
        <h1 className="text-lg font-bold ml-4">New post</h1>
      </div>

      {/* Image Upload Section */}
      <div className="p-4 ">
        {images.length > 0 ? (
          <div className="relative p-6">
            {/* Image Preview */}
            <ImageCarousel images={images} deleteImage={deleteImage}/>
          </div>
        ) : (
          <textarea
            value={caption}
            placeholder="What's on your mind ?"
            onChange={(e) => setCaption(e.target.value)}
            className="aspect-[1.4] w-full bg-gray-100 pt-4 pl-2 rounded-xl text-gray-400 font-kumbh">

          </textarea>
        )}

        {/* Upload Input */}
        <div className="flex flex-col items-start  mt-4">
          <label className="flex items-center space-x-2 cursor-pointer text-green-600 font-medium">
            <BsImages />
            <span className="text-black font-bold">Photos</span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <div className="flex items-center space-x-2 text-red-500 font-medium">
            <PiVideoFill />
            <span className="text-black font-bold">Video</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-500 font-medium">
            <FaCamera />
            <span className="text-black font-bold">Camera</span>
          </div>
        </div>
      </div>

      {/* Caption Input */}
     { images.length > 0 && <div className="p-4">
        <textarea
          rows="4"
          className="aspect-[2.5] w-full bg-gray-100 pt-4 pl-2 rounded-xl text-gray-800 font-kumbh"
          placeholder="What's on your mind ?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>
      </div>
    }
      {/* Create Button */}
      <div className="mt-auto p-4">
        <button className="bg-black text-white w-full py-3 rounded-full font-semibold text-lg">
          CREATE
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
