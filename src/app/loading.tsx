import Image from "next/image";

export default function Loading() {

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full min-h-[71vh] md:min-h-[68vh] xl:min-h-[84.3vh]">
            <Image
                src={'/3aqarat1.png'}
                width={100}
                height={100}
                alt="logo" />
            <p className="text-accent text-2xl ">جاري التحميل...</p>
        </div>
    )
}