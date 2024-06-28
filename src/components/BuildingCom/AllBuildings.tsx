"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import React from "react";

export default function AllBuildings({ Building }: any) {
  if (!Building || Building.length === 0) {
    return <div>لا توجد عقارات لعرضها.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-5 xl:gap-x-16 xl:gap-y-10 ml-5 my-5 w-full">
        {Building.map((building: any) => {
          const propertyType =
            building.property_object?.property_type?.ar || "N/A";
          return (
            <Link
              href={`/buildings/${building.id}`}
              key={building.id}
              className="bg-sidpar rounded-xl relative"
            >
              <Image
                src={`/home/gg.jpg`}
                width={1000}
                height={0}
                alt="montagab"
                className="w-[1080px] rounded-tl-xl rounded-tr-xl"
              />
              <div className="bg-accent text-white text-sm xl:text-lg px-2 py-1 rounded w-max mt-2 mx-2">
                {propertyType}
              </div>
              <p className="text-lg xl:text-xl text-accent mt-2 px-2 xl:px-5">
                {building.title}
              </p>
              <p className="text-white text-sm font-light sm:my-2 px-2 xl:px-5">
                {building.description}
              </p>
              <div className="flex flex-row justify-between items-center my-3 px-5 xl:my-1 xl:mb-7">
                <p className="text-accent">{building.price}ل.س</p>
              </div>
              <div className="bg-accent text-white text-sm xl:text-lg px-2 py-1 rounded absolute top-2 right-2">
                {building.offer}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
