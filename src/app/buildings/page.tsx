"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BuildingApi } from "@/utils/API";
import AllBuildings from "@/components/BuildingCom/AllBuildings";
import NotFound from "../not-found";
import BuildingFilter from "@/components/BuildingCom/BuildingFilter";
import Pagination from "@/components/pagination/pagination";
import { PiBuildingsDuotone } from "react-icons/pi";

export default function Building(props: any) {
  const [building, setBuilding] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const page = props.searchParams.page || 1;
  const linked = "/buildings/";
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await BuildingApi(page);
        if (!response || !response.results) {
          toast.error("خطاء في جلب البيانات ");
          NotFound();
          setError(true);
          return;
        }
        setBuilding(response.results);
        setPageInfo(response);
      } catch (error) {
        toast.error("حدث خطأ أثناء جلب البيانات");
        console.error("error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (loading) {
    return (
      <div className="mx-2 xl:mx-0 xl:ml-3">
        <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
          <h1 className="text-2xl">العقارات</h1>
        </div>
        <BuildingFilter linked={linked} />
        <div className="mx-2 my-5 ml-2 xl:ml-0 xl:mx-0">
          <div className="bg-sidpar flex flex-col gap-5 justify-center items-center h-max py-10 rounded-md">
            <div className="text-[90px]">
              <PiBuildingsDuotone />
            </div>
            <h1 className="text-2xl">لا توجد عقارات لعرضها</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-2 xl:mx-0 xl:ml-3">
        <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
          <h1 className="text-2xl">العقارات</h1>
        </div>
        <BuildingFilter linked={linked} />
        <div className="mx-2 my-5 ml-2 xl:ml-0 xl:mx-0">
          <div className="bg-sidpar flex flex-col gap-5 justify-center items-center h-max py-10 rounded-md">
            <div className="text-[90px]">
              <PiBuildingsDuotone />
            </div>
            <h1 className="text-2xl">جاري جلب العقارات...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-2 xl:mx-0 xl:ml-3">
      <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
        <h1 className="text-2xl">العقارات</h1>
      </div>
      <BuildingFilter linked={linked} />
      <AllBuildings Building={building} />
      <div className="w-full flex justify-center items-center">
        <Pagination page={pageInfo} />
      </div>
    </div>
  );
}
