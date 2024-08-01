import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div >
      <div className="xl:w-full xl:pt-20 flex flex-col justify-center items-center mt-20">
        <div className="animate-waving-hand opacity-100 transform translate-x-0 duration-300">
          <Image
            height={170}
            alt="error"
            src={"/404.svg"}
            width={170}
            className="w-24 h-24 xl:w-32 xl:h-32"
          />
        </div>
        <div className="mt-4 text-center">
          <p className="font-semibold text-white">
            الصفحة غير موجودة
          </p>
          <Link
            href={"/"}
            aria-label="home"

          >
            <button
              type="submit"
              className="bg-accent mt-5 text-white px-4 py-2 rounded hover:bg-accent-hover  ease-in duration-300"
            >
              الرئيسية
            </button>

          </Link>
        </div>

      </div>
    </div>
  );
}
