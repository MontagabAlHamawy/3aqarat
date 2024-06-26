"use client";
import { UserInfo, house } from "@/components/links";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  PiFacebookLogoDuotone,
  PiInstagramLogoDuotone,
  PiTelegramLogoDuotone,
} from "react-icons/pi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import NotFound from "@/app/not-found";
import { MyBuilding, userProfile } from "@/utils/API";
import AllBuildings from "@/components/BuildingCom/AllBuildings";

export default function Username(props: any) {
  const [user, setUser] = useState<any>(null);
  const [Building, setBuilding] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const myData = async () => {
      try {
        const response = await userProfile(props.params.username[0]);
        const responseB = await MyBuilding();
        setUser(response);
        setBuilding(responseB.results);
        if (!response) {
          toast.error("حدث خطأ أثناء جلب البيانات");
          NotFound();
          return;
        }
      } catch (error) {
        toast.error("حدث خطأ أثناء جلب البيانات");
        NotFound();
      } finally {
        setLoading(false);
      }
    };
    myData();
  }, [props.params.username]);

  const router = useRouter();
  function logout() {
    Cookies.set("authToken", "");
    router.replace("/login");
  }

  if (loading) {
    return (
      <div className="mx-2 mt-5 xl:mx-0 xl:ml-3">
        <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
          <h1 className="text-2xl">جاري جلب البيانات...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div>
        {UserInfo.map((link, index) => {
          return (
            <div
              key={index}
              className="flex flex-col mt-10 xl:mt-0 xl:flex-row justify-start items-center gap-8"
            >
              <div>
                <Image
                  src={link.image}
                  width={290}
                  height={290}
                  alt="user"
                  className="w-80 h-50 rounded-full"
                />
              </div>
              <div className="flex flex-col justify-center items-center xl:items-start gap-3">
                <h1 className="text-accent text-2xl font-bold">
                  {user?.first_name} {user?.last_name}
                </h1>
                <Link href={`tel:${link.phone}`}>{link.phone}</Link>
                <div className="flex flex-row justify-center items-center gap-3">
                  <Link href={link.facebook} className="text-accent text-4xl">
                    <PiFacebookLogoDuotone />
                  </Link>
                  <Link href={link.instagram} className="text-accent text-4xl">
                    <PiInstagramLogoDuotone />
                  </Link>
                  <Link href={link.telegram} className="text-accent text-3xl">
                    <PiTelegramLogoDuotone />
                  </Link>
                </div>
              </div>
              <div className="absolute top-[-70px] left-2 xl:top-1 xl:left-5 ">
                <div onClick={() => logout()}>
                  <div className="bg-accent cursor-pointer text-white px-4 py-2 rounded hover:bg-accent-hover ease-in duration-300">
                    تسجيل الخروج
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h1 className="text-2xl mt-10 bg-section xl:mr-[-8px] rounded-t-md py-2 px-3 w-min">
          عقاراتي
        </h1>
        <div className=" bg-section rounded-b-md rounded-tl-md py-10 gap-x-5 gap-y-5 xl:gap-x-10 xl:gap-y-10 w-full px-4 xl:mx-[-8px]">
          <AllBuildings Building={Building} />
        </div>
      </div>
    </div>
  );
}
