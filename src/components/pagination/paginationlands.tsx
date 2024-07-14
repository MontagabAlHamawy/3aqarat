"use client";

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

export default function PaginationLands({ page }: PaginationProps) {
  const router = useRouter();
  const [pagination, setPagination] = useState<string | null>(null);

  useEffect(() => {
    if (pagination !== null) {
      router.replace(pagination);
    }
  }, [pagination, router]);

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
      <div className="p-2 rounded-lg text-xl xl:text-2xl bg-accent cursor-pointer">
        <PiCaretRightDuotone
          onClick={() => setPagination(`/buildings/lands/${path1}`)}
        />
      </div>
      <div className="p-2 text-xl xl:text-2xl rounded-lg bg-accent cursor-pointer">
        <PiCaretLeftDuotone
          onClick={() => setPagination(`/buildings/lands/${path2}`)}
        />
      </div>
    </div>
  );
}
