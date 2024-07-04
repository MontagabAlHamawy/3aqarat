"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CommercialApi } from "@/utils/API";
import AllBuildingsType from "@/components/BuildingCom/AllBuildingsType";
import NotFound from "../../not-found";
import BuildingFilter from "@/components/BuildingCom/BuildingFilter";
import PaginationCommercial from "@/components/pagination/paginationcommercial";
import BuildingError from "@/components/error/BuildingError";
import BuildingLoade from "@/components/loade/BuildingLoade";

export default function Commercials(props: any) {
  const [building, setBuilding] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [Paginatio, setPagination] = useState(false);
  const page = props.searchParams.page || 1;
  const linked = "/buildings/commercials";
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await CommercialApi(page);

        if (!response || !response.results) {
          toast.error("خطاء في جلب البيانات ");
          NotFound();
          setError(true);
          return;
        }
        setBuilding(response.results);
        setPageInfo(response);
        if(response.next !== null){
          setPagination(true)
        }
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
  console.log("building:", building);

  return (
    <div className="mx-2 xl:mx-0 xl:ml-3">
      <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
        <h1 className="text-2xl">العقارات</h1>
      </div>
      <BuildingFilter linked={linked} />
      <AllBuildingsType Building={building} />
      <div className={`w-full ${Paginatio?"flex justify-center items-center":"hidden"}`}>
        <PaginationCommercial page={pageInfo} />
      </div>
    </div>
  );
}
