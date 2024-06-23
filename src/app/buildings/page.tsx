import React, { useState } from "react";
import apiUrl from "@/utils/apiConfig";
import { toast } from "react-toastify";
import AllBuildings from "@/components/AllBuildings";
import axios from "axios";
import { BuildingApi } from "@/utils/API";

export default async function Building() {
  const response: any = await BuildingApi();
  if (!response) {
    toast.error("خطاء في جلب البيانات ");
  }
  const building = response;

  return <AllBuildings Building={building} />;
}
