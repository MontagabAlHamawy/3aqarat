"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PiCaretLeftDuotone, PiCaretRightDuotone } from "react-icons/pi";
export default function Pagination() {
    const router = useRouter();
  const [pagination, SetPagination] = useState("/buildings/?page=1");
  router.replace(pagination);
  return (
    <div className="flex flex-row justify-center items-center w-max px-8 py-2 rounded-lg  gap-10 bg-white/10">
      <div className="p-2 rounded-lg text-xl xl:text-2xl bg-accent cursor-pointer">
        <PiCaretRightDuotone onClick={() => SetPagination("/buildings/?page=2")} />
      </div>
      <div className="p-2 text-xl xl:text-2xl rounded-lg bg-accent cursor-pointer">
        <PiCaretLeftDuotone onClick={() => SetPagination("/buildings/?page=1")} />
      </div>
    </div>
  );
}
