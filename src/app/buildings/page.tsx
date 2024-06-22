
import React, { useState } from "react";
import { hom, houses } from "../../components/links";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import apiUrl from "@/utils/apiConfig";
import { toast } from "react-toastify";
import BuildingFilter from "@/components/BuildingFilter";
import AllBuildings from "@/components/AllBuildings";

export default async function Building(props: any) {
  const response:any = await fetch(`${apiUrl}/property/properties/`);
  if (!response.ok) {
    toast.error("خطاء في جلب البيانات ");
  }
  const building = await response.json();
  return (
   <AllBuildings Building={building}/>
  );
}
