import Image from "next/image";
import Link from "next/link";
import React from "react";
import BuildingError from "../error/BuildingError";
import {
  ImagApartment,
  ImagBuilding,
  ImagCommercials,
  ImagHouse,
  ImagLand,
} from "../links";
import { PiInfinityDuotone, PiSpinnerGapDuotone } from "react-icons/pi";

export default function SearchBuilding({ bil }: any) {
  if (!bil) {
    return <BuildingError />;
  }
  return (
    <div>
      {bil.map((house: any) => {
        let imageSrc = ImagBuilding;

        switch (house.property_type?.en) {
          case "apartment":
            imageSrc = ImagApartment;
            break;
          case "commercialproperty":
            imageSrc = ImagCommercials;
            break;
          case "house":
            imageSrc = ImagHouse;
            break;
          case "building":
            imageSrc = ImagBuilding;
            break;
          default:
            imageSrc = ImagLand;
            break;
        }

        return (
          <Link
            href={`/propertys/${house.property.id}`}
            key={house.property.id}
            className="bg-sidpar rounded-xl flex gap-1 flex-row justify-between items-center my-3 p-1"
          >
            <div className="flex gap-1 flex-col">
              <p className="text-xl">{house.property.title}</p>
              <p className="text-sm font-thin">{house.property.description}</p>
              <div>
                <p className="text-accent">{house.property.price} ل.س</p>
              </div>
            </div>
            <div className=" relative h-24 min-w-40 flex flex-col justify-center items-center ">
              <Image
                src={
                  house.property.photos && house.property.photos.length !== 0
                    ? house.property.photos[0].photo
                    : imageSrc[0].photo
                }
                width={130}
                height={0}
                alt="house"
                className="rounded-md h-24 w-40 z-10"
              />
              <PiSpinnerGapDuotone size={20} className="text-accent z-0 absolute animate-waving-hand2 opacity-100 transform translate-y-0 duration-100" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
