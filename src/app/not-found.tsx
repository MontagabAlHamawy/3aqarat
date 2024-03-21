import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div >
      <div className="xl:w-full xl:pt-20 flex flex-col justify-center items-center">
        <Image
          height={0}
          alt="error"
          src={"/error.png"}
          width={600}
          className=" md:mt-[-100px] xl:mt-[-150px] xl:ml-[-10px]"
        />

        <span className="text-accent text-center text-xl md:text-2xl xl:text-2xl font-normal mt-[-50px] md:mt-[-100px] xl:mt-[-100px]">
          الصفحة غير موجودة
        </span>
        <Link
          href={"/"}
          aria-label="home"
          className="flex justify-center items-center"
        >
          <div className="btn btn-sm btn-accent w-[164px] mt-5 xl:mb-0">
            <p className="text-base font-400 text-white">الرئيسية</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
