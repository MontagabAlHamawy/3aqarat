"use client";
import { PiPlusCircleDuotone, PiTrashDuotone } from "react-icons/pi";
import { useRef, useState } from "react";
import Image from "next/image";

export default function Apartment() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles(files);
    const fileReaders = files.map((file) => {
      const reader = new FileReader();
      return new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(fileReaders).then((loadedPhotos) => setPhotos(loadedPhotos));
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const directionOptions = [
    { value: "N", label: "شمالي" },
    { value: "E", label: "شرقي" },
    { value: "S", label: "جنوبي" },
    { value: "W", label: "غربي" },
    { value: "NE", label: "شمالي شرقي" },
    { value: "NW", label: "شمالي غربي" },
    { value: "SE", label: "جنوبي شرقي" },
    { value: "SW", label: "جنوبي غربي" },
  ];

  const cities = [
    { id: 1, name: "مدينة 1" },
    { id: 2, name: "مدينة 2" },
    { id: 3, name: "مدينة 3" },
  ];

  return (
    <div className="flex flex-col xl:flex-row justify-center xl:justify-start items-center xl:items-start mt-10 gap-x-2 xl:gap-4">
      <div>
        <div className="flex flex-wrap items-start gap-2">
          {photos.map((photo, index) => (
            <div key={index} className="relative">
              <Image
                src={photo}
                width={300}
                height={200}
                alt="user"
                className="rounded-md"
              />
              <button
                onClick={() => setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index))}
                className="p-1 w-max h-max bg-red-600 cursor-pointer rounded-md absolute top-1 right-1"
              >
                <PiTrashDuotone size={30} />
              </button>
            </div>
          ))}
          <button
            onClick={handleIconClick}
            className="flex justify-center items-center w-40 h-28 xl:w-72 xl:h-40 rounded-md bg-sidpar text-4xl text-accent cursor-pointer"
          >
            <PiPlusCircleDuotone size={50} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            multiple
            onChange={handleFileChange}
          />
        </div>
      </div>
      <form className="flex flex-col justify-start items-start">
        <div className="w-full">
          <div className="mb-4 w-full">
            <label className="block text-white font-semibold text-sm mb-2">
              العنوان :
            </label>
            <input
              type="text"
              placeholder="العنوان"
              className="w-80 xl:w-full border p-2 rounded-lg bg-section border-section text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold text-sm mb-2">
              الوصف :
            </label>
            <textarea
              placeholder="الوصف"
              className="w-80 xl:w-full border p-2 rounded-lg bg-section border-section text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold text-sm mb-2">
              الملكية :
            </label>
            <select
              className="w-80 xl:w-full h-11 border pr-2 rounded-lg bg-section border-section text-white"
            >
              <option value="طابو أخضر ( السجل العقاري )">
                طابو أخضر ( السجل العقاري )
              </option>
              <option value="إقرار محكمة">إقرار محكمة</option>
              <option value="كاتب عدل">كاتب عدل</option>
              <option value="حكم قطعي">حكم قطعي</option>
              <option value="سجل مؤقت">سجل مؤقت</option>
            </select>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-4">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                المساحة :
              </label>
              <input
                type="text"
                placeholder="المساحة"
                className="w-40 xl:w-52 border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                عدد الغرف :
              </label>
              <input
                type="text"
                placeholder="عدد الغرف"
                className="w-40 xl:w-52 border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-4">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                الطابق :
              </label>
              <input
                type="text"
                placeholder="الطابق"
                className="w-40 xl:w-52 border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                الاتجاه :
              </label>
              <select
                className="w-40 xl:w-52 h-11 border pr-2 rounded-lg bg-section border-section text-white"
              >
                {directionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-4">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                السعر :
              </label>
              <input
                type="text"
                placeholder="السعر"
                className="w-40 xl:w-52 border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                عدد الشهور :
              </label>
              <input
                type="text"
                placeholder="عدد الشهور"
                className="w-40 xl:w-52 border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-4">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                المنطقة :
              </label>
              <input
                type="text"
                placeholder="المنطقة"
                className="w-40 xl:w-52 border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                الشارع :
              </label>
              <input
                type="text"
                placeholder="الشارع"
                className="w-40 xl:w-52 border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-4">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                وصف العنوان :
              </label>
              <input
                type="text"
                placeholder="وصف العنوان"
                className="w-40 xl:w-52 border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                المدينة :
              </label>
              <select
                className="w-40 xl:w-52 h-11 border pr-2 rounded-lg bg-section border-section text-white"
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-4">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                اللات :
              </label>
              <input
                type="text"
                placeholder="اللات"
                className="w-40 xl:w-52 border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                اللونج :
              </label>
              <input
                type="text"
                placeholder="اللونج"
                className="w-40 xl:w-52 border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
