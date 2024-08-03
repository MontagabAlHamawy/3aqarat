import React from 'react'
import { PiBellSimpleDuotone } from 'react-icons/pi'

export default function NotificationLoade() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full mt-20 xl:mt-32">
      <div className="flex flex-col items-center justify-center ">
        <div className="animate-waving-hand opacity-100 text-accent transform translate-y-0 duration-100">
          <PiBellSimpleDuotone size={160} />
        </div>
        <div className="text-center">
          <p className="text-lg xl:text-2xl font-semibold text-white">
            جاري جلب الإشعارات...
          </p>
        </div>
      </div>
    </div>
  )
}
