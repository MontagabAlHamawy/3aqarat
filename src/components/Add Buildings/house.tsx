"use client";
import { useForm } from "react-hook-form";
import { PiPlusCircleDuotone, PiTrashDuotone } from "react-icons/pi";
import { useRef, useState } from "react";
import Image from "next/image";

export default function House() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photo, setPhoto] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      tabu: "",
      area: "",
      number_of_rooms: "",
      floor_number: "",
      garden_area: "",
      direction: "",
      price: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
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

  return (
    <div className="flex flex-col xl:flex-row justify-center xl:justify-start items-center xl:items-start mt-10 gap-10">
      <div>
        <div className="grid grid-cols-2 mt-7 mx-2 gap-x-2 gap-y-2 md:gap-x-3 xl:gap-x-3 xl:mb-6 ">
          {photo && (
            <div className="relative">
              <Image
                src={photo}
                width={300}
                height={0}
                alt="Selected Image"
                className="object-center rounded-md"
              />
              <button
                onClick={() => setPhoto("")}
                className="p-1 w-max h-max bg-red-600 cursor-pointer rounded-md absolute top-1 right-1"
              >
                <PiTrashDuotone size={30} />
              </button>
            </div>
          )}
          <button
            onClick={handleIconClick}
            className="flex justify-center items-center w-40 h-28 xl:w-72 xl:h-40 rounded-md bg-sidpar text-4xl text-accent cursor-pointer"
          >
            <PiPlusCircleDuotone size={50} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start items-start">
        <div className="w-full ">
          <div className="mb-4 w-full ">
            <label className="block text-white font-semibold text-sm mb-2">
              العنوان :
            </label>
            <input
              type="text"
              placeholder="العنوان"
              className="w-80 xl:w-full border p-2 rounded-lg bg-section border-section text-white"
              {...register("title", { required: true })}
            />
            {errors.title && <p className="text-red-500">هذا الحقل مطلوب</p>}
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold text-sm mb-2">
              الوصف :
            </label>
            <textarea
              placeholder="الوصف"
              className="w-80 xl:w-full border p-2 rounded-lg bg-section border-section text-white"
              {...register("description", { required: true })}
            />
            {errors.description && <p className="text-red-500">هذا الحقل مطلوب</p>}
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold text-sm mb-2">
              الملكية :
            </label>
            <select
              className="w-80 xl:w-full h-11 border pr-2 rounded-lg bg-section border-section text-white"
              {...register("tabu", { required: true })}
            >
              <option value="طابو أخضر ( السجل العقاري )">طابو أخضر ( السجل العقاري )</option>
              <option value="إقرار محكمة">إقرار محكمة</option>
              <option value="كاتب عدل">كاتب عدل</option>
              <option value="حكم قطعي">حكم قطعي</option>
              <option value="سجل مؤقت">سجل مؤقت</option>
            </select>
            {errors.tabu && <p className="text-red-500">هذا الحقل مطلوب</p>}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-4">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                المساحة :
              </label>
              <input
                type="text"
                placeholder="المساحة"
                className="w-40 xl:w-full border p-2 rounded-lg bg-section border-section text-white"
                {...register("area", { required: true })}
              />
              {errors.area && <p className="text-red-500">هذا الحقل مطلوب</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                عدد الغرف :
              </label>
              <input
                type="text"
                placeholder="عدد الغرف"
                className="w-40 xl:w-full border p-2 rounded-lg bg-section border-section text-white"
                {...register("number_of_rooms", { required: true })}
              />
              {errors.number_of_rooms && <p className="text-red-500">هذا الحقل مطلوب</p>}
            </div>
          </div>
          <div className="flex w-full flex-row justify-center items-center gap-1 xl:gap-4">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                عدد الطوابق :
              </label>
              <input
                type="text"
                placeholder="رقم الطابق"
                className="w-40 xl:w-full border p-2 rounded-lg bg-section border-section text-white"
                {...register("floor_number", { required: true })}
              />
              {errors.floor_number && <p className="text-red-500">هذا الحقل مطلوب</p>}
            </div>
            <div className="mb-4 ">
              <label className="block text-white font-semibold text-sm mb-2">
                الإتجاه :
              </label>
              <select
                className="w-40 xl:w-52 h-10 border pr-2 rounded-lg bg-section border-section text-white"
                {...register("direction", { required: true })}
              >
                {directionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.direction && <p className="text-red-500">هذا الحقل مطلوب</p>}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-4">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                مساحة الحديقة :
              </label>
              <input
                type="text"
                placeholder="مساحة الحديقة"
                className="w-40 xl:w-full border p-2 rounded-lg bg-section border-section text-white"
                {...register("garden_area", { required: true })}
              />
              {errors.garden_area && <p className="text-red-500">هذا الحقل مطلوب</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                السعر :
              </label>
              <input
                type="text"
                placeholder="السعر"
                className="w-40 xl:w-full border p-2 rounded-lg bg-section border-section text-white"
                {...register("price", { required: true })}
              />
              {errors.price && <p className="text-red-500">هذا الحقل مطلوب</p>}
            </div>
          </div>
        </div>
        <div className="mb-4 flex justify-start items-center">
          <button
            type="submit"
            className="w-full h-11 border p-2 rounded-md bg-accent border-accent hover:bg-accent-hover text-white"
          >
            حفظ البيانات
          </button>
        </div>
      </form>
    </div>
  );
}
