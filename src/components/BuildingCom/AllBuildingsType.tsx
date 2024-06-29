"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import React from "react";
import { PiBuildingsDuotone } from "react-icons/pi";

export default function AllBuildingsType({ Building }: any) {
  if (!Building || Building.length === 0) {
    return (
      <div className="mx-2 my-5 ml-2 xl:ml-0 xl:mx-0">
      <div className="bg-sidpar flex flex-col gap-5 justify-center items-center h-max py-10 rounded-md">
        <div className="text-[90px]">
        <PiBuildingsDuotone/>
        </div>
        <h1 className="text-2xl">لا توجد عقارات لعرضها</h1>
      </div>
    </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-5 xl:gap-x-16 xl:gap-y-10 ml-5 my-5 w-full">
        {Building.map((building: any) => {
          const propertyType =
            building.property?.property_object?.property_type?.ar || "N/A";
          return (
            <Link
              href={`/buildings/${building.property.id}`}
              key={building.property.id}
              className="bg-sidpar rounded-xl relative"
            >
              <Image
                src={`/home/gg.jpg`}
                width={1000}
                height={0}
                alt="montagab"
                className="w-[1080px] rounded-tl-xl rounded-tr-xl"
              />
              <p className="text-lg xl:text-xl text-accent mt-2 px-2 xl:px-5">
                {building.property.title}
              </p>
              <p className="text-white text-sm font-light sm:my-2 px-2 xl:px-5">
                {building.property.description}
              </p>
              <div className="flex flex-row justify-between items-center my-3 px-5 xl:my-1 xl:mb-7">
                <p className="text-accent">{building.property.price}ل.س</p>
              </div>
              <div className="bg-accent text-white text-sm xl:text-lg px-2 py-1 rounded absolute top-2 right-2">
                {building.property.offer}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
