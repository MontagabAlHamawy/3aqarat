"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  ApartmentsApi,
  BBuildingsApi,
  BuildingApi,
  CommercialApi,
} from "@/utils/API";
import AllBuildingsType from "@/components/BuildingCom/AllBuildingsType";
import NotFound from "../../not-found";
import BuildingFilter from "@/components/BuildingCom/BuildingFilter";
import PaginationCommercial from "@/components/pagination/paginationcommercial";

export default function Commercials(props: any) {
  const [building, setBuilding] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const page = props.searchParams.page || 1;
  const linked = "/buildings/commercials";
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await CommercialApi();

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
        <div className="mx-2 mt-5 xl:mx-0 xl:ml-3">
          <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
            <h1 className="text-2xl">جاري جلب البيانات...</h1>
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
        <div className="mx-2 mt-5 xl:mx-0 xl:ml-3">
          <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
            <h1 className="text-2xl">جاري جلب البيانات...</h1>
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
      <AllBuildingsType Building={building} />
      <div className="w-full flex justify-center items-center">
        <PaginationCommercial page={pageInfo} />
      </div>
    </div>
  );
}
