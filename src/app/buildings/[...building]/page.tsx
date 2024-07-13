"use client";
import {
  ImagBuilding,
  ImagApartment,
  ImagCommercials,
  ImagHouse,
  ImagLand,
} from "@/components/links";
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
import { toast } from "react-toastify";
import Link from "next/link";
import Slide from "@/components/Slide/Slide";
import MapLoade from "@/components/map/MapLoade";
import { MyProfile, SingelBuildingApi } from "@/utils/API";
import Apartment from "@/components/Buildings/apartment";
import Commercialproperty from "@/components/Buildings/commercialproperty";
import BBuilding from "@/components/Buildings/bbuilding";
import House from "@/components/Buildings/house";
import Land from "@/components/Buildings/land";
import NotFound from "@/app/not-found";
import { useEffect, useState } from "react";
import SingleBuildingLoade from "@/components/loade/SingleBuildingLoade";
import { PiPenDuotone, PiTrashDuotone } from "react-icons/pi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Buildin(props: any) {
  const page = props.params.building[0];
  const [photo, setPhoto] = useState("/user-avatar.png");
  const [building, setBuilding] = useState<any>(null);
  const [Iam, setIam] = useState<any>(false);
  const router = useRouter();
  useEffect(() => {
    if (page === undefined) {
      router.replace("/buildings");
    }
  }, []);

  useEffect(() => {
    const myData = async () => {
      const buildingData: any = await SingelBuildingApi(page);
      console.log("buildingData=", buildingData);

      if (!buildingData.id) {
        toast.error("خطاء في جلب البيانات ");
        router.replace("/not-found");
      } else {
        setBuilding(buildingData);
        setPhoto(buildingData.client.profile_photo);
        const token = Cookies.get("authToken") || false;
        if (token) {
          const ifme = await MyProfile();
          if (ifme.username === buildingData.client.username) {
            setIam(true);
          }
        } else {
          setIam(false);
        }
      }
    };
    myData();
  }, [page]);

  if (!building) {
    return <SingleBuildingLoade />;
  }
  console.log("building=", building);

  const propertyType = building.property_object?.property_type?.ar || "N/A";
  let build = [
    building.address.geo_address,
    building.id,
    building.title,
    building.price,
    building.description,
    building.property_object?.property_type?.en,
    building.photos,
  ];
  const type = building.property_object?.property_type?.en || null;
  let isApartment = false;
  let isCommercialproperty = false;
  let isHouse = false;
  let isLand = false;
  let isBuilding = false;
  let linked = "buildings";
  let imagee = ImagBuilding;

  if (type === "apartment") {
    isApartment = true;
    linked = "apartments";
    imagee = ImagApartment;
  }
  if (type === "commercialproperty") {
    isCommercialproperty = true;
    linked = "commercials";
    imagee = ImagCommercials;
  }
  if (type === "house") {
    isHouse = true;
    linked = "houses";
    imagee = ImagHouse;
  }
  if (type === "land") {
    isLand = true;
    linked = "lands";
    imagee = ImagLand;
  }
  if (type === "building") {
    isBuilding = true;
    linked = "buildings";
    imagee = ImagBuilding;
  }
  if (photo === null) {
    setPhoto("/user-avatar.png");
  }
  const isoDate = building.created_at;
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const formattedDate = `${hours}:${minutes} ${year}/${month}/${day} `;

  return (
    <div className=" mt-[-10px] md:mt-auto">
      <div className="flex flex-col xl:flex-row justify-start items-start xl:items-center mr-5 xl:mr-0 gap-3">
        <Link
          href={`/buildings/edit-building?url=${building.id}`}
          className={`${
            Iam ? "flex justify-start items-center gap-2" : "hidden"
          } mt-[-10px] xl:mt-0 mb-5 xl:mb-0  bg-accent w-max py-2 px-3 rounded-md`}
        >
          <PiPenDuotone size={24} />
          <p>تعديل معلومات العقار</p>
        </Link>
        <div
          className={`${
            Iam ? "flex justify-start items-center gap-2" : "hidden"
          } mt-[-10px] xl:mt-0 mb-5 xl:mb-0  cursor-pointer bg-red-600 w-max py-2 px-3 rounded-md`}
        >
          <PiTrashDuotone size={24} />
          <p>حذف العقار</p>
        </div>
      </div>
      <div className="flex justify-center xl:justify-between  items-center w-full">
        <div className="flex flex-col justify-center xl:flex-row gap-10 items-center w-full">
          <div className="mx-2 xl:mx-0 flex justify-center items-center">
            <Slide
              image={building.photos.length !== 0 ? building.photos : imagee}
            />
          </div>
          <div className="flex flex-col  gap-3 mx-2 xl:mx-0">
            <div className="flex justify-between items-center  gap-10">
              <p className="text-xl py-2 px-3 bg-accent w-min rounded-md">
                {building.offer}
              </p>
              <Link href={`/buildings/${linked}`}>
                <p className="text-lg  py-2 px-3 bg-accent w-max ml-3 rounded-md">
                  {propertyType}
                </p>
              </Link>
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
            <div className="flex justify-between items-center">
              <p className="text-xl text-accent">{building.price} ل.س</p>
              <p className="text-lg font-thin text-gray-400">{formattedDate}</p>
            </div>
            <div className="flex justify-between items-center mx-[-5px] xl:mx-3 cursor-pointer">
              <Link href={`/account/${building.client.username}`}>
                <div className="flex gap-1 xl:gap-2 justify-center items-center">
                  <Image
                    src={photo}
                    width={40}
                    height={40}
                    alt="seller"
                    className="w-10 h-10 p-1 bg-accent rounded-full"
                  />
                  <p>
                    {building.client.first_name} {building.client.last_name}
                  </p>
                </div>
              </Link>
              <Link
                href={`tel://${building.client.phone_number}`}
                className={`py-2 px-3 bg-accent rounded-md ${
                  building.client.phone_number ? "block" : "hidden"
                }`}
              >
                {building.client.phone_number}
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
