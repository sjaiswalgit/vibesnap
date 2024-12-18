// Import Swiper core and required modules
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MdDelete } from "react-icons/md";
// Import Swiper and module styles

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./custom.css"
const ImageCarousel = ({ files, deleteImage, showDeleteBTn = false }) => {
  const videoRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(() => {
    const videoElement = videoRef.current;
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.5 } // At least 50% of the video should be visible
    );
  
    if (videoElement) {
      observer.observe(videoElement);
    }
  
    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);
  
  useEffect(() => {
    if (showDeleteBTn) {
      return;
    }
  
    const videoElement = videoRef.current;
    if (videoElement) {
      const isPlaying = !videoElement.paused && !videoElement.ended;
  
      if (isIntersecting) {
        videoElement
          .play()
          .catch((error) => {
            console.warn("Video play interrupted:", error.message);
          });
      } else if (isPlaying) {
        videoElement.pause();
      }
    }
  }, [isIntersecting]);
  




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
                className="w-full h-full object-cover rounded-lg"
              />}
            {file.type === "video" &&
              <video
                ref={videoRef}
                src={file.src}
                alt="Uploaded"
                muted
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
