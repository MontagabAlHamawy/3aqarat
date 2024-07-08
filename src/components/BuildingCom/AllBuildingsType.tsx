"use client";

import Image from "next/image";
import Link from "next/link";

import React, { useEffect, useState } from "react";

import BuildingError from "../error/BuildingError";
import {
  ImagApartment,
  ImagBuilding,
  ImagCommercials,
  ImagHouse,
  ImagLand,
} from "../links";
import BuildingLoade from "../loade/BuildingLoade";
import { MyProfile } from "@/utils/API";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { PiPenDuotone, PiTrashDuotone } from "react-icons/pi";

export default function AllBuildingsType({ Building }: any) {
  if (!Building || Building.length === 0) {
    return <BuildingError />;
  }
  if (Building === undefined) {
    return <BuildingLoade />;
  }

  return (
    <div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-5 xl:gap-x-16 xl:gap-y-10 ml-5 my-5 w-full">
        {Building.map((building: any) => {
          // const [Iam, setIam] = useState<any>(false);
          // const token = Cookies.get("authToken") || false;

          // useEffect(() => {
          //   if (token) {
          //     const myData = async () => {
          //       try {
          //         const ifme = await MyProfile();
          //         if (ifme.username === building.property.client.username)
          //           setIam(true);
          //       } catch (error) {
          //         toast.error("خطاء في جلب البانات");
          //       }
          //     };
          //     myData();
          //   }
          // }, [building]);
          const propertyType = building.property_type?.ar || "N/A";
          const type = building?.property_type?.en || null;

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

          const imageUrl =
            building.property.photos && building.property.photos.length !== 0
              ? building.property.photos[0].photo
              : imagee[0].photo;

          return (
            <div
              key={building.property.id}
              className="bg-sidpar rounded-xl relative"
            >
              <Link href={`/buildings/${building.property.id}`}>
                <Image
                  src={imageUrl}
                  width={1000}
                  height={0}
                  alt="montagab"
                  className="w-[1080px] h-36 xl:h-48 rounded-tl-xl rounded-tr-xl"
                />
              </Link>
              <Link href={`/buildings/${building.property.id}`}>
                <div className="bg-accent text-white text-sm xl:text-lg px-2 py-1 rounded w-max mt-2 mx-2">
                  {propertyType}
                </div>
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
              {/* <div
                className={`${
                  Iam ? "flex justify-start items-center gap-4" : "hidden"
                } `}
              >
                <Link
                  href={`/buildings/edit-building?url=${building.id}`}
                  className={`flex mb-5 mx-2 justify-start items-center gap-2 bg-accent w-max py-2 px-3 rounded-md`}
                >
                  <PiPenDuotone size={20} />
                </Link>
                <div
                  className={`flex mb-5 mx-2 justify-start items-center gap-2 bg-red-600 w-max py-2 px-3 rounded-md`}
                >
                  <PiTrashDuotone size={20} />
                </div>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
