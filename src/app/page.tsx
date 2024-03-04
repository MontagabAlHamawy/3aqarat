"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
// import SwiperCore, { Navigation, Autoplay } from "swiper";

import Link from "next/link";
import DragAndDrop from "./dragAndDrop/page";

// تفعيل المكونات الإضافية
// SwiperCore.use([Navigation, Autoplay]);

export default function Home() {
  return (
    <div className="p-0 mt-[-40px] mr-[-20px] h-[150vh]">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        navigation
      >
        <SwiperSlide>
          {/* الشريحة الأولى */}
          <div className="flex flex-col bg-section mr-[-20px] px-10 xl:flex-row-reverse justify-center items-center xl:items-start gap-x-32 xl:py-20">
            {/* محتوى الشريحة */}
            {/* <div className="bg-accent w-[400px] py-3 container flex items-center justify-center shadow-2xl shadow-black rounded-[40px] rounded-tr-[330px] px-3 mx-auto"> */}
            <img
              src="/home/hero.png"
              className="w-[100px] md:w-[300px]"
              alt="صورة البطاقة الرئيسية"
            />
            {/* </div> */}
            <div className="flex flex-col mt-10 gap-y-5 xl:gap-y-10 items-center xl:items-start">
              <h1 className="text-3xl xl:text-5xl font-semibold text-accent">
                كل البيوت تحت سقفٍ واحد
              </h1>
              <div className="flex flex-col justify-center items-center xl:items-start">
                <p className="text-lg xl:text-xl ">اعثروا على منزل أحلامكم</p>
                <p className="text-lg xl:text-xl ">
                  من بين 105,794 عقار معروض للبيع والأجار
                </p>
                <p className="text-lg xl:text-xl ">إبحث عن عقارات للبيع و</p>
                <p className="text-lg xl:text-xl ">
                  للايجار بالتقسيط او كاش في مصر تحب تسكن فين؟
                </p>
              </div>
              <Link href="/login" className="xl:mt-10">
                <button className="bg-accent text-white px-4 py-2 xl:py-3 text-base xl:text-xl rounded hover:scale-110 ease-in duration-300">
                  تسجيل الدخول
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {/* الشريحة الأولى */}
          <div className="flex flex-col bg-section mr-[-20px] px-10 xl:flex-row-reverse justify-center items-center xl:items-start gap-x-32 xl:py-20">
            {/* محتوى الشريحة */}
            {/* <div className="bg-accent w-[400px] py-3 container flex items-center justify-center shadow-2xl shadow-black rounded-[40px] rounded-tl-[180px] px-3 mx-auto"> */}
            <img
              src="/home/hero2.png"
              className="w-[300px] md:w-[400px] mt-[40px] "
              alt="صورة البطاقة الرئيسية"
            />
            {/* </div> */}
            <div className="flex flex-col mt-10 gap-y-5 xl:gap-y-10 items-center xl:items-start">
              <h1 className="text-3xl xl:text-5xl font-semibold text-accent">
                كل البيوت تحت سقفٍ واحد
              </h1>
              <div className="flex flex-col justify-center items-center xl:items-start">
                <p className="text-lg xl:text-xl ">اعثروا على منزل أحلامكم</p>
                <p className="text-lg xl:text-xl ">
                  من بين 105,794 عقار معروض للبيع والأجار
                </p>
                <p className="text-lg xl:text-xl ">إبحث عن عقارات للبيع و</p>
                <p className="text-lg xl:text-xl ">
                  للايجار بالتقسيط او كاش في مصر تحب تسكن فين؟
                </p>
              </div>
              <Link href="/login" className="xl:mt-10">
                <button className="bg-accent text-white px-4 py-2 xl:py-3 text-base xl:text-xl rounded hover:scale-110 ease-in duration-300">
                  تسجيل الدخول
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {/* الشريحة الأولى */}
          <div className="flex flex-col bg-section mr-[-20px] px-10 xl:flex-row-reverse justify-center items-center xl:items-start gap-x-32 xl:py-20">
            {/* محتوى الشريحة */}
            {/* <div className="bg-accent w-[300px] py-3 container flex items-center justify-center shadow-2xl shadow-black rounded-[40px] rounded-t-[400px] px-3 mx-auto"> */}
            <img
              src="/home/hero3.png"
              className="w-[300px] md:w-[400px] mt-[-40px]"
              alt="صورة البطاقة الرئيسية"
            />
            {/* </div> */}
            <div className="flex flex-col mt-10 gap-y-5 xl:gap-y-10 items-center xl:items-start">
              <h1 className="text-3xl xl:text-5xl font-semibold text-accent">
                كل البيوت تحت سقفٍ واحد
              </h1>
              <div className="flex flex-col justify-center items-center xl:items-start">
                <p className="text-lg xl:text-xl ">اعثروا على منزل أحلامكم</p>
                <p className="text-lg xl:text-xl ">
                  من بين 105,794 عقار معروض للبيع والأجار
                </p>
                <p className="text-lg xl:text-xl ">إبحث عن عقارات للبيع و</p>
                <p className="text-lg xl:text-xl ">
                  للايجار بالتقسيط او كاش في مصر تحب تسكن فين؟
                </p>
              </div>
              <Link href="/login" className="xl:mt-10">
                <button className="bg-accent text-white px-4 py-2 xl:py-3 text-base xl:text-xl rounded hover:scale-110 ease-in duration-300">
                  تسجيل الدخول
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
