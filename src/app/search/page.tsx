"use client";
import React, { useEffect, useState } from "react";
import { PiMagnifyingGlassDuotone, PiMinus, PiPlus } from "react-icons/pi";
import Image from "next/image";
import { houses } from "../../components/links";
import Link from "next/link";
import dynamic from "next/dynamic";
import { BuildingApi, LimitBuildingApi } from "@/utils/API";
import { toast } from "react-toastify";
import HomeMap from "@/components/map/homeMap";
import NotFound from "../not-found";
import SearchBuilding from "@/components/BuildingCom/SearchBuilding";

const Map = dynamic(() => import("@/components/map/map"), { ssr: false });

export default function Search() {
  const initialPrice: number = 10000000;
  const [price, setPrice] = useState<number>(initialPrice);
  const [loading, setLoading] = useState(true);
  const [bil, setBui] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await BuildingApi(1);
        console.log("res:", res);
        const build = await LimitBuildingApi(res.count);
        if (!res) {
          toast.error("خطاء في جلب البيانات ");
          NotFound();
        }
        console.log("bil:", bil);
        setBui(build.results);
      } catch (error) {
        toast.error("خطاء في جلب البيانات ");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value, 10));
  };

  const increasePrice = () => {
    setPrice((prevPrice) => prevPrice + 50000);
  };

  const decreasePrice = () => {
    setPrice((prevPrice) => Math.max(initialPrice, prevPrice - 50000));
  };

  const formatPrice = (value: number): string => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + "K";
    } else {
      return value.toString();
    }
  };

  return (
    <div>
      <div className="flex xl:fixed top-26 w-full px-40 right-10 flex-col xl:flex-row gap-5 xl:gap-40 justify-center items-center bg-section xl:mr-[-16px] mt-[-40px] xl:px-6 h-full py-10 xl:py-0 xl:h-16">
        <div className="flex flex-row items-center justify-center gap-1">
          <input
            type="text"
            placeholder="اسم المنطقة"
            className="bg-secondary text-white rounded-md px-1 h-8 focus:outline-none"
          />
          <button type="submit" className="p-2 bg-body rounded-md">
            <PiMagnifyingGlassDuotone />
          </button>
        </div>
        <div className="flex flex-row justify-between items-center gap-36">
          <div>
            <select className="bg-secondary text-black xl:text-white rounded-md px-1 h-8 focus:outline-none">
              <option value="sale">للبيع</option>
              <option value="rent">للإيجار</option>
              <option value="mortgage">للرهن</option>
            </select>
          </div>
          <div>
            <select className="bg-secondary text-black xl:text-white rounded-md px-1 h-8 focus:outline-none">
              <option value="house">منزل</option>
              <option value="flat">شقة</option>
              <option value="building">محضر</option>
              <option value="store">محل</option>
              <option value="land">أرض</option>
            </select>
          </div>
        </div>
        {/* <div>
          <div className="flex items-center gap-2">
            <button
              onClick={decreasePrice}
              className="text-white flex items-center p-2 bg-body rounded-md"
            >
              <PiMinus />
            </button>
            <input
              type="range"
              min="0"
              max="100000000"
              step="1"
              className="w-40 focus:outline-none"
              value={price}
              onChange={handlePriceChange}
            />
            <button
              onClick={increasePrice}
              className="text-white p-2 bg-body rounded-md"
            >
              <PiPlus />
            </button>
            <span className="text-white">{formatPrice(price)}</span>
          </div>
        </div> */}
      </div>
      <div className="flex justify-center">
        <div className="w-full overflow-y-auto">
          <div className="flex flex-col xl:flex-row-reverse gap-5">
            <div className="xl:fixed xl:top-[100px] mx-2 xl:mx-0 xl:right-[50px] xl:w-2/3">
              {/* <div className="flex relative justify-center items-center mt-3 xl:mt-10 xl:h-[70vh]  rounded-md  cursor-pointer"> */}
                <div className="mt-16 xl:mr-7">
                  <Map building={bil} />
                </div>
              {/* </div> */}
            </div>
            <div className="xl:w-1/3 p-4 mt-[-20px] xl:mt-6">
              <SearchBuilding bil={bil} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
