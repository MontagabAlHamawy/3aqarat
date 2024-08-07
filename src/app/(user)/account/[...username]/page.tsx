"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import {
  PiFacebookLogoDuotone,
  PiInstagramLogoDuotone,
  PiSpinnerGapDuotone,
  PiTelegramLogoDuotone,
  PiUserDuotone,
} from "react-icons/pi";
import { notFound, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  GetToken,
  MyProfile,
  userBuilding,
  userBuildingLimit,
  userProfile,
} from "@/utils/API";
import AllBuildings from "@/components/BuildingCom/AllBuildings";
import UsersLoading from "@/components/loade/UsersLoading";
import AllMyBuildings from "@/components/BuildingCom/AllMyBuildings";
import NotFound from "@/app/not-found";
import AllBuildingsUser from "@/components/BuildingCom/AllBuildingsUser";

export default function Username(props: any) {
  const [user, setUser] = useState<any>(null);
  const [Iam, setIam] = useState(false);
  const [Building, setBuilding] = useState(null);
  const [photo, setPhoto] = useState(true);
  const [loading, setLoading] = useState(true);
  const menuRef = useRef(null);
  const [warning, SetWarning] = useState(false)

  const router = useRouter();
  const token = GetToken();
  useEffect(() => {
    if (!token) {
      router.replace(`/login?url=account/${props.params.username[0]}`);
    }
  }, [props.params.username, router, token]);
  useEffect(() => {
    const myData = async () => {
      const Bdata = {
        username: "",
        limit: "",
      };
      try {

        if (!token) {
          router.replace(`/login?url=account/${props.params.username[0]}`);
        } else {
          const ifme = await MyProfile();
          if (ifme.username === props.params.username[0]) setIam(true);
          const response = await userProfile(props.params.username[0]);
          const responseB = await userBuilding(props.params.username[0]);
          Bdata.limit = responseB.count;
          Bdata.username = props.params.username[0];
          const responseB1 = await userBuildingLimit(Bdata);
          setUser(response);
          if (response.profile_photo === null) {
            setPhoto(false);
          }
          setBuilding(responseB1.results);
          if (response.status === 404) {
            SetWarning(true)
            return NotFound()
          }
        }
      } catch (error) {
        if (!token) {
          router.replace(`/login?url=account/${props.params.username[0]}`);
        } else {
          SetWarning(true)
          return NotFound()
          // router.replace("/not-found");
        }
      } finally {
        setLoading(false);
      }
    };
    myData();
    if (warning) {
      toast.warning("هذا المستخدم غير موجود");
    }
  }, [props.params.username, router, token, warning]);
  const [account, setAccount] = useState(
    `/account/${props.params.username[0]}`
  );


  if (loading) {
    return <UsersLoading />;
  }
  if (warning) {
    return (
      <NotFound />
    )
  }


  return (
    <>
      <div className={`relative ${token && !warning ? "hidden" : ""}`}><UsersLoading /></div>
      <div className={`relative ${token && !warning ? "" : "hidden"}`}>
        <div>
          <div
            className={`flex flex-col mt-0
          } xl:flex-row justify-start items-center xl:mr-40 gap-x-14 gap-y-4`}
          >
            <div className={`${photo ? "" : "hidden"} rounded-2xl bg-sidpar relative flex flex-col justify-center items-center w-[300px] h-[300px]`}>
              <Image
                src={photo ? user?.profile_photo : "/"}
                width={300}
                height={0}
                alt="user"
                className={`rounded-2xl z-20 w-full h-full`}
              />
              <PiSpinnerGapDuotone size={70} className="text-accent z-10  absolute animate-waving-hand2 opacity-100 transform translate-y-0 duration-100" />
            </div>
            <div className={`rounded-2xl text-accent flex justify-center items-center w-[250px] h-[250px] xl:w-[300px] xl:h-[300px] bg-sidpar ${photo ? "hidden" : ""}`}>
              <PiUserDuotone size={160} />
            </div>
            <div className="flex flex-col justify-center items-center xl:items-start gap-3">
              <h1 className="text-accent text-2xl font-semibold">
                {user?.first_name} {user?.last_name}
              </h1>
              <p className="text-neutral-400 font-light">{user?.username}@</p>
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
            {/* {Iam && (
            <div className="absolute top-[-50px] xl:top-0 left-2" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-accent relative p-2 text-xl rounded-md hover:sidpar focus:outline-none"
              >
                <PiGearSixDuotone />
              </button>
              {menuOpen && (
                <div className="absolute flex flex-col p-2 gap-2 top-0 left-10 bg-sidpar w-max  rounded-md shadow-lg">
                  <Link href="/account/edit-account">
                    <div className="flex items-center p-2 cursor-pointer rounded-md bg-body hover:bg-accent">
                      <PiPenDuotone size={24} />
                      <p className="ml-2">تعديل الحساب</p>
                    </div>
                  </Link>
                  <div
                    onClick={handleLogoutClick}
                    className="flex items-center p-2 cursor-pointer rounded-md bg-body hover:bg-red-600"
                  >
                    <PiUploadSimpleDuotone size={24} />
                    <p className="ml-2">تسجيل الخروج</p>
                  </div>

                  <div
                    onClick={DeletA}
                    className="flex items-center p-2 cursor-pointer rounded-md bg-body hover:bg-red-600"
                  >
                    <PiTrashDuotone size={24} />
                    <p className="ml-2">حذف الحساب</p>
                  </div>
                </div>
              )}
            </div>
          )} */}
          </div>
        </div>

        <div>
          <h1 className="text-2xl mt-10 bg-sidpar xl:mr-[-8px] rounded-t-md py-2 px-3 w-min">
            {Iam ? "عقاراتي" : "العقارات"}
          </h1>
          <div className="bg-sidpar rounded-b-md rounded-tl-md py-10 gap-x-5 gap-y-5 xl:gap-x-10 xl:gap-y-10 w-full px-4 xl:mx-[-8px]">
            {Iam ? (
              <AllMyBuildings Building={Building} />
            ) : (
              <AllBuildingsUser Building={Building} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
