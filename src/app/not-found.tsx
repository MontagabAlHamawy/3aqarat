import Link from "next/link";
import Image from "next/image";
import { PiLinkBreakDuotone } from "react-icons/pi";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full mt-20 xl:mt-32">
      <div className="flex flex-col items-center justify-center ">
        <div className="animate-waving-hand opacity-100 text-accent transform translate-y-0 duration-100">
          <PiLinkBreakDuotone size={160} />
        </div>
        <div className="text-center">
          <p className="text-lg xl:text-2xl font-semibold text-white">
            404
          </p>
          <p className="text-sm text-gray-500">
            الصفحة التي طلبتها غير موجودة
          </p>
        </div>
      </div>
    </div>
  );
}
