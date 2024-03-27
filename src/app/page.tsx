"use client";
import Image from "next/image";
import Link from "next/link";
import "swiper/swiper-bundle.css";
import { PiCheck } from "react-icons/pi";
import { house, whyus, hom } from "./components/links";
import Footer from "./components/Footer";
import { link } from "fs";

export default function Home() {
  return (
    <div className="mt-14 xl:mt-32 m-0  px-4 xl:px-10 h-full z-40">
      <div className="flex justify-between items-center flex-col xl:flex-row gap-4 xl:gap-8 ">
        <h1 className="text-white  text-lg text-center xl:text-right font-semibold xl:font-medium xl:text-2xl w-full xl:w-[50%]">
          سواء كانت المرة الاولى لك في شراء عقار او اذا كنت احد المستثمرين
          العقاريين الذين يتمتعون بخبرة ف بلا شك ان{" "}
          <span className="text-accent">3aqarat</span> سوف تقوم بارشادك بكل خطوة
          لضمان حصولك على تجربة عقارية ناجحة والحصول على رضاك
        </h1>
        <div className="flex justify-center  items-center flex-col  xl:mt-10">
          <p className="mb-10 text-center xl:text-right text-base xl:text-xl">
            خدمات فريدة تميزنا عن غيرنا{" "}
            <span className="text-accent">3aqarat</span> من شأنها ان تساعدك في
            مهمتك وتجعل الأمر أكثر مرونة
          </p>
          <Link href={"/buildings"}>
            <div className="bg-accent text-white px-4 py-2 rounded hover:scale-110  ease-in duration-300">
              عرض العقارات
            </div>
          </Link>
        </div>
      </div>
      <div className=" p-2 mt-16 bg-section rounded-xl flex justify-center items-center">
        <Image
          src={"/home/wer.png"}
          width={1200}
          height={0}
          alt="logo"
          className=" rounded-xl hidden md:block"
        />
        <Image
          src={"/home/wer2.jpg"}
          width={600}
          height={0}
          alt="logo"
          className=" rounded-xl block md:hidden "
        />
      </div>
      <div className="flex justify-center items-center flex-col ">
        <h1 className="text-white text-2xl my-5">الأحدث</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-x-5 gap-y-5 xl:gap-x-16 xl:mb-6">
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
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-5 xl:gap-x-16 xl:gap-y-10 my-5 w-full">
          {house.map((houss, index) => {
            return (
              <Link
                href={houss.link}
                key={index}
                className="bg-sidpar rounded-xl relative "
              >
                <Image
                  src={houss.img}
                  width={1000}
                  height={0}
                  alt="montagab"
                  className="w-[1080px] rounded-tl-xl rounded-tr-xl"
                />
                <p className="text-lg xl:text-xl text-accent mt-2 px-2 xl:px-5">
                  {houss.title}
                </p>
                <p className="text-white text-sm font-light sm:my-2 px-2 xl:px-5">
                  {houss.discrep}
                </p>
                <div className="flex flex-row justify-between items-center my-3 xl:my-1 mx-5 mb-4">
                  <p>{houss.prise}</p>
                </div>
                <div className="bg-accent text-white text-sm xl:text-lg px-2 py-1 rounded absolute top-2 right-2">
                  {houss.display}
                </div>
              </Link>
            );
          })}
        </div>
        <Link href={"/buildings"}>
          <div className="bg-accent text-white px-4 py-2 rounded hover:scale-110  ease-in duration-300">
            عرض المزيد
          </div>
        </Link>
      </div>
      <div className="flex flex-col xl:flex-row justify-between items-center gap-3 mt-10">
        <div>
          <h1 className="text-2xl text-white mb-5 items-center">المميزات</h1>
          <div className="grid grid-cols-2 xl:grid-cols-1 gap-x-5 gap-y-5 xl:gap-x-16">
            {whyus.map((link, index) => {
              return (
                <div className="flex flex-row gap-2 mb-4" key={index}>
                  <div className="bg-accent rounded-full w-8 h-8 text-center">
                    <PiCheck className="text-2xl font-black ml-8 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white text-lg">{link.title}</p>
                    <p className="text-gray-400 text-base">{link.discrep}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <Image
            width={400}
            height={0}
            alt="logo"
            className="mb-10"
            src={"/home/hero.png"}
          />
        </div>
      </div>
    </div>
  );
}
