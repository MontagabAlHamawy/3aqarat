import React from 'react'
import { PiBuildingsDuotone } from 'react-icons/pi'

export default function SingleBuildingLoade() {
  return (
    <div className="mx-2 my-5 ml-2 xl:ml-3 xl:mx-0">
        <div className="bg-sidpar flex flex-col gap-5 justify-center items-center h-max py-10 rounded-md">
          <div className="text-[90px] text-accent  animate-waving-hand opacity-100 transform translate-y-0 duration-100">
            <PiBuildingsDuotone />
          </div>
          <h1 className="text-lg xl:text-2xl">جاري جلب معلومات العقار...</h1>
        </div>
      </div>
  )
}
