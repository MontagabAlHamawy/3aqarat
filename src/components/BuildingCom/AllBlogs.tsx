"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import BlogError from "../error/BlogError";

export default function AllBolgs({ Blogs }: any) {
  if (!Blogs || Blogs.length === 0) {
    return <BlogError />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-5 gap-y-5 xl:gap-x-16 xl:gap-y-10 ml-5 my-5 w-full">
        {Blogs.map((blog: any) => {
          return (
            <Link
              href={`/blog/${blog.id}`}
              key={blog.id}
              className="bg-sidpar rounded-xl relative"
            >
              <Image
                src={blog.image}
                width={1000}
                height={0}
                alt="montagab"
                className="w-[1080px] h-36 xl:h-48 rounded-tl-xl rounded-tr-xl"
              />
              <p className="text-xl mb-2 xl:text-2xl text-accent mt-2 px-2 xl:px-5">
                {blog.title}
              </p>
              <p className="text-white text-base mb-2 font-light sm:my-2 px-2 xl:px-5">
                {blog.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
