"use client";

import Image from "next/image";
import React, { useState } from "react";
import { PiInfinityDuotone } from "react-icons/pi";
import SwiperCore from "swiper";
import {
  A11y,
  Navigation,
  Pagination,
  Scrollbar,
  Virtual,
  Keyboard,
  Mousewheel,
  Parallax,
  FreeMode,
  Grid,
  Zoom,
  Autoplay,
  EffectFade,
  Thumbs,
} from "swiper/modules";
SwiperCore.use([
  A11y,
  Navigation,
  Pagination,
  Scrollbar,
  Virtual,
  Keyboard,
  Mousewheel,
  Parallax,
  FreeMode,
  Grid,
  Zoom,
  Autoplay,
  EffectFade,
  Thumbs,
]);
import { Swiper, SwiperSlide } from "swiper/react";

export default function Slide({ image }: any) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const openPopup = (images: any) => {
    setSelectedImages(images);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedImages([]);
    setPopupOpen(false);
  };
  return (
    <div>
      <Swiper
        navigation
        pagination={{ clickable: true }}
        effect="fade"
        className="xl:mt-5 w-[320px] md:w-[600px] bg-sidpar rounded-md  flex justify-center items-center"
      >
        {image.map((image: any, imageIndex: any) => (
          <SwiperSlide key={imageIndex}>
            <div className="flex bg-sidpar justify-center items-center w-full h-[280px] md:h-[300px] xl:h-[400px] ">
              <Image
                src={image.photo}
                width={400}
                height={0}
                alt={`Gallery Image`}
                className="w-full h-min object-center rounded-md z-20 cursor-pointer"
                onClick={() => openPopup(image.images)}
              />
              <PiInfinityDuotone size={70} className="text-accent z-10 fixed animate-waving-hand2 opacity-100 transform translate-y-0 duration-100"/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
