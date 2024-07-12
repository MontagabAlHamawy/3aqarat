"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import React, { useEffect, useState, useCallback } from "react";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import { toast } from "react-toastify";
import NotFound from "../not-found";
import SearchBuilding from "@/components/BuildingCom/SearchBuilding";
import {
  ApiCities,
  ApiOfferTypes,
  BuildingApi,
  ApiSearch,
  ApiApartmentSearch,
  ApiBuildingSearch,
  ApiCommercialSearch,
  ApiHouseSearch,
  ApilandSearch,
} from "@/utils/API";
import SearchBuildingType from "@/components/BuildingCom/SearchBuildingType";
import MapLoade from "@/components/loade/MapLoade";
import BuildingLoade from "@/components/loade/BuildingLoade";

const Map = dynamic(() => import("@/components/map/map"), { ssr: false });
const MapTyB = dynamic(() => import("@/components/map/mapTyB"), { ssr: false });

interface Property {
  id: number;
  name: string;
  type: string;
  // أضف الخصائص المشتركة هنا
}

export default function Search() {
  const initialPrice = 10000000;
  const [price, setPrice] = useState<number>(initialPrice);
  const [loading, setLoading] = useState(true);
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
    } catch (error) {
      toast.error("خطاء في جلب البيانات");
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
        case "all":
          build = await ApiSearch(encodedSearchText, selectedOffer, res.count);
          // إعادة تشكيل البيانات لتتوافق مع البنية المشتركة
          build.results = build.results.map((result: any) => ({
            id: result.id,
            name: result.name || result.property.name,
            type: result.type || result.property.type,
            // أضف أي خصائص مشتركة أخرى هنا
          }));
          break;
        default:
          build = await ApiSearch(encodedSearchText, selectedOffer, res.count);
      }
      setBui(build.results);
    } catch (error) {
      toast.error("خطاء في جلب البيانات");
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

  const shouldRenderSearchBuilding = propertyType === "all";

  return (
    <div>
      <div className="flex xl:fixed top-26 w-full px-40 right-10 flex-col xl:flex-row gap-7 xl:gap-16 justify-center items-center bg-section xl:mr-[-16px] mt-[-40px] xl:px-6 h-full py-10 xl:py-0 xl:h-16">
        <div className="flex flex-row items-center justify-center gap-2">
          <input
            type="text"
            placeholder="اكتب نص البحث"
            className="w-40 xl:w-80  border p-2 rounded-lg bg-body border-body text-white"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <button
            type="submit"
            className="p-3 bg-accent rounded-md "
            onClick={handleSearch}
          >
            <PiMagnifyingGlassDuotone />
          </button>
        </div>
        <div className="flex flex-row justify-between items-center gap-10 xl:gap-16">
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
      </div>
      <div className="flex justify-center">
        <div className="w-full overflow-y-auto">
          <div className="flex flex-col xl:flex-row-reverse gap-5">
            <div className="xl:fixed xl:top-[100px] mx-2 xl:mx-0 xl:right-[50px] xl:w-2/3">
              <div className="xl:mt-16 xl:mr-7">
                {shouldRenderSearchBuilding ? (
                  <Map building={bil} />
                ) : (
                  <Map building={bil} />
                )}
              </div>
            </div>
            <div className="xl:w-1/3 p-4 mt-[-20px] xl:mt-6">
              {shouldRenderSearchBuilding ? (
                <SearchBuilding bil={bil} />
              ) : (
                <SearchBuildingType bil={bil} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
