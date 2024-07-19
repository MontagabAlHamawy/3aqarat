"use client";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { BuildingApi, ApiSearch } from "@/utils/API";
import AllBuildings from "@/components/BuildingCom/AllBuildings";
import NotFound from "../not-found";
import BuildingFilter from "@/components/BuildingCom/BuildingFilter";
import Pagination from "@/components/pagination/pagination";
import BuildingLoade from "@/components/loade/BuildingLoade";
import BuildingError from "@/components/error/BuildingError";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";

export default function Building(props: any) {
  const [building, setBuilding] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const page = props.searchParams.page || 1;
  const linked = "/buildings/";

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let response;
      if (searchText.length >= 3) {
        response = await ApiSearch(searchText);
      } else {
        response = await BuildingApi(page);
      }
      if (!response || !response.results) {
        toast.error("خطاء في جلب البيانات ");
        NotFound();
        return;
      }
      setBuilding(response.results);
      setPageInfo(response);
      if (response.next === null && response.previous === null) {
        setPagination(false);
      } else {
        setPagination(true);
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء جلب البيانات");
      console.error("error:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [page, searchText]);

  useEffect(() => {
    fetchData();
  }, [page, fetchData]);

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value.length >= 3) {
      setSearching(true);
      fetchData();
    } else {
      setSearching(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    if (searchText.length >= 3) {
      fetchData();
    }
  };

  if (loading) {
    return (
      <div className="mx-2 xl:mx-0 xl:ml-3">
        <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
          <h1 className="text-2xl">العقارات</h1>
        </div>
        <form
          className="flex flex-row items-center justify-center gap-2 mt-5"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="اكتب نص البحث"
            className="w-60 xl:w-80 border p-2 rounded-lg bg-sidpar border-sidpar text-white"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <button type="submit" className="p-3 bg-accent rounded-md">
            <PiMagnifyingGlassDuotone />
          </button>
        </form>
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
        <form
          className="flex flex-row items-center justify-center gap-2 mt-5"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="اكتب نص البحث"
            className="w-60 xl:w-80 border p-2 rounded-lg bg-sidpar border-sidpar text-white"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <button type="submit" className="p-3 bg-accent rounded-md">
            <PiMagnifyingGlassDuotone />
          </button>
        </form>
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
      <form
        className="flex flex-row items-center justify-center gap-2 mt-5"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="اكتب نص البحث"
          className="w-60 xl:w-96 border p-2 rounded-lg bg-sidpar border-sidpar text-white"
          value={searchText}
          onChange={handleSearchTextChange}
        />
        <button type="submit" className="p-3 bg-accent rounded-md">
          <PiMagnifyingGlassDuotone />
        </button>
      </form>
      <BuildingFilter linked={linked} />
      <AllBuildings Building={building} />
      <div
        className={`w-full ${
          pagination ? "flex justify-center items-center" : "hidden"
        }`}
      >
        <Pagination page={pageInfo} />
      </div>
    </div>
  );
}
