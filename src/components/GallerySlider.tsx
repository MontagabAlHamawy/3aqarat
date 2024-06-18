'use client'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Imag } from "./links";

export default function GallerySlider(){
  return (
    <Swiper
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="mt-5 w-[600px] h-[300px] flex justify-center items-center"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
    >
      {Imag.map((image, index) => (
        <SwiperSlide key={index} >
          <div className="flex justify-center items-center ">
            <Image
              src={image.name}
              width={500}
              height={400}
              alt={`Gallery Image ${index}`}
              className=" object-cover rounded-md"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

