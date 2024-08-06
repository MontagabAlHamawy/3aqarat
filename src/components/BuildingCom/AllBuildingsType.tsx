"use client";

import Image from "next/image";
import Link from "next/link";
import BuildingError from "../error/BuildingError";
import {
  formatNumber,
  ImagApartment,
  ImagBuilding,
  ImagCommercials,
  ImagHouse,
  ImagLand,
  truncateText,
} from "../links";
import BuildingLoade from "../loade/BuildingLoade";
import { PiInfinityDuotone, PiSpinnerGapDuotone } from "react-icons/pi";

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


          const formattedNumber = formatNumber(building.property.price);
          const truncatedText = truncateText(building.property.description, 30);
          const truncatedTitle = truncateText(building.property.title, 20);

          return (
            <Link
              key={building.property.id}
              href={`/propertys/${building.property.id}`}
              className="bg-sidpar hover:bg-section rounded-xl relative flex justify-between items-start flex-col h-auto"
            >
              <div className=" relative h-40 xl:h-52 flex flex-col justify-center items-center w-full">
                <Image
                  src={imageUrl}
                  width={1000}
                  height={0}
                  alt="montagab"
                  className="w-[1080px] h-40 xl:h-52 rounded-tl-xl z-20 rounded-tr-xl"
                />
                <PiSpinnerGapDuotone size={40} className="text-accent z-10 absolute animate-waving-hand2 opacity-100 transform translate-y-0 duration-100" />
              </div>
              <div className="bg-accent text-white text-sm xl:text-lg px-2 py-1 rounded w-max mt-2 mx-2">
                {propertyType}
              </div>
              <p className="text-lg xl:text-xl text-accent mt-2 px-2 xl:px-5">
                {truncatedTitle}
              </p>
              <p className="text-white text-sm font-light sm:my-2 px-2 xl:px-5">
                {truncatedText}
              </p>
              <div className="flex flex-row justify-between items-center my-3 px-5 xl:my-1 xl:mb-7">
                <p className="text-accent">{formattedNumber} ل.س</p>
              </div>
              <div className="bg-accent z-30 text-white text-sm xl:text-lg px-2 py-1 rounded absolute top-2 right-2">
                {building.property.offer}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
