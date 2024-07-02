import React from 'react'
import { PiBuildingsDuotone } from 'react-icons/pi'

export default function LoveLoade() {
  return (
    <div className="bg-sidpar mt-5 flex flex-col gap-5 justify-center items-center h-max py-10 rounded-md">
      <div className="text-[90px]">
        <PiBuildingsDuotone />
      </div>
      <h1 className="text-2xl">لا توجد عقارات لعرضها</h1>
    </div>
  )
}
