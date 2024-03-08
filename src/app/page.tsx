"use client";
import Image from "next/image";
import Link from "next/link";
import "swiper/swiper-bundle.css";
import { PiCheck } from "react-icons/pi";

export const hom = [
  { name: "منازل" },
  { name: "شقق" },
  { name: "محال تجارية" },
  { name: "أراضي" },
  { name: "محاضر" },
];

export const whyus = [
  {
    title: "اسعار مقبولة",
    discrep: "اسعار مقبولة اسعار مقبولة اسعار مقبولة اسعار مقبولة اسعار مقبولة",
  },
  {
    title: "نضمن جودة خدمة عالى",
    discrep:
      "نضمن جودة خدمة عالى نضمن جودة خدمة عالى نضمن جودة خدمة عالى نضمن جودة خدمة عالى",
  },
  {
    title: "نمنح ثقة متبادلة",
    discrep:
      "نمنح ثقة متبادلة نمنح ثقة متبادلة نمنح ثقة متبادلة نمنح ثقة متبادلة نمنح ثقة متبادلة",
  },
  {
    title: "نمنح ثقة متبادلة",
    discrep:
      " نمنح ثقة متبادلة نمنح ثقة متبادلة نمنح ثقة متبادلة نمنح ثقة متبادلةنمنح ثقة متبادلة",
  },
];
export const house = [
  {
    img: "/home/gg.jpg",
    title: "مدينة الاحلام ",
    discrep: "مساحة 250 م مفروش ",
    prise: "200$",
  },
  {
    img: "/home/rr.png",
    title: "مدينة الاحلام ",
    discrep: "مساحة 250 م مفروش ",
    prise: "1300$",
  },
  {
    img: "/home/qwe.png",
    title: "مدينة الاحلام ",
    discrep: "مساحة 250 م مفروش ",
    prise: "670$",
  },
];

export default function Home() {
  return (
    <div className="p-0 mt-32 mx-4 xl:mx-10 h-[150vh]">
      <div className="flex justify-between items-center flex-col xl:flex-row gap-4 xl:gap-8 ">
        <h1 className="text-white text-xl font-bold xl:font-medium xl:text-3xl w-full xl:w-[50%]">
          مرحباً بك في عالم العقارات، حيث ينتظرك منزل أحلامك. ابحث، اكتشف، واختر
          مساحتك الجميلة الآن
        </h1>
        <div className="flex justify-center  items-center flex-col  xl:mt-10">
          <p className="mb-10">
            خدمة وخبرة استثنائية , نحن الحل المثالي لتعثر على منزل احلامك{" "}
          </p>
          <Link href={"/"}>
            <div className="bg-accent text-white px-4 py-2 rounded hover:scale-110  ease-in duration-300">
              عرض المنازل
            </div>
          </Link>
        </div>
      </div>
      <div>
        <Image
          src={"/ds.png"}
          width={600}
          height={0}
          alt="montagab"
          className="w-96 xl:w-[1080px]"
        />
      </div>
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-white text-2xl my-5">الأعلا تقييماً</h1>
        <div className="grid grid-cols-2 xl:grid-cols-5 gap-x-5 gap-y-5 xl:gap-x-16 xl:mb-6">
          {hom.map((link, index) => {
            return (
              <div
                key={index}
                className="py-1 px-5 bg-accent text-md w-full text-white rounded-xl flex justify-center items-center cursor-pointer"
              >
                <p className="text-white text-lg">{link.name}</p>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-5 xl:gap-x-16 xl:gap-y-10 my-5  ">
          {house.map((houss, index) => {
            return (
              <div key={index} className="bg-sidpar rounded-xl ">
                <Image
                  src={houss.img}
                  width={1000}
                  height={0}
                  alt="montagab"
                  className="w-[1080px] rounded-tl-xl rounded-tr-xl"
                />
                <p className="text-lg xl:text-xl text-white mt-2 px-2 xl:px-5">
                  {houss.title}
                </p>
                <p className="text-white text-sm font-light sm:my-2 px-2 xl:px-5">
                  {houss.discrep}
                </p>
                <div className="flex flex-row justify-between items-center my-3 xl:my-1 mx-5 mb-4">
                  <p>{houss.prise}</p>
                  <div className="bg-accent text-white text-sm xl:text-lg px-2 py-1 rounded hover:scale-110  ease-in duration-300">
                    عرض
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Link href={"/"}>
          <div className="bg-accent text-white px-4 py-2 rounded hover:scale-110  ease-in duration-300">
            عرض المزيد
          </div>
        </Link>
      </div>
      <div className="flex flex-col xl:flex-row justify-between items-center gap-6 mt-10">
        <div>
          <h1 className="text-2xl text-white mb-5 items-center">
            لماذا تختارنا:
          </h1>
          <div className="grid grid-cols-2 xl:grid-cols-1 gap-x-5 gap-y-5 xl:gap-x-16">
            {whyus.map((link, index) => {
              return (
                <div className="flex flex-row gap-2 mb-4" key={index}>
                  <div className="bg-accent rounded-full w-8 h-8 text-center">
                    <PiCheck className="text-2xl font-black ml-8 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white">{link.title}</p>
                    <p className="text-gray-400 text-base">{link.discrep}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <Image width={370} height={0} alt="logo" className="mb-10" src={'/home/hero.png'}/>
        </div>
      </div>
    </div>
  );
}
