"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import {
  PiFacebookLogoDuotone,
  PiGearSixDuotone,
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
import { handleDeleteAccount } from "@/components/sweetalert/handleDeleteAccount";
import { handleLogout } from "@/components/sweetalert/handleLogout";

export default function Username(props: any) {
  const [user, setUser] = useState<any>(null);
  const [Iam, setIam] = useState(false);
  const [Building, setBuilding] = useState(null);
  const [photo, setPhoto] = useState("/user-avatar.png");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); 
  const menuRef = useRef(null);

  const router = useRouter();

  function logout() {
    Cookies.set("authToken", "");
    Cookies.set("refreshToken", "");
    router.replace("/login");
  }

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
  }, [props.params.username, router]);
  const [account, setAccount] = useState(
    `/account/${props.params.username[0]}`
  );
  useEffect(() => {
    const token = Cookies.get("authToken") || false;
    if (!token) {
      setAccount("/login?url=account");
    }
  }, []);
  useEffect(() => {
    router.replace(account);
  }, [account, router]);

  function DeletA() {
    handleDeleteAccount(logout);
  }

  function handleLogoutClick() {
    handleLogout(logout);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !(menuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

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
            Iam ? "mt-5 xl:mt-0" : "mt-0"
          } xl:flex-row justify-start items-center xl:mr-40 gap-x-14 gap-y-4`}
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
              {user.telegram_account && (
                <Link
                  href={`https://${user.telegram_account}`}
                  className="text-accent text-3xl"
                >
                  <PiTelegramLogoDuotone />
                </Link>
              )}
            </div>
          </div>
          {Iam && (
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
          )}
        </div>
      </div>

      <div>
        <h1 className="text-2xl mt-10 bg-section xl:mr-[-8px] rounded-t-md py-2 px-3 w-min">
          {Iam ? "عقاراتي" : "العقارات"}
        </h1>
        <div className="bg-section rounded-b-md rounded-tl-md py-10 gap-x-5 gap-y-5 xl:gap-x-10 xl:gap-y-10 w-full px-4 xl:mx-[-8px]">
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
