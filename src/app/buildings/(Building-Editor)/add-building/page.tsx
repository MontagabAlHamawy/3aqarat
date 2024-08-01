"use client";

import Apartment from "@/components/Add Buildings/apartment";
import BBuilding from "@/components/Add Buildings/bbuilding";
import Commercialproperty from "@/components/Add Buildings/commercialproperty";
import House from "@/components/Add Buildings/house";
import Land from "@/components/Add Buildings/land";
import { useRouter } from "next/navigation";
import React from "react";

export default function AddBuilding(props: any) {
  const router = useRouter();
  if (props.searchParams.url === null || props.searchParams.url === '') {
    router.replace("/buildings");
  }
  let isApartment = false;
  let isCommercialproperty = false;
  let isHouse = false;
  let isLand = false;
  let isBuilding = false;

  if (props.searchParams.url === "apartment") {
    isApartment = true;
  }
  if (props.searchParams.url === "commercialproperty") {
    isCommercialproperty = true;
  }
  if (props.searchParams.url === "house") {
    isHouse = true;
  }
  if (props.searchParams.url === "land") {
    isLand = true;
  }
  if (props.searchParams.url === "building") {
    isBuilding = true;
  }
  return (
    <div>
      <div>
        <h1 className="text-3xl text-accent text-center xl:text-right font-bold mb-9">
          {isApartment ? "إضافة شقة جديدة" :
            isBuilding ? "إضافة محضر جديد" :
              isHouse ? "إضافة منزل جديد" :
                isLand ? "إضافة أرض جديدة" :
                  isCommercialproperty ? "إضافة محل تجاري جديد" : ""}
        </h1>
      </div>
      {/* <div>
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
      </div> */}
    </div>
  );
}
