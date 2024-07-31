"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState, useCallback } from "react";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import { toast } from "react-toastify";
import NotFound from "../not-found";
import SearchBuilding from "@/components/BuildingCom/SearchBuilding";
import {
  ApiOfferTypes,
  BuildingApi,
  ApiSearch,
  ApiApartmentSearch,
  ApiBuildingSearch,
  ApiCommercialSearch,
  ApiHouseSearch,
  ApilandSearch,
} from "@/utils/API";
import MapLoade from "@/components/loade/MapLoade";
import BuildingLoade from "@/components/loade/BuildingLoade";
import BuildingError from "@/components/error/BuildingError";
import MapError from "@/components/error/MapError";

const Map = dynamic(() => import("@/components/map/map"), { ssr: false });

interface Property {
  id: number;
  name: string;
  type: string;
}

export default function Search() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bil, setBui] = useState<Property[]>([]);
  const [offer, setOffer] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedOffer, setSelectedOffer] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("house");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await BuildingApi(1);
      const offer = await ApiOfferTypes();
      const build = await ApiHouseSearch("", "", res.count);
      if (!res) {
        toast.error("خطاء في جلب البيانات");
        NotFound();
      }
      setBui(build.results);
      setOffer(offer);
      if (build.results.length === 0) {
        setError(true);
      } else {
        setError(false);
      }
    } catch (error) {
      toast.error("خطاء في جلب البيانات");
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = useCallback(async () => {
    if (searchText.length > 0 && searchText.length < 3) {
      return;
    }
    try {
      setLoading(true);
      const res = await BuildingApi(1);
      const encodedSearchText = encodeURIComponent(searchText);
      let build;

      switch (propertyType) {
        case "house":
          build = await ApiHouseSearch(
            encodedSearchText,
            selectedOffer,
            res.count
          );
          break;
        case "flat":
          build = await ApiApartmentSearch(
            encodedSearchText,
            selectedOffer,
            res.count
          );
          break;
        case "building":
          build = await ApiBuildingSearch(
            encodedSearchText,
            selectedOffer,
            res.count
          );
          break;
        case "commercial":
          build = await ApiCommercialSearch(
            encodedSearchText,
            selectedOffer,
            res.count
          );
          break;
        case "land":
          build = await ApilandSearch(
            encodedSearchText,
            selectedOffer,
            res.count
          );
          break;

        default:
          build = await ApiHouseSearch(
            encodedSearchText,
            selectedOffer,
            res.count
          );
      }
      setBui(build.results);
      if (build.results.length === 0) {
        setError(true);
      } else {
        setError(false);
      }
    } catch (error) {
      toast.error("خطاء في جلب البيانات");
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [searchText, selectedOffer, propertyType]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleOfferChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOffer(e.target.value);
  };

  const handlePropertyTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPropertyType(e.target.value);
    setBui([]);
    handleSearch();
  };

  return (
    <div>
      <div className="flex xl:fixed top-26 w-full  px-40 right-10 flex-col xl:flex-row gap-5 xl:gap-10 justify-center items-center bg-sidpar shadow-lg xl:mr-[-16px] mt-[-40px] xl:px-6 h-full py-10 xl:py-0 xl:h-16">
        <div className="flex flex-row items-center justify-center gap-2 mt-4 xl:mt-0">
          <input
            type="text"
            placeholder="اكتب نص البحث"
            className="w-40 xl:w-80  border p-2 rounded-lg bg-body border-body text-white"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <button
            type="submit"
            className="text-xl text-white p-2 bg-accent rounded-md cursor-pointer"
            onClick={handleSearch}
          >
            <PiMagnifyingGlassDuotone />
          </button>
        </div>
        <div className="flex mb-[-20px] xl:mb-0 flex-row justify-between items-center gap-7 xl:gap-10">
          <div>
            <select
              className="w-32 xl:w-80  h-11 border pr-2 rounded-lg bg-body border-body text-white"
              value={selectedOffer}
              onChange={handleOfferChange}
            >
              <option value="">الكل</option>
              {offer.map((offer: any) => (
                <option key={offer.id} value={offer.id}>
                  {offer.offer}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="w-32 xl:w-80  h-11 border pr-2 rounded-lg bg-body border-body text-white"
              value={propertyType}
              onChange={handlePropertyTypeChange}
            >
              <option value="house">منزل</option>
              <option value="flat">شقة</option>
              <option value="building">محضر</option>
              <option value="commercial">محل</option>
              <option value="land">أرض</option>
            </select>
          </div>
        </div>
        <div className="w-max border absolute xl:hidden top-16 right-0  p-2 bg-body border-body text-white">
          <p className="flex justify-center items-center gap-1">
            عدد النتائج:{" "}
            <span className="text-accent text-xl">{bil.length}</span>
          </p>
        </div>
        <div className="w-max border hidden xl:block top-16 left-0  p-2 rounded-lg bg-body border-body text-white">
          <p className="flex justify-center items-center gap-1">
            عدد النتائج:{" "}
            <span className="text-accent text-xl">{bil.length}</span>
          </p>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center xl:mb-[-200px] ">
          <div className="w-full overflow-y-auto">
            <div className="flex flex-col  xl:h-[60vh] xl:flex-row gap-5 px-4 mt-5 xl:mt-14">
              <div className="xl:w-2/3 px-4 xl:px-0 xl:mx-4 flex w-full justify-center items-center xl:h-full bg-sidpar rounded-md">
                <MapLoade />
              </div>
              <div className="xl:w-1/3 px-4 xl:px-0 xl:mx-4  flex w-full justify-center items-center xl:h-full bg-sidpar rounded-md">
                <BuildingLoade />
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center xl:mb-[-200px] ">
          <div className="w-full overflow-y-auto">
            <div className="flex flex-col  xl:h-[60vh] xl:flex-row gap-5 px-4 mt-5 xl:mt-14">
              <div className="xl:w-2/3 px-4 xl:px-0 xl:mx-4 flex w-full justify-center items-center xl:h-full bg-sidpar rounded-md">
                <MapError />
              </div>
              <div className="xl:w-1/3 px-4 xl:px-0 xl:mx-4  flex w-full justify-center items-center xl:h-full bg-sidpar rounded-md">
                <BuildingError />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="w-full overflow-y-auto">
            <div className="flex flex-col xl:flex-row-reverse gap-5">
              <div className="xl:fixed xl:top-[100px] mx-2 xl:mx-0 xl:right-[50px] xl:w-2/3">
                <div className="xl:mt-10 xl:mr-7 ">
                  <Map building={bil} />
                </div>
              </div>
              <div className="xl:w-1/3 p-4 mt-[-40px] xl:mt-6">
                <SearchBuilding bil={bil} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
