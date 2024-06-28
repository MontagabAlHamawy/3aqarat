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
import {
  MyBuilding,
  MyProfile,
  userBuilding,
  userBuildingLimit,
  userProfile,
} from "@/utils/API";
import AllBuildings from "@/components/BuildingCom/AllBuildings";

export default function Username(props: any) {
  const [user, setUser] = useState<any>(null);
  const [Iam, setIam] = useState<any>(false);
  const [Building, setBuilding] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  let photo = "/user-avatar.png";

  useEffect(() => {
    const token = Cookies.get("authToken") || false;
    if (!token) {
      router.replace("/login");
    }
  }, []);

  useEffect(() => {
    const myData = async () => {
      const Bdata = {
        username: "",
        limit: "",
      };
      try {
        const ifme = await MyProfile();
        if (ifme.username === props.params.username[0]) setIam(true);
        const response = await userProfile(props.params.username[0]);
        const responseB = await userBuilding(props.params.username[0]);
        Bdata.limit = responseB.count;
        Bdata.username = props.params.username[0];
        const responseB1 = await userBuildingLimit(Bdata);
        setUser(response);
        setBuilding(responseB1.results);

        if (response === null) {
          toast.error("حدث خطأ أثناء جلب البيانات");
          NotFound();
          return;
        }
        if (user?.profile_photo) {
          photo = user.profile_photo;
        }
      } catch (error) {
        router.replace("/not-found");
      } finally {
        setLoading(false);
      }
    };
    myData();
  }, [props.params.username]);

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
                  src={photo}
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
                <Link href={`tel:${user?.phone_number}`}>
                  {user?.phone_number}
                </Link>
                <div className="flex flex-row justify-center items-center gap-3">
                  {user?.facebook_account && (
                    <Link
                      href={`https://${user.facebook_account}`}
                      className="text-accent text-4xl"
                    >
                      <PiFacebookLogoDuotone />
                    </Link>
                  )}
                  {user?.instagram_account && (
                    <Link
                      href={`https://${user.instagram_account}`}
                      className="text-accent text-4xl"
                    >
                      <PiInstagramLogoDuotone />
                    </Link>
                  )}
                  {user?.telegram_account && (
                    <Link
                      href={`https://${user.telegram_account}`}
                      className="text-accent text-3xl"
                    >
                      <PiTelegramLogoDuotone />
                    </Link>
                  )}
                </div>
              </div>
              <div
                className={`${
                  Iam ? "flex" : "hidden"
                }  xl:flex-col justify-between items-center xl:items-start w-full xl:w-max xl:gap-y-5 px-5  absolute top-[-70px]  xl:top-1 xl:left-5 `}
              >
                <div onClick={() => logout()}>
                  <div className="bg-accent cursor-pointer text-white px-4 py-2 rounded hover:bg-accent-hover ease-in duration-300">
                    تسجيل الخروج
                  </div>
                </div>
                <Link href="/account/edit-account">
                  <div className="bg-accent cursor-pointer text-white px-4 py-2 rounded hover:bg-accent-hover ease-in duration-300">
                    تعديل الحساب
                  </div>
                </Link>
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
