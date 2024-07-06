"use client";

import NotFound from "@/app/not-found";
import Apartment from "@/components/Edit Buildings/apartment";
import BBuilding from "@/components/Edit Buildings/bbuilding";
import Commercialproperty from "@/components/Edit Buildings/commercialproperty";
import House from "@/components/Edit Buildings/house";
import Land from "@/components/Edit Buildings/land";
import SingleBuildingLoade from "@/components/loade/SingleBuildingLoade";
import { SingelBuildingApi } from "@/utils/API";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditBuilding(props: any) {
  const page = props.searchParams.url;
  const [building, setBuilding] = useState<any>(null);

  useEffect(() => {
    const myData = async () => {
      const buildingData: any = await SingelBuildingApi(page);
      if (buildingData === null) {
        toast.error("خطاء في جلب البيانات ");
        NotFound();
      } else {
        setBuilding(buildingData);
      }
    };
    myData();
  }, [page]);

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
    <div>
      <div className={`${isLand ? "block" : "hidden"}`}>
        <Land building={building} />
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
  );
}
