"use client";
import React, { useState } from "react";
import { hom, houses } from "../../components/links";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

export default function Building() {
  const [filterType, setFilterType] = useState("all");
  return (
    <div className="mx-2 xl:mx-0 xl:ml-3">
      <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
        <h1 className="text-2xl">العقارات</h1>
      </div>
      <div className="grid grid-cols-3 mt-7 md:grid-cols-7 xl:grid-cols-7 gap-x-2 gap-y-5 md:gap-x-3 xl:gap-x-10 xl:mb-6">
      {hom.map((link, index) => {
            return (
              <div
                key={index}
                className={`py-1 px-5  text-md w-full text-white rounded-xl flex justify-center items-center cursor-pointer
              ${filterType === `${link.type}` ? "bg-accent" : "bg-sidpar"}`}
                onClick={() => setFilterType(`${link.type}`)}
              >
                <p className="text-white text-sm md:text-base xl:text-lg">{link.name}</p>
              </div>
            );
          })}
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-5  gap-y-5 xl:gap-x-16 xl:gap-y-10 ml-5 my-5 w-full">
        {houses
          .filter((dd) => filterType === "all" || dd.type === filterType)
          .map((houss, index) => {
            return (
              <Link
                href={houss.link}
                key={index}
                className="bg-sidpar rounded-xl relative"
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
    </div>
  );
}
