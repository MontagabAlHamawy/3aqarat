"use client";
import Image from "next/image";
import Link from "next/link";
import "swiper/swiper-bundle.css";
import { PiCheck } from "react-icons/pi";

export const home = [
  { name: "منازل" },
  { name: "شقق" },
  { name: "محال تجارية" },
  { name: "أراضي" },
  { name: "محاضر" },
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
    <div className="p-0 mt-32 mx-10 h-[150vh]">
      <div className="flex justify-between items-center flex-row gap-8 ">
        <h1 className="text-white text-3xl w-[50%]">
          مرحباً بك في عالم العقارات، حيث ينتظرك منزل أحلامك. ابحث، اكتشف، واختر
          مساحتك الجميلة الآن
        </h1>
        <div className="flex justify-center items-center flex-col mt-10">
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
          width={500}
          height={0}
          alt="montagab"
          className="w-[1080px]"
        />
      </div>
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-white text-2xl my-5">الأعلا تقييماً</h1>
        <div className="flex flex-row gap-7">
          {home.map((link, index) => {
            return (
              <div
                key={index}
                className="py-1 px-5 bg-accent text-white rounded-xl cursor-pointer"
              >
                <p className="text-white text-lg">{link.name}</p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row gap-3 my-5  ">
          {house.map((houss, index) => {
            return (
              <div key={index} className="bg-sidpar rounded-xl">
                <Image
                  src={houss.img}
                  width={1000}
                  height={0}
                  alt="montagab"
                  className="w-[1080px] rounded-tl-xl rounded-tr-xl"
                />
                <p className="text-xl text-white mt-2 px-5">{houss.title}</p>
                <p className="text-white text-sm font-light px-5">{houss.discrep}</p>
                <div className="flex flex-row justify-between items-center mx-5 mb-4">
                  <p>{houss.prise}</p>
                  <div className="bg-accent text-white px-4 py-2 rounded hover:scale-110  ease-in duration-300">
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
      <div>
        <div>
          <h1>لماذا تختارنا</h1>
          <div>
          <div className="bg-accent rounded-full w-8 h-8 text-center"><PiCheck className='text-2xl font-black ml-8 text-white' /></div>
          <p>اسعار مقبولة</p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
