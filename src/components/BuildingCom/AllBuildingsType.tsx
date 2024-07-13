"use client";

import Image from "next/image";
import Link from "next/link";
import BuildingError from "../error/BuildingError";
import {
  ImagApartment,
  ImagBuilding,
  ImagCommercials,
  ImagHouse,
  ImagLand,
} from "../links";
import BuildingLoade from "../loade/BuildingLoade";

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

          return (
            <Link
              key={building.property.id}
              href={`/buildings/${building.property.id}`}
              className="bg-sidpar hover:bg-section rounded-xl relative flex justify-between items-start flex-col h-auto"
            >
              <Image
                src={imageUrl}
                width={1000}
                height={0}
                alt="montagab"
                className="w-[1080px] h-36 xl:h-48 rounded-tl-xl rounded-tr-xl"
              />
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
          );
        })}
      </div>
    </div>
  );
}
