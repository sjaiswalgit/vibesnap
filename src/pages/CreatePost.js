import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { BsImages, BsCameraVideo, BsCamera } from "react-icons/bs";

function CreatePost() {
  const [images, setImages] = useState([]); // State to store selected images
  const [caption, setCaption] = useState(""); // State for caption

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
      <div className="flex items-center p-4 border-b">
        <button>
          <FaArrowLeft className="text-lg" />
        </button>
        <h1 className="text-lg font-bold ml-4">New post</h1>
      </div>

      {/* Image Upload Section */}
      <div className="p-4">
        {images.length > 0 ? (
          <div className="relative">
            {/* Image Preview */}
            <div className="flex overflow-x-auto space-x-2">
              {images.map((image, index) => (
                <div key={index} className="relative w-60 h-60 shrink-0">
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => deleteImage(index)}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full"
                  >
                    <FiTrash />
                  </button>
                  {/* Image Counter */}
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-white text-black text-xs px-2 py-1 rounded">
                      {index + 1}/{images.length}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-40 bg-gray-100 flex items-center justify-center rounded-lg text-gray-500">
            What’s on your mind?
          </div>
        )}

        {/* Upload Input */}
        <div className="flex items-center space-x-4 mt-4">
          <label className="flex items-center space-x-2 cursor-pointer text-green-600 font-medium">
            <BsImages />
            <span>Photos</span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <div className="flex items-center space-x-2 text-red-500 font-medium">
            <BsCameraVideo />
            <span>Video</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-500 font-medium">
            <BsCamera />
            <span>Camera</span>
          </div>
        </div>
      </div>

      {/* Caption Input */}
      <div className="p-4">
        <textarea
          rows="4"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
          placeholder="Surrounded by nature’s beauty, finding peace in every leaf, breeze, and sunset. 🌿🌞"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>
      </div>

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
