import { BuildingInfo } from "@/app/components/links";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  PiArmchairDuotone,
  PiHouseDuotone,
  PiRulerDuotone,
  PiCompassDuotone,
  PiBuildingsDuotone,
  PiMapPinDuotone,
  PiPlus,
  PiMinus,
} from "react-icons/pi";

export default function Building() {
  return (
    <div>
      <div>
        {BuildingInfo.map((link, index) => {
          return (
            <div
              key={index}
              className="flex flex-col xl:flex-row justify-center gap-5 items-center"
            >
              <div className="mx-2 xl:mx-0">
                <Image
                  src={link.image}
                  width={600}
                  height={0}
                  alt="house"
                  className=" rounded-md"
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xl py-2 px-3 bg-accent w-min rounded-md">
                  {link.display}
                </p>
                <h1 className="text-3xl font-bold">{link.title}</h1>
                <p className="text-lg font-thin text-gray-400">
                  {link.discrep}
                </p>
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-1 gap-y-5 xl:gap-x-10">
                  <div className="flex gap-2 justify-center items-center">
                    <div className="flex justify-center items-center gap-1">
                      <p className="text-accent text-lg">
                        <PiRulerDuotone />
                      </p>
                      المساحة الشقة:
                    </div>
                    <p className="text-gray-300">
                      {link.FlatSize}M<sup>2</sup>
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <div className="flex justify-center items-center gap-1 ">
                      <p className="text-accent text-lg">
                        <PiHouseDuotone />
                      </p>
                      عدد الشقق:
                    </div>
                    <p className="text-gray-300">{link.numFlat}</p>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <div className="flex justify-center items-center gap-1 ">
                      <p className="text-accent text-lg">
                        <PiCompassDuotone />
                      </p>
                      الإتجاه:
                    </div>
                    <p className="text-gray-300">{link.direction}</p>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <div className="flex justify-center items-center gap-1 ">
                      <p className="text-accent text-lg">
                        <PiBuildingsDuotone />
                      </p>
                      عدد الطوابق:
                    </div>
                    <p className="text-gray-300">{link.numFloor}</p>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <div className="flex justify-center items-center gap-1 ">
                      <p className="text-accent text-lg">
                        <PiMapPinDuotone />
                      </p>
                      الموقع:
                    </div>
                    <p className="text-gray-300">{link.place}</p>
                  </div>
                </div>
                  <p className="text-xl text-accent">{link.prise} ل.س</p>
                <div className="flex justify-between items-center mx-3 cursor-pointer">
                  <div className="flex gap-2 justify-center items-center">
                    <Image
                      src={link.imageSeller}
                      width={40}
                      height={40}
                      alt="seller"
                      className="p-1 bg-accent rounded-full"
                    />
                    <p>{link.seller}</p>
                  </div>
                  <Link
                    href={`tel://${link.sellerNum}`}
                    className="py-2 px-3 bg-accent rounded-md"
                  >
                    {link.sellerNum}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center mt-10 bg-section mx-2 xl:mx-0 xl:ml-4 rounded-md relative cursor-pointer">
        <div className="flex flex-col gap-3 absolute top-2 right-2">
          <p className="bg-body rounded-md p-2">
            <PiPlus />
          </p>
          <p className="bg-body rounded-md p-2">
            <PiMinus />
          </p>
        </div>
        <Image
          src={"/map.jpg"}
          width={900}
          height={0}
          alt="map"
          className="rounded-md"
        />
      </div>
    </div>
  );
}
