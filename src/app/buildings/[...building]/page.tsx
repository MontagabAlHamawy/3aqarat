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
import Slide from "@/components/Slide/Slide";
import { notFound } from "next/navigation";
import MapLoade from "@/components/map/MapLoade";
import axios from "axios";
import { SingelBuildingApi } from "@/utils/API";
import Apartment from "@/components/Buildings/apartment";
import Commercialproperty from "@/components/Buildings/commercialproperty";
import BBuilding from "@/components/Buildings/bbuilding";
import House from "@/components/Buildings/house";
import Land from "@/components/Buildings/land";
import NotFound from "@/app/not-found";

export default async function Buildin(props: any) {
  const page = props.params.building[0];

  

  const building: any = await SingelBuildingApi(page);
  if (building === null) {
    toast.error("خطاء في جلب البيانات ");
    NotFound();
  }

  let build = [
    building.address.geo_address,
    building.id,
    building.title,
    building.price,
    building.description,
    building.property_object.property_type.en,
  ];
  const type: any = building.property_object.property_type.en || null;
  // console.log(type);

  let isApartment = false;
  let isCommercialproperty = false;
  let isHouse = false;
  let isLand = false;
  let isBuilding = false;
  if (type === "apartment") {
    isApartment = true;
  }
  if (type === "commercialproperty") {
    isCommercialproperty = true;
  }
  if (type === "house") {
    isHouse = true;
  }
  if (type === "land") {
    isLand = true;
  }
  if (type === "building") {
    isBuilding = true;
  }
  return (
    <div className="mx-auto mt-[-10px] md:mt-auto">
      <div className="flex justify-center xl:justify-between  items-center w-full">
        <div className="flex flex-col xl:flex-row gap-5 items-center">
          <div className="mx-2 xl:mx-0 flex justify-center items-center">
            <Slide image={ImagBuilding} />
          </div>
          <div className="flex flex-col  gap-3 mx-2 xl:mx-0">
            <div className="flex justify-between items-center  gap-10">
              <p className="text-xl py-2 px-3 bg-accent w-min rounded-md">
                {building.offer}
              </p>
              <p className="text-lg  py-2 px-3 bg-accent w-max ml-3 rounded-md">
                {building.property_object.property_type.ar}
              </p>
            </div>
            <h1 className="text-3xl font-bold">{building.title}</h1>
            <p className="text-lg font-thin text-gray-400">
              {building.description}
            </p>
            <p className="text-xl font-thin text-accent">{building.tabu}</p>
            <div className={`${isLand ? "block" : "hidden"}`}>
              <Land building={building} />
            </div>
            <div className={`${isApartment ? "block" : "hidden"}`}>
              <Apartment building={building} />
            </div>
            <div className={`${isCommercialproperty ? "block" : "hidden"}`}>
              <Commercialproperty building={building} />
            </div>
            <div className={`${isBuilding ? "block" : "hidden"}`}>
              <BBuilding building={building} />
            </div>
            <div className={`${isHouse ? "block" : "hidden"}`}>
              <House building={building} />
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
        {/* <MapLoade building={build} /> */}
      </div>
    </div>
  );
}
