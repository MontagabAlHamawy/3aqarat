"use client";

import Loading from "@/app/loading";
import Apartment from "@/components/Add Buildings/apartment";
import BBuilding from "@/components/Add Buildings/bbuilding";
import Commercialproperty from "@/components/Add Buildings/commercialproperty";
import House from "@/components/Add Buildings/house";
import Land from "@/components/Add Buildings/land";
import { GetToken } from "@/utils/API";
import { useRouter } from "next/navigation";
import React from "react";

export default function AddBuilding(props: any) {
  const router = useRouter();
  const token = GetToken();
  if (!token) {
    router.replace(`/login?url=propertys/add-property?url=${props.searchParams.url}`);
  }
  if (props.searchParams.url === null || props.searchParams.url === '' || props.searchParams.url === undefined || props.searchParams.url === 'undefined') {
    router.replace("/propertys");
  }
  let isApartment = false;
  let isCommercialproperty = false;
  let isHouse = false;
  let isLand = false;
  let isBuilding = false;

  if (props.searchParams.url === "apartment") {
    isApartment = true;
  }
  else if (props.searchParams.url === "commercialproperty") {
    isCommercialproperty = true;
  }
  else if (props.searchParams.url === "house") {
    isHouse = true;
  }
  else if (props.searchParams.url === "land") {
    isLand = true;
  }
  else if (props.searchParams.url === "building") {
    isBuilding = true;
  } else {
    router.replace("/propertys");
  }
  return (
    <>
      <div className={`relative ${token ? "hidden" : ""}`}><Loading /></div>
      <div className={`relative ${token ? "" : "hidden"}`}>
        <div>
          <h1 className="text-3xl text-accent text-center xl:text-right font-bold mb-9">
            {isApartment ? "إضافة شقة جديدة" :
              isBuilding ? "إضافة محضر جديد" :
                isHouse ? "إضافة منزل جديد" :
                  isLand ? "إضافة أرض جديدة" :
                    isCommercialproperty ? "إضافة محل تجاري جديد" : ""}
          </h1>
        </div>
        <div>
        <div className={`${isLand ? "block" : "hidden"}`}>
          <Land />
        </div>
        <div className={`${isApartment ? "block" : "hidden"}`}>
          <Apartment />
        </div>
        <div className={`${isCommercialproperty ? "block" : "hidden"}`}>
          <Commercialproperty />
        </div>
        <div className={`${isBuilding ? "block" : "hidden"}`}>
          <BBuilding />
        </div>
        <div className={`${isHouse ? "block" : "hidden"}`}>
          <House />
        </div>
      </div>
      </div>
    </>
  );
}
