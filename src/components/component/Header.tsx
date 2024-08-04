"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  PiUserDuotone,
  PiMagnifyingGlassDuotone,
  PiBellSimpleDuotone,
  PiPenDuotone,
  PiTrashDuotone,
  PiDoorOpenDuotone,
  PiSpinnerGapDuotone
} from "react-icons/pi";
import Cookies from "js-cookie";
import { MyProfile, RefreshToken } from "@/utils/API";
import { handleLogout } from "../sweetalert/handleLogout";
import { handleDeleteAccount } from "../sweetalert/handleDeleteAccount";

function Header() {
  const [user, setUser] = useState<any>(null);
  const route = usePathname();
  const [account, setAccount] = useState("login");
  const [IsLog, setIsLog] = useState(false);
  const [photo, setPhoto] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  function logout() {
    Cookies.set("authToken", "");
    Cookies.set("refreshToken", "");
    router.replace("/login");
  }
  useEffect(() => {
    const token = Cookies.get("authToken") || false;
    if (!token) {
      setAccount("login");
      setIsLog(false)
    } else {
      setAccount("account");
      const myData = async () => {
        const ifme = await MyProfile();
        setUser(ifme);
        if (ifme.profile_photo === null) {
          setPhoto(false);
        }
        setIsLog(true)
      }
      myData();
    }
  }, [route]);
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

  function DeletA() {
    handleDeleteAccount(logout);
  }

  function handleLogoutClick() {
    handleLogout(logout)
  }

  const accountActive = /^\/account\/.*|\/login|\/signup$/.test(route);
  const searchActive = route === "/search";
  const notActive = route === "/notification";
  if (Cookies.get("authToken") === undefined && Cookies.get("refreshToken") !== undefined) {
    RefreshToken();
  }

  return (
    <div className="sticky top-0 w-full h-16 bg-sidpar shadow-lg  z-40 xl:pr-20 flex flex-row justify-between items-center">
      <div>
        <Link href={"/"}>
          <Image
            width={40}
            alt="logo"
            height={0}
            src={"/3aqarat1.png"}
            className="xl:hidden mr-3 "
          />
        </Link>
        <Link href={"/search"}>
          <PiMagnifyingGlassDuotone
            className={`text-4xl text-white p-2 ${searchActive ? "bg-accent" : "bg-body "
              } rounded-md cursor-pointer hidden xl:block `}
          />
        </Link>
      </div>
      <div className="mx-2 flex flex-row justify-center items-center gap-2 ">
        <Link href={"/search"}>
          <PiMagnifyingGlassDuotone
            className={`text-4xl text-white p-2 ${searchActive ? "bg-accent" : "bg-body "
              } rounded-md cursor-pointer xl:hidden`}
          />
        </Link>
        <Link href={"/notification"} className="relative">
          <PiBellSimpleDuotone
            className={` text-4xl text-white p-2 ${notActive ? "bg-accent" : "bg-body "
              } rounded-md cursor-pointer`}
          />
        </Link>
        <Link href={`/${account}`}>
          <span className={`${IsLog ? 'hidden' : 'block'}`}>
            <PiUserDuotone
              className={`text-4xl text-white p-2 ${accountActive ? "bg-accent" : "bg-body "
                } rounded-md cursor-pointer`}
            />
          </span>
        </Link>
        <button ref={menuRef} onClick={() => setMenuOpen(!menuOpen)} className={`${IsLog ? 'block' : 'hidden'} mr-[-7px] `}>
          <div className={`${photo ? "" : "hidden"} rounded-md bg-body relative flex flex-col justify-center items-center w-10 h-10`}>
            <Image
              src={photo ? user?.profile_photo : "/"}
              width={40}
              height={40}
              alt="user"
              className={`rounded-md z-20 w-full h-full`}
            />
            <PiSpinnerGapDuotone size={20} className="text-accent z-10  absolute animate-waving-hand2 opacity-100 transform translate-y-0 duration-100" />
          </div>
          <PiUserDuotone
            className={`text-4xl text-white p-2 ${accountActive ? "bg-accent" : "bg-body "
              } ${photo ? "hidden" : ""} rounded-md cursor-pointer`}
          />

          {menuOpen && (
            <div className="absolute flex flex-col p-2 gap-2 top-[62px] left-0 bg-sidpar w-max  rounded-br-md shadow-lg">
              <Link href="/account/">
                <div className="flex items-center gap-1 p-2 cursor-pointer rounded-md bg-body hover:bg-accent">
                  <PiUserDuotone size={24} />
                  <p className="ml-2">معلومات الحساب</p>
                </div>
              </Link>
              <Link href="/account/edit-account">
                <div className="flex items-center gap-1 p-2 cursor-pointer rounded-md bg-body hover:bg-accent">
                  <PiPenDuotone size={24} />
                  <p className="ml-2">تعديل الحساب</p>
                </div>
              </Link>
              <div
                onClick={handleLogoutClick}
                className="flex items-center  gap-1 p-2 cursor-pointer rounded-md bg-body hover:bg-red-600"
              >
                <PiDoorOpenDuotone size={24} />
                <p className="ml-2">تسجيل الخروج</p>
              </div>

              <div
                onClick={DeletA}
                className="flex items-center  gap-1 p-2 cursor-pointer rounded-md bg-body hover:bg-red-600"
              >
                <PiTrashDuotone size={24} />
                <p className="ml-2">حذف الحساب</p>
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default Header;
