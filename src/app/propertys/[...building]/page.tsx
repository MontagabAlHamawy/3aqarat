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
import { GetToken, MyProfile, SingelBuildingApi } from "@/utils/API";
import Apartment from "@/components/Buildings/apartment";
import Commercialproperty from "@/components/Buildings/commercialproperty";
import BBuilding from "@/components/Buildings/bbuilding";
import House from "@/components/Buildings/house";
import Land from "@/components/Buildings/land";
import { useEffect, useRef, useState } from "react";
import SingleBuildingLoade from "@/components/loade/SingleBuildingLoade";
import { PiGearSixDuotone, PiPenDuotone, PiTrashDuotone, PiPhoneDuotone, PiUserDuotone, PiSpinnerGapDuotone } from "react-icons/pi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { handleDeleteBuilding } from "@/components/sweetalert/handleDeleteBuilding";
import NotFound from "@/app/not-found";
import BuildingContent from "@/components/Buildings/BuildingContent";
import BuildingSContent from "@/components/Buildings/BuildingSContent";

export default function Buildin(props: any) {
  const page = props.params.building[0];
  const [photo, setPhoto] = useState(true);
  const [building, setBuilding] = useState<any>(null);
  const [Iam, setIam] = useState<any>(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [warning, SetWarning] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const token = GetToken();
  useEffect(() => {
    if (page === undefined) {
      router.replace("/propertys");
    }
  }, [page, router]);

  useEffect(() => {
    const myData = async () => {
      try {
        const buildingData: any = await SingelBuildingApi(page);
        if (!buildingData.id) {
          SetWarning(true)
          NotFound();
        } else {
          setBuilding(buildingData);
          setPhoto(true);
          if (buildingData.client.profile_photo === null) {
            setPhoto(false)
          }
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
      } catch (error) {
        SetWarning(true)
        NotFound();
      } finally {
        setLoading(false);
      }
    };
    myData();
    if (warning) {
      toast.error("هذا العقار غير موجود أو تم حذفه");
    }
  }, [page, router, warning]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);


  if (loading) {
    return <SingleBuildingLoade />;
  }
  if (warning) {
    return (
      <NotFound />
    )
  }

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

  const isoDate = building.created_at;
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const formattedDate = `${hours}:${minutes} ${year}/${month}/${day} `;

  function handleDelete() {
    handleDeleteBuilding(building.id, () => {
      router.replace("/propertys");
    });
  }
  function formatNumber(num: number): string {
    const numStr = num.toString();
    const formattedNumStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedNumStr;
  }
  const number = building.price;
  const formattedNumber = formatNumber(number);

  return (
    <div className="mt-[20px] xl:mt-10 relative">
      <div className="absolute z-20 top-[-50px] xl:top-[-40px] left-2">
        {Iam && (
          <div className="relative" ref={menuRef}>
            <div
              className="bg-accent relative p-2 text-xl rounded-md hover:sidpar focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <PiGearSixDuotone />
            </div>
            {menuOpen && (
              <div className="absolute flex flex-col gap-2 top-0 left-10 p-2 bg-sidpar w-max rounded-md shadow-lg">
                <Link
                  href={`/propertys/edit-property?url=${building.id}`}
                  className="flex items-center gap-2 px-4 py-2   rounded-md bg-body hover:bg-accent"
                >
                  <PiPenDuotone size={24} />
                  <p>تعديل العقار</p>
                </Link>
                <div
                  className="flex items-center gap-2 px-4 py-2  cursor-pointer  rounded-md bg-body hover:bg-red-600"
                  onClick={handleDelete}
                >
                  <PiTrashDuotone size={24} />
                  <p>حذف العقار</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-center xl:justify-between items-center w-full mt-5">
        <div className="flex flex-col justify-center xl:flex-row gap-10 items-center w-full">
          <div className="mx-2 xl:mx-0 flex justify-center items-center">
            <Slide
              image={building.photos.length !== 0 ? building.photos : imagee}
            />
          </div>
          <div className="flex flex-col gap-3 mx-2 xl:mx-0">
            <div className="flex justify-between items-center gap-10">
              <p className="text-xl py-2 px-3 bg-accent w-min rounded-md">
                {building.offer}
              </p>
              <Link href={`/propertys/${linked}`}>
                <p className="text-lg py-2 px-3 bg-accent w-max ml-3 rounded-md">
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
              <p className="text-xl text-accent">{formattedNumber} ل.س</p>
              <p className="text-lg font-thin text-gray-400">{formattedDate}</p>
            </div>
            <div className="flex justify-between items-center mx-[-5px] xl:mx-3 cursor-pointer">
              <Link href={`/account/${building.client.username}`}>
                <div className="flex gap-2 xl:gap-2 justify-center items-center">
                  <div className={`${photo ? "" : "hidden"} rounded-md bg-sidpar relative flex flex-col justify-center items-center w-10 h-10`}>
                    <Image
                      src={photo ? building.client.profile_photo : "/"}
                      width={40}
                      height={40}
                      alt="seller"
                      className={`rounded-md z-20 w-full h-full`}
                    />
                    <PiSpinnerGapDuotone size={20} className="text-accent z-10  absolute animate-waving-hand2 opacity-100 transform translate-y-0 duration-100" />
                  </div>
                  <div className={`rounded-md text-accent flex justify-center items-center w-[40px] h-[40px]  bg-sidpar ${photo ? "hidden" : ""}`}>
                    <PiUserDuotone size={24} />
                  </div>
                  <div className="flex flex-col justify-start items-start font-medium">
                    <p>
                      {building.client.first_name} {building.client.last_name}
                    </p>
                    <p className="text-sm text-neutral-400 font-light">
                      {building.client.username}@
                    </p>
                  </div>
                </div>
              </Link>
              <Link
                href={`tel://${building.client.phone_number}`}
                className={`cursor-pointer text-2xl bg-accent rounded-md p-2 ${building.client.phone_number && token ? "block" : "hidden"
                  }`}
              >
                <PiPhoneDuotone />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10 mx-2 xl:mx-0 xl:ml-4 rounded-md relative cursor-pointer">
        <MapLoade building={build} />
      </div>
      <div className={`${isBuilding ? "hidden" : "hidden"}`}>
        <h1 className="text-base xl:text-xl mt-10 bg-sidpar xl:mr-[-8px] rounded-t-md py-2 px-3 w-max">
          الموجودة ضمن العقار
        </h1>
        <div className="bg-sidpar rounded-b-md rounded-tl-md py-10 gap-x-5 gap-y-5 xl:gap-x-10 xl:gap-y-10 w-full px-4 xl:mx-[-8px]">
          <BuildingContent property={building} />
        </div>
      </div>
      <div className={`${isBuilding ? "block" : "block"} `}>
        <h1 className="text-base xl:text-xl mt-10 bg-sidpar xl:mr-[-8px] rounded-t-md py-2 px-3 w-max">
          عقارات مشابها
        </h1>
        <div className="bg-sidpar rounded-b-md rounded-tl-md py-10 gap-x-5 gap-y-5 xl:gap-x-10 xl:gap-y-10 w-full px-4 xl:mx-[-8px]">
          <BuildingSContent property={building} />
        </div>
      </div>
    </div>
  )
}
