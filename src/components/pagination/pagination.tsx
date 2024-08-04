"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { PiCaretLeftDuotone, PiCaretRightDuotone } from "react-icons/pi";

interface PageProps {
  next: string | null;
  previous: string | null;
}

interface PaginationProps {
  page: PageProps | null;
}

export default function Pagination({ page }: PaginationProps) {


  if (!page) {
    return <div>لا توجد عقارات لعرضها.</div>;
  }

  const getPathFromUrl = (url: string | null): string => {
    try {
      return url ? new URL(url).search : "/";
    } catch (e) {
      console.error("Invalid URL:", url);
      return "/";
    }
  };

  const path1 = getPathFromUrl(page.next);
  const path2 = getPathFromUrl(page.previous);

  return (
    <div className="flex flex-row justify-center items-center w-max px-8 py-2 rounded-lg gap-10 bg-sidpar">
      <Link href={`/propertys${path1}`} className="p-2 flex justify-between items-center rounded-lg text-xl xl:text-2xl bg-accent cursor-pointer">
        <PiCaretRightDuotone />
        <p className="text-base">التالي</p>
      </Link>
      <Link href={`/propertys${path2}`} className="p-2 flex justify-between items-center text-xl xl:text-2xl rounded-lg bg-accent cursor-pointer">
        <p className="text-base ">السابق</p>
        <PiCaretLeftDuotone />
      </Link>
    </div>
  );
}
