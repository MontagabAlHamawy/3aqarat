import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PiBuildingsDuotone } from "react-icons/pi";

export default function SearchBuilding({ bil }: any) {
  if (!bil) {
    return (
      <div className="mx-2 my-5 ml-2 xl:ml-0 xl:mx-0 xl:h-[80vh]">
        <div className="bg-sidpar flex flex-col gap-5 justify-center items-center h-max xl:h-[75vh] py-10 rounded-md">
          <div className="text-[90px]">
            <PiBuildingsDuotone />
          </div>
          <h1 className="text-2xl">لا توجد عقارات لعرضها</h1>
        </div>
      </div>
    );
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
