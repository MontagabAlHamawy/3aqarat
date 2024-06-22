import React, { useState } from "react";
import apiUrl from "@/utils/apiConfig";
import { toast } from "react-toastify";
import AllBuildings from "@/components/AllBuildings";
import axios from "axios";

export default async function Building(props: any) {
  try {
    const response: any = await axios.get(`${apiUrl}/properties/`);
    if (!response.data) {
      toast.error("خطاء في جلب البيانات ");
    }
    const building = response.data

    return <AllBuildings Building={building} />;
  } catch (error) {
    console.log(error);
  }
}
