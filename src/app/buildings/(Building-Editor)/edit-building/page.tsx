"use client";

import NotFound from "@/app/not-found";
import Apartment from "@/components/Edit Buildings/apartment";
import BBuilding from "@/components/Edit Buildings/bbuilding";
import Commercialproperty from "@/components/Edit Buildings/commercialproperty";
import House from "@/components/Edit Buildings/house";
import Land from "@/components/Edit Buildings/land";
import SingleBuildingLoade from "@/components/loade/SingleBuildingLoade";
import { GetToken, MyProfile, SingelBuildingApi } from "@/utils/API";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function EditBuilding(props: any) {

  const page = props.searchParams.url;
  const token = GetToken();
  const [building, setBuilding] = useState<any>(null);
  const router = useRouter();
  const [warning, SetWarning] = useState(false)
  useEffect(() => {
    if (page === null || page === '' || page === undefined) {
      toast.error("حدث خطأ أثناء جلب البيانات");
      router.replace("/buildings");
    }
  }, [page, router]);
  useEffect(() => {
    const myData = async () => {
      try {
        const buildingData: any = await SingelBuildingApi(page);
        const token = Cookies.get("authToken") || false;
        if (buildingData === null || buildingData === undefined || buildingData === '') {
          SetWarning(true);
          NotFound();
        } else {
          if (token) {
            const ifme = await MyProfile();
            if (ifme.username !== buildingData.client.username) {
              router.replace(`/buildings/${page}`);
            }
          } else {
            router.replace(`/login?url=buildings/${page}`);
          }
          setBuilding(buildingData);
        }
      } catch (error) {
        SetWarning(true)
        router.replace("/buildings");
      }
    };
    myData();
    if (warning) {
      toast.error("لا يمكن تعديل معلومات هذا العقار");
    }
  }, [page, router, warning]);
  if (!building) {
    return <SingleBuildingLoade />;
  }

  const type = building.property_object?.property_type?.en || null;
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
    <>
      <div className={`relative ${token ? "hidden" : ""}`}><SingleBuildingLoade /></div>
      <div className={`relative ${token ? "" : "hidden"}`}>
        <div>
          <h1 className="text-3xl text-accent text-center xl:text-right font-bold mb-9">
            تعديل معلومات العقار
          </h1>
        </div>
        <div>
          <div className={`${isLand ? "block" : "hidden"}`}>
            <Land apartment={building} />
          </div>
          <div className={`${isApartment ? "block" : "hidden"}`}>
            <Apartment apartment={building} />
          </div>
          <div className={`${isCommercialproperty ? "block" : "hidden"}`}>
            <Commercialproperty apartment={building} />
          </div>
          <div className={`${isBuilding ? "block" : "hidden"}`}>
            <BBuilding building={building} />
          </div>
          <div className={`${isHouse ? "block" : "hidden"}`}>
            <House apartment={building} />
          </div>
        </div>
      </div>
    </>
  );
}
