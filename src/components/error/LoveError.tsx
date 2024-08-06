import React from 'react'
import { PiHeartDuotone } from 'react-icons/pi'

export default function LoveError() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full mt-20 xl:mt-32">
      <div className="flex flex-col items-center justify-center ">
        <div className="text-accent">
          <PiHeartDuotone size={160} />
        </div>
        <div className="text-center">
          <p className="text-lg xl:text-2xl font-semibold text-white">
            لا توجد مفضلة لعرضها
          </p>
        </div>
      </div>
    </div>
  )
}

