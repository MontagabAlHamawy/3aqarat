"use client";
import { ImagLand } from "../links";
import EditBSlide from "../Slide/EditBSlide";
import { useForm } from "react-hook-form";
import axios from "axios";
import apiUrl from "@/utils/apiConfig";
import { ApiOfferTypes, GetToken } from "@/utils/API";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PiPlusCircleDuotone, PiTrashDuotone } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import { useConfirmationAlert } from "../sweetalert/useConfirmationAlert";

export default function Land({ apartment }: any) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photo, setPhoto] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showConfirmation } = useConfirmationAlert();
  const [offer, setOffer] = useState<any>([]);
  const [selectedOffer, setSelectedOffer] = useState<any>("");

  useEffect(() => {
    async function fetchData() {
      const offer = await ApiOfferTypes();
      setOffer(offer);
    }
    fetchData();
  }, []);
  useEffect(() => {
    // Map the offer from apartment to selectedOffer
    if (apartment.offer) {
      // Map the offer value to the corresponding option value if needed
      const offerValue =
        offer.find((item: any) => item.offer === apartment.offer)?.id || "";
      setSelectedOffer(offerValue);
    }
  }, [apartment.offer, offer]);
  const handleOfferChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOffer(Number(e.target.value));
  };

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
  } = useForm({
    defaultValues: {
      title: apartment.title,
      description: apartment.description,
      tabu: apartment.tabu,
      area: apartment.area,
      price: apartment.price,
      ooffer: apartment.offer,
      months: apartment.duration_in_months,
    },
  });

  useEffect(() => {
    if (apartment.offer === "بيع") {
      setSelectedOffer("1");
    } else if (apartment.offer === "إجار") {
      setSelectedOffer("2");
    } else if (apartment.offer === "رهن") {
      setSelectedOffer("3");
    }
  }, [apartment.offer]);

  const tabuMapping: any = {
    "طابو أخضر ( السجل العقاري )": 1,
    "إقرار محكمة": 2,
    "كاتب عدل": 3,
    "حكم قطعي": 4,
    "سجل مؤقت": 5,
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
      };
    

      try {
        await axios.patch(`${apiUrl}/lands/${apartment.id}/`, bodyContent, {
          headers: headersList,
        });
        toast.success("تم تعديل البيانات بنجاح");
        router.replace(`/buildings/${apartment.id}`);
      } catch (error) {
        console.error("Error updating data:", error);
        toast.error("فشل في ارسال البيانات");
      }
    });
  };

  let imagee: any;
  imagee = apartment.photos;
  let im = false;
  if (apartment.photos.length === 0 || apartment.photos.length === 1) {
    im = false;
  } else {
    im = true;
  }

  return (
    <div className="flex flex-col xl:flex-row  justify-center xl:justify-start items-center xl:items-start mt-10 gap-10">
      <div>
        <div className="grid  grid-cols-2 mt-7 mx-2  gap-x-2 gap-y-2 md:gap-x-3 xl:gap-x-3 xl:mb-6 ">
          {imagee.map((index: any, id: any) => {
            

            return (
              <div key={id} className="relative">
                <Image
                  src={index.photo}
                  width={300}
                  height={0}
                  alt={`Gallery Image`}
                  className={`object-center rounded-md cursor-pointer`}
                />
                <button
                  className={`${
                    imagee === ImagLand ? "hidden" : ""
                  } p-1 w-max h-max bg-red-600 cursor-pointer rounded-md absolute top-1 right-1`}
                >
                  <PiTrashDuotone size={30} />
                </button>
              </div>
            );
          })}
          <div className={`relative ${photo === "" ? "hidden" : "block"}`}>
            <Image
              src={photo}
              width={300}
              height={0}
              alt="user"
              className={` rounded-md`}
            />
            <button
              onClick={() => setPhoto("")}
              className={`p-1 w-max h-max bg-red-600 cursor-pointer rounded-md absolute top-1 right-1`}
            >
              <PiTrashDuotone size={30} />
            </button>
          </div>
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-start items-start"
      >
        <div className="w-full ">
          <div className="mb-4 w-full ">
            <label className="block text-white font-semibold text-sm mb-2 ">
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
            {errors.description && (
              <p className="text-red-500">هذا الحقل مطلوب</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold text-sm mb-2">
              الملكية :
            </label>
            <select
              className="w-80 xl:w-full h-11 border pr-2 rounded-lg bg-section border-section text-white"
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
                className="w-40 xl:w-52 border p-2 rounded-lg bg-section border-section text-white"
                {...register("area", { required: true })}
              />
              {errors.area && <p className="text-red-500">هذا الحقل مطلوب</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                نوع العرض :
              </label>
              <div>
                <select
                  className="w-40 xl:w-52 h-11 border pr-2 rounded-lg bg-section border-section text-white"
                  value={selectedOffer}
                  onChange={handleOfferChange}
                >
                  {offer.map((offer: any) => (
                    <option key={offer.id} value={offer.id}>
                      {offer.offer}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-3">
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
                className="w-40  xl:w-52 border p-2 rounded-lg bg-section border-section text-white"
                {...register("months", { required: true })}
              />
              {errors.months && <p className="text-red-500">هذا الحقل مطلوب</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                السعر :
              </label>
              <input
                type="text"
                placeholder="السعر"
                className="w-40 xl:w-52 border p-2 rounded-lg bg-section border-section text-white"
                {...register("price", { required: true })}
              />
              {errors.price && <p className="text-red-500">هذا الحقل مطلوب</p>}
            </div>
          </div>
        </div>
        <div className="xl:w-full xl:flex xl:justify-center">
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
