"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  PiFacebookLogoDuotone,
  PiInstagramLogoDuotone,
  PiPenDuotone,
  PiTelegramLogoDuotone,
  PiTrashDuotone,
  PiUploadSimpleDuotone,
} from "react-icons/pi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import NotFound from "@/app/not-found";
import {
  MyProfile,
  userBuilding,
  userBuildingLimit,
  userProfile,
} from "@/utils/API";
import AllBuildings from "@/components/BuildingCom/AllBuildings";
import UsersLoading from "@/components/loade/UsersLoading";
import AllMyBuildings from "@/components/BuildingCom/AllMyBuildings";

export default function Username(props: any) {
  const [user, setUser] = useState<any>(null);
  const [Iam, setIam] = useState<any>(false);
  const [Building, setBuilding] = useState<any>(null);
  const [photo, setPhoto] = useState("/user-avatar.png");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

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
        setPhoto(response.profile_photo);

        if (response === null) {
          toast.error("حدث خطأ أثناء جلب البيانات");
          NotFound();
          return;
        }
      } catch (error) {
        const token = Cookies.get("authToken") || false;
        if (!token) {
          router.replace(`/login?url=account/${props.params.username[0]}`);
        } else {
          router.replace("/not-found");
        }
      } finally {
        setLoading(false);
      }
    };
    myData();
  }, [props.params.username]);

  function logout() {
    Cookies.set("authToken", "");
    Cookies.set("refreshToken", "");
    router.replace(`/login`);
  }
  if (photo === null) {
    setPhoto("/user-avatar.png");
  }

  if (loading) {
    return <UsersLoading />;
  }

  return (
    <div className="relative">
      <div>
        <div
          className={`flex flex-col ${
            Iam ? "mt-20 xl:mt-0" : "mt-0"
          }  xl:flex-row justify-start items-center xl:mr-40 gap-x-14 gap-y-4`}
        >
          <div>
            <Image
              src={photo}
              width={300}
              height={0}
              alt="user"
              className="rounded-2xl"
            />
          </div>
          <div className="flex flex-col justify-center items-center xl:items-start gap-3">
            <h1 className="text-accent text-2xl font-bold">
              {user?.first_name} {user?.last_name}
            </h1>
            <Link href={`tel:${user?.phone_number}`}>{user?.phone_number}</Link>
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
            }  flex flex-col justify-between items-start xl:items-start mb-40 w-full xl:w-max  gap-5 px-1 xl:px-5  absolute top-[-110px]  xl:top-1 xl:left-5 `}
          >
            <div className="flex flex-row xl:flex-col gap-5 justify-between items-center xl:items-start w-full">
              <div onClick={() => logout()}>
                <div className="bg-accent cursor-pointer flex justify-start items-center xl:gap-2 text-white px-1 py-2 xl:px-4 xl:py-2 rounded hover:bg-accent-hover ease-in duration-300">
                  <PiUploadSimpleDuotone size={24} />
                  <p>تسجيل الخروج</p>
                </div>
              </div>
              <Link href="/account/edit-account">
                <div className="bg-accent flex justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-1 py-2 xl:px-4 xl:py-2 rounded hover:bg-accent-hover ease-in duration-300">
                  <PiPenDuotone size={24} />
                  <p>تعديل الحساب</p>
                </div>
              </Link>
            </div>
            <div>
              <div className="bg-red-600 flex justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-1 py-2 xl:px-4 xl:py-2 rounded hover:bg-red-500 ease-in duration-300">
                <PiTrashDuotone size={24} />
                <p>حذف الحسب</p>
              </div>
            </div>
          </div>
          {/* <div
            className={`${
              Iam ? "flex" : "hidden"
            }  xl:flex-col justify-between items-center xl:items-start w-full xl:w-max mb-20 gap-[1px] xl:gap-5 px-1 xl:px-5  absolute   xl:top-1 xl:left-5 `}
          >
            <div className="bg-red-600 flex xl:hidden  justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-1 py-2 xl:px-4 xl:py-2 rounded hover:bg-red-500 ease-in duration-300">
              <PiTrashDuotone size={24} />
              <p>حذف الحسب</p>
            </div>
          </div> */}
        </div>
      </div>

      <div>
        <h1 className="text-2xl mt-10 bg-section xl:mr-[-8px] rounded-t-md py-2 px-3 w-min">
          {Iam ? "عقاراتي" : "العقارات"}
        </h1>
        <div className=" bg-section rounded-b-md rounded-tl-md py-10 gap-x-5 gap-y-5 xl:gap-x-10 xl:gap-y-10 w-full px-4 xl:mx-[-8px]">
          {Iam ? (
            <AllMyBuildings Building={Building} />
          ) : (
            <AllBuildings Building={Building} />
          )}
        </div>
      </div>
    </div>
  );
}
