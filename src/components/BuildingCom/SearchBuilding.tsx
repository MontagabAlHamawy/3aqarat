import Image from "next/image";
import Link from "next/link";
import React from "react";
import BuildingError from "../error/BuildingError";

export default function SearchBuilding({ bil }: any) {
  if (!bil) {
    return <BuildingError />;
  }
  return (
    <div>
      {bil.map((house: any) => {
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
                src={`/home/gg.jpg`}
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
