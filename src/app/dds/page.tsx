'use client'

import dynamic from "next/dynamic";

const Mapp = dynamic(() => import("@/app/components/mapp"), { ssr: false });

export default function Dds() {
  return (
    <div className="mx-2 xl:mx-0 xl:ml-3 ">
      <div className="w-[90vw] h-[300px] relative">
        <Mapp />
      </div>
    </div>
  );
}
