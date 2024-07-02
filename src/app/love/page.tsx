"use client";

import React, { useEffect, useState } from "react";
import { PiBuildingsDuotone } from "react-icons/pi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import LoveLoade from "@/components/loade/LoveLoade";

export default function Love() {
  const router = useRouter();
  const [account, setAccount] = useState("/love");
  useEffect(() => {
    const token = Cookies.get("authToken") || false;
    if (!token) {
      setAccount("/login?url=love");
    }
  }, []);
  useEffect(() => {
    router.replace(account);
  }, [account, router]);
  return (
    // <div className="mx-2 xl:mx-0 xl:ml-3">
    //   <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
    //     <h1 className="text-2xl">المفضلة</h1>
    //   </div>
    //   <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-5 xl:gap-x-16 xl:gap-y-10 ml-5 my-5 w-full">
    //     {house.map((houss, index) => {
    //       return (
    //         <Link
    //           href={houss.link}
    //           key={index}
    //           className="bg-sidpar rounded-xl relative"
    //         >
    //           <Image
    //             src={houss.img}
    //             width={1000}
    //             height={0}
    //             alt="montagab"
    //             className="w-[1080px] rounded-tl-xl rounded-tr-xl"
    //           />
    //           <p className="text-lg xl:text-xl text-accent mt-2 px-2 xl:px-5">
    //             {houss.title}
    //           </p>
    //           <p className="text-white text-sm font-light sm:my-2 px-2 xl:px-5">
    //             {houss.discrep}
    //           </p>
    //           <div className="flex flex-row justify-between items-center my-3 xl:my-1 mx-5 mb-4">
    //             <p>{houss.prise}</p>
    //             <div className="text-red-600 xl:text-xl p-2 rounded-md bg-section"><PiHeartDuotone/></div>
    //           </div>
    //           <div className="bg-accent text-white text-sm xl:text-lg px-2 py-1 rounded absolute top-2 right-2">
    //             {houss.display}
    //           </div>
    //         </Link>
    //       );
    //     })}
    //   </div>
    // </div>

    <LoveLoade />
  );
}
