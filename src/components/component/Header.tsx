"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PiUserDuotone,
  PiMagnifyingGlassDuotone,
  PiBellSimpleDuotone,
} from "react-icons/pi";
import Cookies from "js-cookie";
import { MyProfile, RefreshToken } from "@/utils/API";

function Header() {
  const route = usePathname();
  const [account, setAccount] = useState("");
  const [IsLog, setIsLog] = useState(false);
  const [photo, setPhoto] = useState("/user-avatar.png");

  useEffect(() => {
    const token = Cookies.get("authToken") || false;
    if (!token) {
      setAccount("login");
      setIsLog(false)
    } else {
      setAccount("account");
      const myData = async () => {
        const ifme = await MyProfile();
        setPhoto(ifme.profile_photo);
        setIsLog(true)
      }
      myData();
    }
  }, [route]);

  const accountActive = /^\/account\/.*|\/login|\/signup$/.test(route);
  const searchActive = route === "/search";
  const notActive = route === "/notification";
  if (Cookies.get("authToken") === undefined && Cookies.get("refreshToken") !== undefined) {
    RefreshToken();
  }
  if (photo === null) {
    setPhoto("/user-avatar.png");
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
          <span className={`${IsLog ? 'block' : 'hidden'} `}>
            <Image  
              src={photo}
              width={35}
              height={40}
              alt="user"
              className="rounded-md cursor-pointer border border-body"
            />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
