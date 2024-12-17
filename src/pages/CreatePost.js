import React, { useState } from "react";
import { useDeviceContext } from "../context/DeviceContext";
import { FaArrowLeft } from "react-icons/fa";
import { BsImages } from "react-icons/bs";
import { PiVideoFill } from "react-icons/pi";
import { FaCamera } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import ImageCarousel from "../components/Swipper";
function CreatePost() {
  const [files, setFiles] = useState([]);
  const [caption, setCaption] = useState(""); // State for caption
  const navigate = useNavigate();
  const { deviceType } = useDeviceContext()
  // Handle image upload
  const handleImageUpload = (e, type) => {
    const files = Array.from(e.target.files);
    const uploadedImages = files.map((file) => ({ file: file, src: URL.createObjectURL(file), type }))
    setFiles((prev) => [...prev, ...uploadedImages]);
  };


  // Handle image deletion
  const deleteImage = (index) => {
    const newImages = files.filter((_, i) => i !== index);
    setFiles(newImages);
  };
  console.log(deviceType)
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 ">
        <button onClick={() => { navigate(-1) }}>
          <FaArrowLeft className="text-lg" />
        </button>
        <h1 className="text-lg font-bold ml-4">New post</h1>
      </div>

      {/* Image Upload Section */}
      <div className="p-4 ">
        {files.length > 0 ? (
          <div className="relative p-6">
            {/* Image Preview */}
            <ImageCarousel files={files} deleteImage={deleteImage} />
          </div>
        ) : (
          <textarea
            value={caption}
            placeholder="What's on your mind ?"
            onChange={(e) => setCaption(e.target.value)}
            className="aspect-[1.4] w-full bg-gray-100 pt-4 pl-2 rounded-xl text-gray-600 font-kumbh">

          </textarea>
        )}

        {/* Upload Input */}
        <div className="flex flex-col items-start  mt-4 space-y-3">
          <label className="flex items-center space-x-2 cursor-pointer text-green-600 font-medium">
            <BsImages />
            <span className="text-black font-bold">Photos</span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, "image")}
            />
          </label>
          <label className="flex items-center space-x-2 text-red-500 font-medium">
            <PiVideoFill />
            <span className="text-black font-bold">Video</span>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, "video")}
            />
          </label>
          {deviceType == "Mobile" &&
            <label className="flex items-center space-x-2 text-blue-500 font-medium">
              <FaCamera />
              <span className="text-black font-bold">Camera</span>
              <input
                type="file"
                multiple
                capture="environment"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "image")}
              />
            </label>}
        </div>
      </div>

      {/* Caption Input */}
      {files.length > 0 && <div className="p-4">
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
