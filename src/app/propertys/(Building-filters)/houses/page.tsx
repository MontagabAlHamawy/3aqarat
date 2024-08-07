"use client";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { HousesApi, ApiHouseSearch } from "@/utils/API";
import AllBuildingsType from "@/components/BuildingCom/AllBuildingsType";
import NotFound from "@/app/not-found";
import BuildingFilter from "@/components/BuildingCom/BuildingFilter";
import PaginationHouses from "@/components/pagination/paginationhouses";
import BuildingLoade from "@/components/loade/BuildingLoade";
import BuildingError from "@/components/error/BuildingError";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";

export default function Houses(props: any) {
  const [building, setBuilding] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const page = props.searchParams.page || 1;
  const linked = "/propertys/houses";

  const fetchData = useCallback(async () => {
    setError(false);
    try {
      let response;
      response = await HousesApi(page);
      if (searching) {
        setLoading(false);
        response = await ApiHouseSearch(searchText, "", "");
      }
      if (!response || !response.results) {
        toast.error("خطاء في جلب البيانات ");
        NotFound();
        setError(true);
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
      console.error("error:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [page, searchText, searching]);

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
          <h1 className="text-2xl">المنازل</h1>
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
          <button type="submit" className="text-xl text-white p-2 bg-accent rounded-md cursor-pointer " >
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
      <div className="mx-2  xl:mx-0 xl:ml-3">
        <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
          <h1 className="text-2xl">المنازل</h1>
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
          <button type="submit" className="text-xl text-white p-2 bg-accent rounded-md cursor-pointer " >
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
        <h1 className="text-2xl">المنازل</h1>
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
        <button type="submit" className="text-xl text-white p-2 bg-accent rounded-md cursor-pointer " >
          <PiMagnifyingGlassDuotone />
        </button>
      </form>
      <BuildingFilter linked={linked} />
      <AllBuildingsType Building={building} />
      <div
        className={`w-full ${pagination ? "flex justify-center items-center" : "hidden"
          }`}
      >
        <PaginationHouses page={pageInfo} />
      </div>
    </div>
  );
}
