"use client";
import { ImagBuilding } from "../links";
import EditBSlide from "../Slide/EditBSlide";
import { useForm } from "react-hook-form";
import axios from "axios";
import apiUrl from "@/utils/apiConfig";
import { ApiOfferTypes, GetToken } from "@/utils/API";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PiTrashDuotone, PiPlusCircleDuotone } from "react-icons/pi";
import { useRef, useState, useEffect } from "react";
import { useConfirmationAlert } from "../sweetalert/useConfirmationAlert";

export default function BBuilding({ building }: any) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photo, setPhoto] = useState("");
  const [offer, setOffer] = useState<any[]>([]); // To hold offer types
  const [selectedOffer, setSelectedOffer] = useState<any>(building.offer || ""); // For selected offer type
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showConfirmation } = useConfirmationAlert();

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

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: building.title,
      description: building.description,
      tabu: building.tabu,
      area: building.area,
      num_of_apartments: building.property_object.num_of_apartments,
      num_of_floors: building.property_object.num_of_floors,
      direction: building.property_object.direction,
      price: building.price,
      offer: building.offer || "",
      months: building.duration_in_months || "",
    },
  });

  useEffect(() => {
    async function fetchData() {
      const offerTypes = await ApiOfferTypes();
      setOffer(offerTypes);
      setSelectedOffer(building.offer || ""); // Initialize with the building's offer type
    }
    fetchData();
  }, [building.offer]);
  useEffect(() => {
    // Map the offer from apartment to selectedOffer
    if (building.offer) {
      // Map the offer value to the corresponding option value if needed
      const offerValue =
        offer.find((item: any) => item.offer === building.offer)?.id || "";
      setSelectedOffer(offerValue);
    }
  }, [building.offer, offer]);

  const handleOfferChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOffer(Number(e.target.value));
  };

  const onSubmit = async (data: any) => {
    await showConfirmation(async () => {
      let token = GetToken();
      let headersList = {
        Accept: "*/*",
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      };

      let bodyContent = {
        property: {
          area: Number(data.area),
          price: Number(data.price),
          title: data.title,
          description: data.description,
          tabu: tabuMapping[data.tabu],
          offer: Number(selectedOffer),
          duration_in_months: data.months,
        },
        num_of_apartments: Number(data.num_of_apartments),
        num_of_floors: Number(data.num_of_floors),
        direction: data.direction,
      };

      try {
        await axios.patch(`${apiUrl}/buildings/${building.id}/`, bodyContent, {
          headers: headersList,
        });
        toast.success("تم تعديل البيانات بنجاح");
        router.replace(`/propertys/${building.id}`);
      } catch (error) {
        console.error("Error updating data:", error);
        toast.error("فشل في ارسال البيانات");
      }
    });
  };

  const tabuMapping: any = {
    "طابو أخضر ( السجل العقاري )": 1,
    "إقرار محكمة": 2,
    "كاتب عدل": 3,
    "حكم قطعي": 4,
    "سجل مؤقت": 5,
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

  let imagee: any;
  imagee = building.photos;
  let im = false;
  if (building.photos.length === 0 || building.photos.length === 1) {
    im = false;
  } else {
    im = true;
  }
  return (
    <div className="flex flex-col xl:flex-row justify-center  items-center mt-10 gap-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-start items-start"
      >
        <div className="w-full">
          <div className="mb-4 w-full">
            <label className="block text-white font-semibold text-sm mb-2">
              العنوان :
            </label>
            <input
              type="text"
              placeholder="العنوان"
              className="w-80 xl:w-[850px] border p-2 rounded-lg bg-body border-body text-white"
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
              className="w-80 xl:w-[850px] border p-2 rounded-lg bg-body border-body text-white"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="text-red-500">هذا الحقل مطلوب</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold text-sm mb-2">
              الملكية :
            </label>
            <select
              className="w-80 xl:w-[850px] h-11 border pr-2 rounded-lg bg-body border-body text-white"
              {...register("tabu", { required: true })}
            >
              <option value="طابو أخضر ( السجل العقاري )">
                طابو أخضر ( السجل العقاري )
              </option>
              <option value="إقرار محكمة">إقرار محكمة</option>
              <option value="كاتب عدل">كاتب عدل</option>
              <option value="حكم قطعي">حكم قطعي</option>
              <option value="سجل مؤقت">سجل مؤقت</option>
            </select>
            {errors.tabu && <p className="text-red-500">هذا الحقل مطلوب</p>}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-3">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                المساحة :
              </label>
              <input
                type="text"
                placeholder="المساحة"
                className="w-40 xl:w-[417px] border p-2 rounded-lg bg-body border-body text-white"
                {...register("area", { required: true })}
              />
              {errors.area && <p className="text-red-500">هذا الحقل مطلوب</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                عدد الشقق :
              </label>
              <input
                type="text"
                placeholder="عدد الشقق"
                className="w-40 xl:w-[417px] border p-2 rounded-lg bg-body border-body text-white"
                {...register("num_of_apartments", { required: true })}
              />
              {errors.num_of_apartments && (
                <p className="text-red-500">هذا الحقل مطلوب</p>
              )}
            </div>
          </div>
          <div className="flex w-full flex-row justify-center items-center gap-1 xl:gap-3">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                عدد الطوابق :
              </label>
              <input
                type="text"
                placeholder="عدد الطوابق"
                className="w-40 xl:w-[417px] border p-2 rounded-lg bg-body border-body text-white"
                {...register("num_of_floors", { required: true })}
              />
              {errors.num_of_floors && (
                <p className="text-red-500">هذا الحقل مطلوب</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                الإتجاه :
              </label>
              <select
                className="w-40 xl:w-[417px] h-10 border pr-2 rounded-lg bg-body border-body text-white"
                {...register("direction", { required: true })}
              >
                {directionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.direction && (
                <p className="text-red-500">هذا الحقل مطلوب</p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-4">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                نوع العرض :
              </label>
              <div>
                <select
                  className="w-40 xl:w-[417px] h-11 border pr-2 rounded-lg bg-body border-body text-white"
                  value={selectedOffer}
                  onChange={handleOfferChange}
                >
                  {offer.map((offerItem: any) => (
                    <option key={offerItem.id} value={offerItem.id}>
                      {offerItem.offer}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={`${selectedOffer === 1 ? "hidden" : ""} mb-4`}>
              <label className="block text-white font-semibold text-sm mb-2">
                مدة {selectedOffer === 2 ? "الإجار" : "الرهن"} :{" "}
                <span className="text-gray-400 text-sm">
                  {" "}
                  {selectedOffer === 2 ? "(بالأشهر)" : "(بالسنوات)"}
                </span>
              </label>
              <input
                type="text"
                placeholder="مدة العرض"
                className="w-40 xl:w-[417px] border p-2 rounded-lg bg-body border-body text-white"
                {...register("months", { required: selectedOffer !== "1" })}
              />
              {errors.months && <p className="text-red-500">هذا الحقل مطلوب</p>}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-4">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                السعر :
              </label>
              <input
                type="text"
                placeholder="السعر"
                className="w-40 xl:w-full border p-2 rounded-lg bg-body border-body text-white"
                {...register("price", { required: true })}
              />
              {errors.price && <p className="text-red-500">هذا الحقل مطلوب</p>}
            </div>
          </div>
          <button
            type="submit"
            className=" xl:w-40 bg-accent hover:bg-accent-hover text-white  py-2 px-4 rounded"
          >
            تعديل المعلومات
          </button>
        </div>
      </form>
    </div>
  );
}
