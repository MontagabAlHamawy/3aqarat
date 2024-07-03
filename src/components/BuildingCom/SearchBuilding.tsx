import Image from "next/image";
import Link from "next/link";
import React from "react";
import BuildingError from "../error/BuildingError";
import { ImagApartment, ImagBuilding, ImagCommercials, ImagHouse, ImagLand } from "../links";

export default function SearchBuilding({ bil }: any) {
  if (!bil) {
    return <BuildingError />;
  }
  
  return (
    <div>
      {bil.map((house: any) => {
        let imagee = ImagBuilding;

        if (house.property_object?.property_type?.en === "apartment") {
          imagee = ImagApartment;
        } else if (
          house.property_object?.property_type?.en === "commercialproperty"
        ) {
          imagee = ImagCommercials;
        } else if (house.property_object?.property_type?.en === "house") {
          imagee = ImagHouse;
        } else if (house.property_object?.property_type?.en === "building") {
          imagee = ImagBuilding;
        } else {
          imagee = ImagLand;
        }
        return (
          <Link
            href={`/buildings/${house.id}`}
            key={house.id}
            className="bg-sidpar rounded-xl flex flex-row justify-between items-center my-3 p-1"
          >
            <div className="flex gap-1 flex-col">
              <p className="text-xl">{house.title}</p>
              <p className="text-sm font-thin">{house.description}</p>
              <div>
                <p className="text-accent">{house.price}ل.س</p>
              </div>
            </div>
            <div>
              <Image
                src={
                  house.photos.length !== 0
                    ? house.photos[0].photo
                    : imagee[0].photo
                }
                width={130}
                height={0}
                alt="house"
                className="rounded-md h-24 w-40"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
