"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BuildingApi, LimitBuildingApi } from "@/utils/API";
import { toast } from "react-toastify";
import NotFound from "../not-found";
import { PiBellSimpleDuotone } from "react-icons/pi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Notification() {
  const [building, setBuilding] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [account, setAccount] = useState("/notification");
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken") || false;
    if (!token) {
      setAccount("/login?url=notification");
    }
  }, []);
  useEffect(() => {
    router.replace(account);
  }, [account, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await BuildingApi(1);
        const build = await LimitBuildingApi(res.count);
        if (!res) {
          toast.error("خطاء في جلب البيانات ");
        } else {
          setBuilding(build.results);
        }
      } catch (error) {
        toast.error("خطاء في جلب البيانات ");
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="mx-2 my-5  ml-2 xl:ml-0 xl:mx-0">
        <div className="bg-sidpar flex flex-col gap-5 justify-center items-center h-max py-10 rounded-md">
          <div className="text-[90px]">
            <PiBellSimpleDuotone />
          </div>
          <h1 className="text-2xl">جاري جلب الإشعارات...</h1>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="mx-2 my-5  ml-2 xl:ml-0 xl:mx-0">
        <div className="bg-sidpar flex flex-col gap-5 justify-center items-center h-max py-10 rounded-md">
          <div className="text-[90px]">
            <PiBellSimpleDuotone />
          </div>
          <h1 className="text-2xl">لا توجد اشعارات لعرضها</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col-reverse xl:flex-row gap-5 px-2 xl:pl-5">
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-x-5 gap-y-5 xl:gap-x-16">
          {building.map((building: any) => {
            const isoDate = building.created_at;
            const date = new Date(isoDate);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, "0");
            const formattedDate = `${hours}:${minutes} ${year}/${month}/${day}`;
            return (
              <Link
                href={`/buildings/${building.id}`}
                key={building.id}
                className="bg-sidpar rounded-md py-2 px-3 flex flex-col gap-2 relative"
              >
                <h1 className="text-accent text-xl">{building.title}</h1>
                <p>{building.description}</p>
                <p className="text-gray-400 font-thin text-sm">
                  {formattedDate}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
