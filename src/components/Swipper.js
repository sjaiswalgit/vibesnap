// Import Swiper core and required modules
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MdDelete } from "react-icons/md";
// Import Swiper and module styles
import VideoPlayer from "./VideoPlayer";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./custom.css"
const ImageCarousel = ({ files, deleteImage, showDeleteBTn = false }) => {
  



  return (
    <Swiper
      modules={[Navigation, Pagination]} // Register the modules here
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={1}
      className="flex overflow-x-auto space-x-2 "
    >
      {files.map((file, index) => (
        <SwiperSlide key={index} className="relative  overflow-hidden  ">
          <div className={`relative w-full overflow-hidden rounded-xl ${showDeleteBTn ? "aspect-square" : ""}`} >
            {file.type === "image" &&
              <img
                src={file.src}
                alt="Uploaded"
                loading="lazy"
                width={200}
                className="w-full h-full object-cover rounded-lg"
              />}
            {file.type === "video" &&
              <VideoPlayer  
              videoUrl={file.src}
                className="w-full h-full object-cover rounded-lg"
              />}
            {showDeleteBTn &&
              <button
                onClick={() => { deleteImage(index) }}
                className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full text-2xl"
              >
                <MdDelete />
              </button>
            }

            {/* Image Counter */}
            {files.length > 1 &&
              <div className="absolute top-2 right-2 bg-white text-black text-xs px-2 py-1 rounded-full">
                {index + 1}/{files.length}
              </div>
            }
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
