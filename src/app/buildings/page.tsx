import React, { useState } from "react";
import apiUrl from "@/utils/apiConfig";
import { toast } from "react-toastify";
import axios from "axios";
import { BuildingApi } from "@/utils/API";
// import { Pagination } from "swiper/modules";
import Pagination from "@/components/pagination/pagination";
import AllBuildings from "@/components/BuildingCom/AllBuildings";

export default async function Buildin(props: any) {
  let page = props.searchParams.page || null;
  if (page === null) {
    page = 1;
  }
  const response = await BuildingApi(page);

  if (!response) {
    toast.error("خطاء في جلب البيانات ");
  }
  const building = response.results;
  const pagee = response;

  return (
    <div className="mx-2 xl:mx-0 xl:ml-3">
      <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
        <h1 className="text-2xl">العقارات</h1>
      </div>
      <AllBuildings Building={building} />
      <div className="w-full flex justify-center items-center">
        <Pagination page={pagee} />
      </div>
    </div>
  );
}
