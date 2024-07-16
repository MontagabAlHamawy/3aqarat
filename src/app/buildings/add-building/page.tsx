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
  if (props.searchParams.url === undefined) {
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
          إضافة عقار جديد
        </h1>
      </div>
      <div>
        <div className={`${isLand ? "block" : "hidden"}`}>
          <Land apartment />
        </div>
        <div className={`${isApartment ? "block" : "hidden"}`}>
          <Apartment apartment />
        </div>
        <div className={`${isCommercialproperty ? "block" : "hidden"}`}>
          <Commercialproperty apartment />
        </div>
        <div className={`${isBuilding ? "block" : "hidden"}`}>
          <BBuilding building />
        </div>
        <div className={`${isHouse ? "block" : "hidden"}`}>
          <House apartment />
        </div>
      </div>
    </div>
  );
}
