'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import BuildingFilter from './BuildingFilter'
import { toast } from 'react-toastify';

export default function AllBuildings({ Building }: any) {
    const [filterType, setFilterType] = useState("all");
    const [buildings, setBuildings] = useState([]);
    const fetchData = async (filter: string) => {
        try {
            if (!Building.ok) {
                throw new Error("خطاء في جلب البيانات");
            }
            setBuildings(Building)
            // setBuildings(data.filter((building: any) => filter === "all" || building.type === filter));
        } catch (error) {
            toast.error("خطاء في جلب البيانات");
        }
    };
  return (
    <div className="mx-2 xl:mx-0 xl:ml-3">
    <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
        <h1 className="text-2xl">العقارات</h1>
    </div>
    <BuildingFilter onFilterChange={setFilterType} />
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-5 xl:gap-x-16 xl:gap-y-10 ml-5 my-5 w-full">
        {Building.map((building: any) => (
            <Link
                href={`/buildings/${building.id}`}
                key={building.id}
                className="bg-sidpar rounded-xl relative"
            >
                <Image
                    src={`/home/gg.jpg`}
                    width={1000}
                    height={0}
                    alt="montagab"
                    className="w-[1080px] rounded-tl-xl rounded-tr-xl"
                />
                <div className="bg-accent text-white text-sm xl:text-lg px-2 py-1 rounded w-max mt-2 mx-2">
                    {building.property_object.property_type}
                </div>
                <p className="text-lg xl:text-xl text-accent mt-2 px-2 xl:px-5">
                    {building.title}
                </p>
                <p className="text-white text-sm font-light sm:my-2 px-2 xl:px-5">
                    {building.description}
                </p>
                <div className="flex flex-row justify-between  items-center my-3 px-2 xl:my-1 xl:mb-7">
                    <p className='text-accent'>{building.price}ل.س</p>
                </div>
                <div className="bg-accent text-white text-sm xl:text-lg px-2 py-1 rounded absolute top-2 right-2">
                    {building.offer}
                </div>
                
            </Link>
        ))}
    </div>
</div>
  )
}
