/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { PiHandDuotone } from 'react-icons/pi'

export default function Loading() {

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full mt-20 xl:mt-32">
            <div className="flex flex-col items-center justify-center ">
                <div className="animate-waving-hand opacity-100 transform translate-y-0 duration-100 text-accent">
                    <PiHandDuotone size={160} />
                </div>
                <div className="mt-1 text-center">
                    <p className="text-lg xl:text-2xl font-semibold text-white">
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