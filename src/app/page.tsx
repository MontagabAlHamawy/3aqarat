"use client";
import Image from "next/image";
import Link from "next/link";
import "swiper/swiper-bundle.css";
import { PiCheck } from "react-icons/pi";
import { whyus } from "../components/links";
import dynamic from "next/dynamic";
import { BuildingApi, LimitBuildingApi } from "@/utils/API";
import { toast } from "react-toastify";
import AllBuildings from "@/components/BuildingCom/AllBuildings";
import BuildingFilter from "@/components/BuildingCom/BuildingFilter";
import React, { useEffect, useState } from "react";
import BuildingLoade from "@/components/loade/BuildingLoade";
import MapLoade from "@/components/loade/MapLoade";

const HomeMap = dynamic(() => import("@/components/map/homeMap"), {
  ssr: false,
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [building, setBuilding] = useState<any>(null);
  const [bil, setBui] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let limit = 4;
        const response = await LimitBuildingApi(limit);
        const res = await BuildingApi(1);
        const build = await LimitBuildingApi(res.count);
        if (!response) {
          toast.error("خطاء في جلب البيانات ");
        } else {
          setBuilding(response.results);
          setBui(build.results);
        }
      } catch (error) {
        toast.error("خطاء في جلب البيانات ");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const linked = "/buildings/";

  if (loading) {
    return (
      <div className="mt-14 xl:mt-32 m-0 px-4 xl:px-10 h-full z-40">
        <div className="flex justify-between items-center flex-col xl:flex-row gap-4 xl:gap-8 ">
          <h1 className="text-white text-lg text-center xl:text-right font-semibold xl:font-medium xl:text-2xl w-full xl:w-[50%]">
            سواء كانت المرة الاولى لك في شراء عقار او اذا كنت احد المستثمرين
            العقاريين الذين يتمتعون بخبرة فبلا شك ان{" "}
            <span className="text-accent">3aqarat</span> سوف تقوم بارشادك بكل
            خطوة لضمان حصولك على تجربة عقارية ناجحة والحصول على رضاك
          </h1>
          <div className="flex justify-center items-center flex-col xl:mt-10">
            <p className="mb-10 text-center xl:text-right text-base xl:text-xl">
              خدمات فريدة تميزنا عن غيرنا{" "}
              <span className="text-accent">3aqarat</span> من شأنها ان تساعدك في
              مهمتك وتجعل الأمر أكثر مرونة
            </p>
            <Link href={"/buildings"}>
              <div className="bg-accent text-white px-4 py-2 rounded hover:bg-accent-hover ease-in duration-300">
                عرض العقارات
              </div>
            </Link>
          </div>
        </div>
        <MapLoade />
        <div className="flex justify-center w-full items-center flex-col">
          <h1 className="text-white text-2xl my-5">أحدث العقارات</h1>
          <div className="w-full mx-[-10px]">
            <BuildingFilter linked={linked} />
          </div>
        </div>
        <BuildingLoade />
        <div className="flex justify-center items-center">
          <Link href={"/buildings"}>
            <div className="bg-accent w-max text-white px-4 py-2 rounded hover:bg-accent-hover ease-in duration-300">
              عرض المزيد
            </div>
          </Link>
        </div>

        <div className="flex flex-col xl:flex-row justify-between items-center gap-3 mt-10">
          <div>
            <h1 className="text-2xl text-white mb-5 items-center">المميزات</h1>
            <div className="grid grid-cols-2 xl:grid-cols-1 gap-x-5 gap-y-5 xl:gap-x-16">
              {whyus.map((link, index) => {
                return (
                  <div className="flex flex-row gap-2 mb-4" key={index}>
                    <div className="bg-accent rounded-full w-8 h-8 text-center">
                      <PiCheck className="text-2xl font-black ml-8 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-white text-lg">{link.title}</p>
                      <p className="text-gray-400 text-base">{link.discrep}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <Image
              width={400}
              height={0}
              alt="logo"
              className="mb-10"
              src={"/home/hero.png"}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-14 xl:mt-32 m-0 px-4 xl:px-10 h-full z-40">
      <div className="flex justify-between items-center flex-col xl:flex-row gap-4 xl:gap-8 ">
        <h1 className="text-white text-lg text-center xl:text-right font-semibold xl:font-medium xl:text-2xl w-full xl:w-[50%]">
          سواء كانت المرة الاولى لك في شراء عقار او اذا كنت احد المستثمرين
          العقاريين الذين يتمتعون بخبرة ف بلا شك ان{" "}
          <span className="text-accent">3aqarat</span> سوف تقوم بارشادك بكل خطوة
          لضمان حصولك على تجربة عقارية ناجحة والحصول على رضاك
        </h1>
        <div className="flex justify-center items-center flex-col xl:mt-10">
          <p className="mb-10 text-center xl:text-right text-base xl:text-xl">
            خدمات فريدة تميزنا عن غيرنا{" "}
            <span className="text-accent">3aqarat</span> من شأنها ان تساعدك في
            مهمتك وتجعل الأمر أكثر مرونة
          </p>
          <Link href={"/buildings"}>
            <div className="bg-accent text-white px-4 py-2 rounded hover:bg-accent-hover ease-in duration-300">
              عرض العقارات
            </div>
          </Link>
        </div>
      </div>
      <div className="mt-10 mx-[-10px] rounded-xl flex justify-center items-center">
        <HomeMap building={bil} />
      </div>
      <div className="flex justify-center w-full items-center flex-col">
        <h1 className="text-white text-2xl my-5">الأحدث</h1>
        <div className="w-full mx-[-10px]">
          <BuildingFilter linked={linked} />
        </div>
        <AllBuildings Building={building} />
        <Link href={"/buildings"}>
          <div className="bg-accent text-white px-4 py-2 rounded hover:bg-accent-hover ease-in duration-300">
            عرض المزيد
          </div>
        </Link>
      </div>
      <div className="flex flex-col xl:flex-row justify-between items-center gap-3 mt-10">
        <div>
          <h1 className="text-2xl text-white mb-5 items-center">المميزات</h1>
          <div className="grid grid-cols-2 xl:grid-cols-1 gap-x-5 gap-y-5 xl:gap-x-16">
            {whyus.map((link, index) => {
              return (
                <div className="flex flex-row gap-2 mb-4" key={index}>
                  <div className="bg-accent rounded-full w-8 h-8 text-center">
                    <PiCheck className="text-2xl font-black ml-8 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white text-lg">{link.title}</p>
                    <p className="text-gray-400 text-base">{link.discrep}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <Image
            width={400}
            height={0}
            alt="logo"
            className="mb-10"
            src={"/home/hero.png"}
          />
        </div>
      </div>
    </div>
  );
}
