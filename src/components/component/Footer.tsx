"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AddBuilding from "./add-Building";
import { usePathname } from "next/navigation";

function Footer() {
  const route = usePathname();
  const [Iam, setIam] = useState<any>(false);
  useEffect(() => {
    const token = Cookies.get("authToken") || false;
    if (token) {
      setIam(true);
    }
  }, [route]);
  return (
    <div>
      <div className="bg-section py-4 xl:py-0 xl:h-14 xl:pr-20 static bottom-0 left-0 mb-[54px] xl:mb-0 flex flex-col xl:flex-row gap-3 items-center xl:justify-between z-50">
        <Link href={"/"}>
          <Image width={100} height={0} src={"/3aqarat.png"} alt="logo" />
        </Link>
        <p className="text-center xl:text-right text-base xl:text-sm xl:pl-5">
          خدمات فريدة تميزنا عن غيرنا{" "}
          <span className="text-accent">3aqarat</span> من شأنها ان تساعدك في
          مهمتك وتجعل الامر أكثر مرونة
        </p>
      </div>
      {Iam && <AddBuilding />}
    </div>
  );
}

export default Footer;
