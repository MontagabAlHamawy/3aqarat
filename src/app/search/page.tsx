"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import NotFound from "../not-found";
import SearchBuilding from "@/components/BuildingCom/SearchBuilding";
import {
  ApiOfferTypes,
  ApiSearch2,
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
import SearchBuilding2 from "@/components/BuildingCom/SearchBuilding2";

const Map = dynamic(() => import("@/components/map/map"), { ssr: false });
const Map2 = dynamic(() => import("@/components/map/map2"), { ssr: false });

export default function Search() {
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(true);
  const [error, setError] = useState(false);
  const [bil, setBui] = useState([]);
  const [offer, setOffer] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedOffer, setSelectedOffer] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const offerData = await ApiOfferTypes();
        setOffer(offerData);

        let build;
        switch (propertyType) {
          case "house":
            setType(false);
            build = await ApiHouseSearch(searchText, selectedOffer, 10000000);
            break;
          case "flat":
            setType(false);
            build = await ApiApartmentSearch(searchText, selectedOffer, 10000000);
            break;
          case "building":
            setType(false);
            build = await ApiBuildingSearch(searchText, selectedOffer, 10000000);
            break;
          case "commercial":
            setType(false);
            build = await ApiCommercialSearch(searchText, selectedOffer, 10000000);
            break;
          case "land":
            setType(false);
            build = await ApilandSearch(searchText, selectedOffer, 10000000);
            break;
          default:
            setType(true);
            build = await ApiSearch2(searchText, selectedOffer, 10000000);
        }

        let formattedResults;

        // إذا كانت البيانات من ApiSearch2
        if (build && build.results) {
          formattedResults = build.results;
        } else if (build && build.results && build.results[0]?.property) {
          // إذا كانت البيانات من ApiHouseSearch, ApiApartmentSearch, etc.
          formattedResults = build.results.map((item: any) => item.property);
        }

        if (!formattedResults || formattedResults.length === 0) {
          setError(true);
          NotFound();
        } else {
          setBui(formattedResults);
          setError(false);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (searchText.length === 0 || searchText.length >= 3) {
      fetchData();
    }
  }, [searchText, selectedOffer, propertyType]);

  const handleSearch = () => {
    // سيتم تنفيذ جلب البيانات تلقائياً من خلال useEffect
  };

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleOfferChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOffer(e.target.value);
    setBui([]);
  };

  const handlePropertyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyType(e.target.value);
    setBui([]);
  };
  console.log("bil: ", bil);


  return (
    <div>
      <div className="flex xl:fixed top-26 w-full z-20 px-40 right-10 flex-col xl:flex-row gap-5 xl:gap-10 justify-center items-center bg-sidpar shadow-lg xl:mr-[-16px] mt-[-40px] xl:px-6 h-full py-10 xl:py-0 xl:h-16">
        <div className="flex flex-row items-center justify-center gap-2 mt-4 xl:mt-0">
          <input
            type="text"
            placeholder="اكتب نص البحث"
            className="w-40 xl:w-80 border p-2 rounded-lg bg-body border-body text-white"
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
              className="w-32 xl:w-80 h-11 border pr-2 rounded-lg bg-body border-body text-white"
              value={selectedOffer}
              onChange={handleOfferChange}
            >
              <option value="">الكل</option>
              {offer.map((offer) => (
                <option key={offer.id} value={offer.id}>
                  {offer.offer}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="w-32 xl:w-80 h-11 border pr-2 rounded-lg bg-body border-body text-white"
              value={propertyType}
              onChange={handlePropertyTypeChange}
            >
              <option value="all">جميع أنواع العقارات</option>
              <option value="house">منزل</option>
              <option value="flat">شقة</option>
              <option value="building">محضر</option>
              <option value="commercial">محل</option>
              <option value="land">أرض</option>
            </select>
          </div>
        </div>
        <div className="w-max border absolute xl:hidden top-16 right-0 p-2 bg-body border-body text-white">
          <p className="flex justify-center items-center gap-1">
            عدد النتائج: <span className="text-accent text-xl">{bil.length}</span>
          </p>
        </div>
        <div className="w-max border hidden xl:block top-16 left-0 p-2 rounded-lg bg-body border-body text-white">
          <p className="flex justify-center items-center gap-1">
            عدد النتائج: <span className="text-accent text-xl">{bil.length}</span>
          </p>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center xl:mb-[-200px]">
          <div className="w-full overflow-y-auto">
            <div className="flex flex-col xl:h-[60vh] xl:flex-row gap-5 px-4 mt-5 xl:mt-14">
              <div className="xl:w-2/3 px-4 xl:px-0 xl:mx-4 flex w-full justify-center items-center xl:h-full bg-sidpar rounded-md">
                <MapLoade />
              </div>
              <div className="xl:w-1/3 px-4 xl:px-0 xl:mx-4 flex w-full justify-center items-center xl:h-full bg-sidpar rounded-md">
                <BuildingLoade />
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center xl:mb-[-200px]">
          <div className="w-full overflow-y-auto">
            <div className="flex flex-col xl:h-[60vh] xl:flex-row gap-5 px-4 mt-5 xl:mt-14">
              <div className="xl:w-2/3 px-4 xl:px-0 xl:mx-4 flex w-full justify-center items-center xl:h-full bg-sidpar rounded-md">
                <MapError />
              </div>
              <div className="xl:w-1/3 px-4 xl:px-0 xl:mx-4 flex w-full justify-center items-center xl:h-full bg-sidpar rounded-md">
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
                <div className="xl:mt-10 xl:mr-7">
                  {type ? <Map building={bil} /> : <Map2 building={bil} />}
                </div>
              </div>
              <div className="xl:w-1/3 p-4 mt-[-40px] xl:mt-6">
                {type ? <SearchBuilding2 bil={bil} /> : <SearchBuilding bil={bil} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function fetchData() {
  throw new Error("Function not implemented.");
}

