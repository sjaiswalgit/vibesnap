// Import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MdDelete } from "react-icons/md";
// Import Swiper and module styles

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./custom.css"
const ImageCarousel = ({ files, deleteImage }) => {
 
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
          <div className="relative aspect-square w-full overflow-hidden rounded-xl" >
          {file.type==="image" &&
          <img
            src={file.src}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-lg"
          />}
          {file.type==="video" &&
          <video
            src={file.src}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-lg"
          />}
          <button
            onClick={() => {deleteImage(index)}}
            className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full text-2xl"
          >
            <MdDelete />
          </button>
         
          {/* Image Counter */}
          <div className="absolute top-2 right-2 bg-white text-black text-xs px-2 py-1 rounded-full">
            {index + 1}/{files.length}
          </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;