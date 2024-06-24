import React, { useState } from "react";
import apiUrl from "@/utils/apiConfig";
import { toast } from "react-toastify";
import AllBuildings from "@/components/AllBuildings";
import axios from "axios";
import { BuildingApi } from "@/utils/API";
// import { Pagination } from "swiper/modules";
import Pagination from "@/components/pagination";

export default async function Building(props: any) {
  let page: any = props.searchParams.page;
  if (!page) {
    page = 1;
  }
  const response: any = await BuildingApi(page);

  if (!response) {
    toast.error("خطاء في جلب البيانات ");
  }
  const building = response.results;

  return (
    <div>
      <AllBuildings Building={building} />
      <div className="w-full flex justify-center items-center">
        <Pagination />
      </div>
    </div>
  );
}
