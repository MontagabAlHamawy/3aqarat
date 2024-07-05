import AllBolgs from '@/components/BuildingCom/AllBlogs'
import { Blogs } from '@/components/links'
import React from 'react'
Blogs

export default function page() {
  return (
    <div className="mx-2 xl:mx-0 xl:ml-3">
      <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
        <h1 className="text-2xl">المدونة</h1>
      </div>
      <AllBolgs Blogs={Blogs} />
    </div>
  )
}
