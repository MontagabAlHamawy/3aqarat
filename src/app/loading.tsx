/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

export default function Loading() {

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full mt-20 xl:mt-40">
            <div className="flex flex-col items-center justify-center ">
                <div className="animate-waving-hand opacity-100 transform translate-y-0 duration-300">
                    <Image
                        src={'/hand.svg'}
                        width={20}
                        height={20}
                        alt="Welcome"
                        className="w-24 h-24 xl:w-32 xl:h-32" />
                </div>
                <div className="mt-4 text-center">
                    <p className="text-lg font-semibold text-white">
                    تحميل...
                    </p>
                    <p className="text-sm text-gray-500">
                        نحن نقوم بإعداد المحتوى الخاص بك.
                    </p>
                </div>
            </div>
        </div>
    )
}