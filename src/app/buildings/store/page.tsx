"use client";

import { HouseInfo, StoreInfo } from "@/app/components/links";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/virtual";
import "swiper/css/keyboard";
import "swiper/css/mousewheel";
import "swiper/css/pagination";
import "swiper/css/parallax";
import "swiper/css/autoplay";
import "swiper/css/grid";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/zoom";
import "swiper/css/thumbs";

import {
  PiArmchairDuotone,
  PiRulerDuotone,
  PiCompassDuotone,
  PiBuildingsDuotone,
  PiParkDuotone,
  PiMapPinDuotone,
  PiPlus,
  PiMinus,
} from "react-icons/pi";
import dynamic from "next/dynamic";
import SwiperCore from "swiper";
// import "swiper/swiper-bundle.min.css";

// Initialize Swiper core components
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
import { SwiperProps } from "swiper/react";

const Maps = dynamic(() => import("@/app/components/maps"), { ssr: false });
export default function Store() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  type SwiperType = Omit<SwiperCore, "translate"> & {
    slideTo?: (index: number) => void;
  };

  const slideTo = (index: number) => {
    if (swiper && swiper.slideTo) {
      swiper.slideTo(index);
    }
  };
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
    <div className="mx-auto mt-[-10px] md:mt-auto">
      <div className="flex justify-center xl:justify-between  items-center w-full">
        {StoreInfo.map((link, index) => (
          <div
            key={index}
            className="flex flex-col xl:flex-row gap-5 items-center"
          >
            <div className="mx-2 xl:mx-0 flex justify-center items-center">
            <Swiper
                navigation
                pagination={{ clickable: true }}
                effect="fade"
                className="mt-5 w-[320px] md:w-[600px] h-[200px] md:h-[300px] flex justify-center items-center"
              >
                {link.images.map((image, imageIndex) => (
                  <SwiperSlide key={imageIndex}>
                    <div className="flex justify-center items-center">
                      <Image
                        src={image}
                        width={500}
                        height={400}
                        alt={`Gallery Image ${index}`}
                        className="object-cover rounded-md cursor-pointer"
                        onClick={() => openPopup(link.images)}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xl py-2 px-3 bg-accent w-min rounded-md">
                {link.display}
              </p>
              <h1 className="text-3xl font-bold">{link.title}</h1>
              <p className="text-lg font-thin text-gray-400">{link.discrep}</p>
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-1 gap-y-5 xl:gap-x-10">
                <div className="flex gap-2">
                  <div className="flex justify-center items-center gap-1 ">
                    <p className="text-accent text-lg">
                      <PiRulerDuotone />
                    </p>
                    المساحة:
                  </div>
                  <p className="text-gray-300">
                    {link.size}M<sup>2</sup>
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="flex justify-center items-center gap-1 ">
                    <p className="text-accent text-lg">
                      <PiCompassDuotone />
                    </p>
                    الإتجاه:
                  </div>
                  <p className="text-gray-300">{link.direction}</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex justify-center items-center gap-1 ">
                    <p className="text-accent text-lg">
                      <PiMapPinDuotone />
                    </p>
                    الموقع:
                  </div>
                  <p className="text-gray-300">{link.place}</p>
                </div>
              </div>
              <p className="text-xl text-accent">{link.prise} ل.س</p>
              <div className="flex justify-between items-center mx-3 cursor-pointer">
                <div className="flex gap-2 justify-center items-center">
                  <Image
                    src={link.imageSeller}
                    width={40}
                    height={40}
                    alt="seller"
                    className="p-1 bg-accent rounded-full"
                  />
                  <p>{link.seller}</p>
                </div>
                <Link
                  href={`tel://${link.sellerNum}`}
                  className="py-2 px-3 bg-accent rounded-md"
                >
                  {link.sellerNum}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {popupOpen && (
        <div className="fixed inset-0 flex items-center justify-center my-0 z-50 bg-gray-900 bg-opacity-50">
          <div className=" w-full md:h-full text-center bg-body  p-8 rounded-lg flex justify-center items-center">
            <Swiper navigation effect="fade" className="w-full h-full flex justify-center items-center">
              {selectedImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center items-center">
                    <Image
                      src={image}
                      width={900}
                      height={700}
                      alt={`Popup Image ${index}`}
                      className="object-contain rounded-md text-center"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closePopup}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center mt-10 mx-2 xl:mx-0 xl:ml-4 rounded-md relative cursor-pointer">
        <Maps building={StoreInfo} />
      </div>
    </div>
  );
}
