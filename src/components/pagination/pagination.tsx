"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { PiCaretLeftDuotone, PiCaretRightDuotone } from "react-icons/pi";

export default function Pagination(page: any) {
  const router = useRouter();
  const [pagination, SetPagination] = useState<string | null>(null);
  console.log(page.page.next);

  const url1 = page.page.next;
  let path1 = "/";
  if (url1 !== null) {
    path1 = new URL(url1).search;
  }

  const url2 = page.page.previous;
  let path2: any = "/";
  if (url2 !== null) {
    path2 = new URL(url2).search;
  }

  useEffect(() => {
    if (pagination !== null) {
      router.replace(pagination);
    }
  }, [pagination, router]);
  return (
    <div className="flex flex-row justify-center items-center w-max px-8 py-2 rounded-lg  gap-10 bg-white/10">
      <div className="p-2 rounded-lg text-xl xl:text-2xl bg-accent cursor-pointer">
        <PiCaretRightDuotone
          onClick={() => SetPagination(`/buildings/${path1}`)}
        />
      </div>
      <div className="p-2 text-xl xl:text-2xl rounded-lg bg-accent cursor-pointer">
        <PiCaretLeftDuotone
          onClick={() => SetPagination(`/buildings/${path1}`)}
        />
      </div>
    </div>
  );
}
