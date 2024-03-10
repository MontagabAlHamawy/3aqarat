import React from "react";
import { hom, houses } from "../components/links";
import Image from "next/image";
import Link from "next/link";

export default function Building() {
  return (
    <div className="mx-2 xl:mx-0 xl:ml-3">
      <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
        <h1 className="text-2xl">العقارات</h1>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-x-5 gap-y-5 xl:gap-x-16 xl:mb-6 mt-5 mx-10">
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
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-5 xl:gap-x-16 xl:gap-y-10 ml-5 my-5 w-full">
      {houses.map((houss, index) => {
        return (
          <Link href={houss.link} key={index} className="bg-sidpar rounded-xl ">
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
          </Link>
        );
      })}
    </div>
    </div>
  );
}
