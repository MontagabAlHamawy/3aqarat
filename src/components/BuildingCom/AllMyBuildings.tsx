"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  ImagApartment,
  ImagBuilding,
  ImagCommercials,
  ImagHouse,
  ImagLand,
} from "../links";
import BuildingError from "../error/BuildingError";
import { PiInfinityDuotone, PiPenDuotone, PiTrashDuotone } from "react-icons/pi";
import { handleDeleteBuilding } from "../sweetalert/handleDeleteBuilding";
import { useRouter } from "next/navigation";

export default function AllMyBuildings({ Building }: any) {
  const router = useRouter();
  if (!Building || Building.length === 0) {
    return <BuildingError />;
  }

  return (
    <div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-5 xl:gap-x-16 xl:gap-y-10 ml-5 my-5 w-full">
        {Building.map((building: any) => {
          function handleDelete() {
            handleDeleteBuilding(building.id, () => {
              router.replace("/account");
            });
          }
          const propertyType =
            building.property_object?.property_type?.ar || "N/A";
          const type = building.property_object?.property_type?.en || null;
          let imagee = ImagBuilding;

          if (type === "apartment") {
            imagee = ImagApartment;
          }
          if (type === "commercialproperty") {
            imagee = ImagCommercials;
          }
          if (type === "house") {
            imagee = ImagHouse;
          }
          if (type === "land") {
            imagee = ImagLand;
          }
          if (type === "building") {
            imagee = ImagBuilding;
          }
          return (
            <div
              key={building.id}
              className="bg-body hover:bg-section  rounded-xl relative flex justify-between items-start flex-col h-auto"
            >
              <Link href={`/buildings/${building.id} `} className="h-36 xl:h-48 relative flex justify-center items-center w-full">
                <Image
                  src={
                    building.photos.length !== 0
                      ? building.photos[0].photo
                      : imagee[0].photo
                  }
                  width={1000}
                  height={0}
                  alt="montagab"
                  className="w-[1080px] z-20 h-36 xl:h-48 rounded-tl-xl rounded-tr-xl"
                />
                <PiInfinityDuotone size={40} className="text-accent z-10 absolute animate-waving-hand2 opacity-100 transform translate-y-0 duration-100"/>
              </Link>
              <Link href={`/buildings/${building.id}`}>
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
                <div className="bg-accent z-30 text-white text-sm xl:text-lg px-2 py-1 rounded absolute top-2 right-2">
                  {building.offer}
                </div>
              </Link>
              <div className="flex justify-between xl:justify-start w-full items-center gap-4">
                <Link
                  href={`/buildings/edit-building?url=${building.id}`}
                  className={`flex mb-5 mx-2 justify-start items-center gap-2 bg-accent w-max py-2 px-3 rounded-md`}
                >
                  <PiPenDuotone size={20} />
                </Link>
                <div
                  className={`flex mb-5 mx-2 cursor-pointer justify-start items-center gap-2 bg-red-600 w-max py-2 px-3 rounded-md`}
                  onClick={handleDelete}
                >
                  <PiTrashDuotone size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
