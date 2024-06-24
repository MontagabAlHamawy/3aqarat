import { BuildingInfo, ImagBuilding } from "@/components/links";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/virtual";
import "swiper/css/keyboard";
import "swiper/css/mousewheel";
import "swiper/css/pagination";
import "swiper/css/parallax";
import "swiper/css/autoplay";
import "swiper/css/grid";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/zoom";
import "swiper/css/thumbs";
import {
  PiRulerDuotone,
  PiCompassDuotone,
  PiBuildingsDuotone,
  PiMapPinDuotone,
  PiArmchairDuotone,
} from "react-icons/pi";
import dynamic from "next/dynamic";
import apiUrl from "@/utils/apiConfig";
import { toast } from "react-toastify";
import Link from "next/link";
import Slide from "@/components/Slide";
import { notFound } from "next/navigation";
import MapLoade from "@/components/MapLoade";
import axios from "axios";
import { SingelBuildingApi } from "@/utils/API";

const Maps = dynamic(() => import("@/components/maps"), { ssr: false });

export default async function Buildin(props: any) {
  const page = props.params.building[0];

  const building: any = await SingelBuildingApi(page);
  
  if (!building) {
    toast.error("خطاء في جلب البيانات ");
  }
  console.log(building);
  
  let build = [
    building.address.geo_address,
    building.id,
    building.title,
    building.price,
    building.description,
    building.property_object.property_type,
  ];
  return (
    <div className="mx-auto mt-[-10px] md:mt-auto">
      <div className="flex justify-center xl:justify-between  items-center w-full">
        <div className="flex flex-col xl:flex-row gap-5 items-center">
          <div className="mx-2 xl:mx-0 flex justify-center items-center">
            <Slide image={ImagBuilding} />
          </div>
          <div className="flex flex-col gap-3 mx-2 xl:mx-0">
            <div className="flex justify-between xl:justify-start items-center gap-10">
              <p className="text-xl py-2 px-3 bg-accent w-min rounded-md">
                {building.offer}
              </p>
              <p className="text-xl py-2 px-3 bg-accent w-min rounded-md">
                {building.property_object.property_type}
              </p>
            </div>
            <h1 className="text-3xl font-bold">{building.title}</h1>
            <p className="text-lg font-thin text-gray-400">
              {building.description}
            </p>
            <p className="text-xl font-thin text-accent">
              {building.tabu}
            </p>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-5 xl:gap-x-16">
              <div className="flex gap-2">
                <div className="flex justify-center items-center gap-1">
                  <p className="text-accent text-lg">
                    <PiRulerDuotone />
                  </p>
                  المساحة:
                </div>
                <p className="text-gray-300">
                  {building.area}M<sup>2</sup>
                </p>
              </div>
              <div className="flex gap-2">
                <div className="flex justify-center items-center gap-1">
                  <p className="text-accent text-lg">
                    <PiArmchairDuotone />
                  </p>
                  عدد الغرف:
                </div>
                <p className="text-gray-300">
                  {building.property_object.number_of_rooms}
                </p>
              </div>
              <div className="flex gap-2">
                <div className="flex justify-center items-center gap-1">
                  <p className="text-accent text-lg">
                    <PiCompassDuotone />
                  </p>
                  الإتجاه:
                </div>
                <p className="text-gray-300">
                  {building.property_object.direction}
                </p>
              </div>
              <div className="flex gap-2">
                <div className="flex justify-center items-center gap-1">
                  <p className="text-accent text-lg">
                    <PiBuildingsDuotone />
                  </p>
                  الطابق:
                </div>
                <p className="text-gray-300">
                  {building.property_object.floor_number}
                </p>
              </div>
              <div className="flex gap-2 w-max max-w-80 xl:max-w-96">
                <div className="flex justify-center items-center gap-1">
                  <p className="text-accent text-lg">
                    <PiMapPinDuotone />
                  </p>
                  الموقع:
                </div>
                <p className="text-gray-300 w-full">
                  {building.address.city.name} /{" "}
                  {building.address.region} /{" "}
                  {building.address.street} /{" "}
                  {building.address.description}
                </p>
              </div>
            </div>
            <p className="text-xl text-accent">{building.price} ل.س</p>
            <div className="flex justify-between items-center mx-3 cursor-pointer">
              <div className="flex gap-2 justify-center items-center">
                <Image
                  src={"/6.png"}
                  width={40}
                  height={40}
                  alt="seller"
                  className="p-1 bg-accent rounded-full"
                />
                <p>{building.seller}</p>
              </div>
              <Link
                href={`tel://00963997867735`}
                className="py-2 px-3 bg-accent rounded-md"
              >
                00963997867735
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10 mx-2 xl:mx-0 xl:ml-4 rounded-md relative cursor-pointer">
        <MapLoade building={build} />
      </div>
    </div>
  );
}
