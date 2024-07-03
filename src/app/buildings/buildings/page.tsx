"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BBuildingsApi } from "@/utils/API";
import AllBuildingsType from "@/components/BuildingCom/AllBuildingsType";
import NotFound from "../../not-found";
import BuildingFilter from "@/components/BuildingCom/BuildingFilter";
import PaginationBuildings from "@/components/pagination/paginationBuildings";
import BuildingLoade from "@/components/loade/BuildingLoade";
import BuildingError from "@/components/error/BuildingError";

export default function Buildings(props: any) {
  const [building, setBuilding] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const page = props.searchParams.page || 1;
  const linked = "/buildings/buildings";
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await BBuildingsApi(page);

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
        <BuildingLoade />
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
        <BuildingError />
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
        <PaginationBuildings page={pageInfo} />
      </div>
    </div>
  );
}
