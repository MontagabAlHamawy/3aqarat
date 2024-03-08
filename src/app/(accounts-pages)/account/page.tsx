import Link from "next/link";
import React from "react";

export default function Acount() {
  return (
    <div className="flex justify-center items-center felx-col gap-5 xl:gap-10 h-[40vh] xl:h-[70vh]">
      <Link href={"/login"}>
        <div className="bg-accent text-white px-4 py-2 rounded hover:scale-110  ease-in duration-300">
          تسجيل الدخول
        </div>
      </Link>
      <Link href={"/signup"}>
        <div className="bg-accent text-white px-4 py-2 rounded hover:scale-110  ease-in duration-300">
          تسجيل مستخدم
        </div>
      </Link>
    </div>
  );
}
