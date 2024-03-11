"use client";
import React, { useState } from "react";
import { PiMagnifyingGlassDuotone, PiMinus, PiPlus } from "react-icons/pi";
import Image from "next/image";
import { houses } from "../components/links";
import Link from "next/link";

export default function Search(): JSX.Element {
  const initialPrice: number = 10000000;
  const [price, setPrice] = useState<number>(initialPrice);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value, 10));
  };

  const increasePrice = () => {
    setPrice((prevPrice) => prevPrice + 50000);
  };

  const decreasePrice = () => {
    setPrice((prevPrice) => Math.max(initialPrice, prevPrice - 50000));
  };

  const formatPrice = (value: number): string => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + "K";
    } else {
      return value.toString();
    }
  };

  return (
    <div>
      <div className="flex flex-col xl:flex-row gap-5 justify-center xl:justify-between items-center bg-section xl:mr-[-16px] mt-[-40px] xl:px-6 h-full py-10 xl:py-0 xl:h-16">
        <div className="flex flex-row items-center justify-center gap-1">
          <input
            type="text"
            placeholder="اسم المنطقة"
            className="bg-secondary text-white rounded-md px-1 h-8 focus:outline-none"
          />
          <button type="submit" className="p-2 bg-body rounded-md">
            <PiMagnifyingGlassDuotone />
          </button>
        </div>
        <div>
          <select className="bg-secondary text-white rounded-md px-1 h-8 focus:outline-none">
            <option value="sale">للبيع</option>
            <option value="rent">للإيجار</option>
            <option value="mortgage">للرهن</option>
          </select>
        </div>
        <div>
          <select className="bg-secondary text-white rounded-md px-1 h-8 focus:outline-none">
            <option value="house">منزل</option>
            <option value="flat">شقة</option>
            <option value="building">محضر</option>
            <option value="store">محل</option>
            <option value="land">أرض</option>
          </select>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={decreasePrice}
              className="text-white flex items-center p-2 bg-body rounded-md"
            >
              <PiMinus />
            </button>
            <input
              type="range"
              min="0"
              max="100000000"
              step="1"
              className="w-40 focus:outline-none"
              value={price}
              onChange={handlePriceChange}
            />
            <button
              onClick={increasePrice}
              className="text-white p-2 bg-body rounded-md"
            >
              <PiPlus />
            </button>
            <span className="text-white">{formatPrice(price)}</span>
          </div>
        </div>
      </div>
      <div className="flex  justify-center">
        <div className="w-full overflow-y-auto">
          <div className="flex flex-col xl:flex-row">
            <div className="sticky xl:w-2/3">
              <div className="flex justify-center items-center mt-10 xl:h-[70vh]  bg-section mx-2 xl:mx-0 xl:ml-4 rounded-md relative cursor-pointer">
                <div className="flex flex-col gap-3 absolute top-2 right-2">
                  <p className="bg-body rounded-md p-2">
                    <PiPlus />
                  </p>
                  <p className="bg-body rounded-md p-2">
                    <PiMinus />
                  </p>
                </div>
                <Image
                  src={"/map.jpg"}
                  width={950}
                  height={0}
                  alt="map"
                  className="rounded-md"
                />
              </div>
            </div>
            <div className="xl:w-1/3 p-4">
              {houses.map((house, index) => {
                return (
                  <Link
                    href={house.link}
                    key={index}
                    className="bg-sidpar rounded-xl flex flex-row justify-between items-center my-3 p-1"
                  >
                    <div className="flex gap-1 flex-col">
                      <p className="text-xl">{house.title}</p>
                      <p className="text-sm font-thin">{house.discrep}</p>
                      <div>
                        <p className="text-accent">{house.prise}</p>
                      </div>
                    </div>
                    <div>
                      <Image
                        src={house.img}
                        width={130}
                        height={0}
                        alt="house"
                        className="rounded-md h-24 w-40"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
