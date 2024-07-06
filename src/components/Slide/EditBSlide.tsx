"use client";

import Image from "next/image";
import React, { useState } from "react";
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

export default function EditBSlide({ image }: any) {
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
        className=""
      >
        {image.map((image: any, imageIndex: any) => (
          <SwiperSlide key={imageIndex}>
            <div className="w-full">
              <Image
                src={image.photo}
                width={390}
                height={0}
                alt={`Gallery Image`}
                className="w-full h-min object-center rounded-md cursor-pointer"
                onClick={() => openPopup(image.images)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
