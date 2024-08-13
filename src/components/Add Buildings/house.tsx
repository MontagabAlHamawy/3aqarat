"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import apiUrl from "@/utils/apiConfig";
import { ApiCities, ApiOfferTypes, GetToken } from "@/utils/API";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useConfirmationAlert } from "../sweetalert/useConfirmationAlert";
import dynamic from "next/dynamic";

const MapForProperty = dynamic(() => import("../map/MapForProperty"), {
  ssr: false,
});

export default function PropertyForm() {
  const [offerTypes, setOfferTypes] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<number>(1);
  const [geoAddress, setGeoAddress] = useState<string | null>(null);
  const { showConfirmation } = useConfirmationAlert();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      area: "",
      price: "",
      num_of_rooms: "",
      num_of_floors: "",
      garden_area: "",
      direction: "N",
      city: 1,
      offer: 1,
      region: "",
      street: "",
      addressDescription: "",
      duration: "",
      tabu: 1,
    },
  });

  const formData = watch();

  useEffect(() => {
    async function fetchData() {
      const offers = await ApiOfferTypes();
      const cityList = await ApiCities();
      setOfferTypes(offers);
      setCities(cityList);
    }
    fetchData();
  }, []);

  const handleOfferChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOffer(Number(e.target.value));
  };

  const onSubmit = async (data: any) => {
    await showConfirmation(async () => {
      const token = GetToken();
      const headers = {
        Accept: "*/*",
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      };

      const bodyContent = {
        property: {
          area: Number(data.area),
          price: Number(data.price),
          title: data.title,
          duration_in_months: selectedOffer === 1 ? 0 : Number(data.duration),
          description: data.description,
          tabu: Number(data.tabu),
          offer: selectedOffer,
          address: {
            region: data.region,
            street: data.street,
            description: data.addressDescription,
            geo_address: geoAddress || "",
            city: Number(data.city),
          },
        },
        num_of_rooms: Number(data.num_of_rooms),
        num_of_floors: Number(data.num_of_floors),
        garden_area: Number(data.garden_area),
        direction: data.direction,
      };
      console.log("bodyContent: ", bodyContent);

      try {
        const response = await axios.post(`${apiUrl}/houses/`, bodyContent, {
          headers,
        });

        if (response.status === 201) {
          toast.success("تم إضافة المنزل بنجاح!");
          router.push(`/propertys/edit-property/photo?url=${response.data.property.id}`);
        } else {
          toast.error("حدث خطأ أثناء إضافة المنزل.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("حدث خطأ أثناء إضافة المنزل.");
      }
    });
  };

  return (
    <div className="">
      <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <div className="mb-4">
            <label className="block text-white font-semibold text-sm mb-2">العنوان :</label>
            <input
              type="text"
              {...register("title", { required: "هذا الحقل مطلوب" })}
              placeholder="العنوان"
              className="w-80 xl:w-[850px] border p-2 rounded-lg bg-section border-section text-white"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold text-sm mb-2">الوصف :</label>
            <textarea
              {...register("description", { required: "هذا الحقل مطلوب" })}
              placeholder="الوصف"
              className="w-80 xl:w-[850px] border p-2 rounded-lg bg-section border-section text-white"
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold text-sm mb-2">الملكية :</label>
            <select
              {...register("tabu", { required: "هذا الحقل مطلوب" })}
              className="w-80 xl:w-[850px] h-11 border pr-2 rounded-lg bg-section border-section text-white"
            >
              <option value="0">طابو أخضر ( السجل العقاري )</option>
              <option value="1">إقرار محكمة</option>
              <option value="2">كاتب عدل</option>
              <option value="3">حكم قطعي</option>
              <option value="4">سجل مؤقت</option>
            </select>
            {errors.tabu && <p className="text-red-500">{errors.tabu.message}</p>}
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-14">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">المساحة :</label>
              <input
                type="text"
                {...register("area", { required: "هذا الحقل مطلوب" })}
                placeholder="المساحة"
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
              {errors.area && <p className="text-red-500">{errors.area.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">عدد الغرف :</label>
              <input
                type="text"
                {...register("num_of_rooms", { required: "هذا الحقل مطلوب" })}
                placeholder="عدد الغرف"
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
              {errors.num_of_rooms && <p className="text-red-500">{errors.num_of_rooms.message}</p>}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-14">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">عدد الطوابق :</label>
              <input
                type="text"
                {...register("num_of_floors", { required: "هذا الحقل مطلوب" })}
                placeholder="عدد الطوابق"
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
              {errors.num_of_floors && <p className="text-red-500">{errors.num_of_floors.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">مساحة الحديقة :</label>
              <input
                type="text"
                {...register("garden_area", { required: "هذا الحقل مطلوب" })}
                placeholder="مساحة الحديقة"
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
              {errors.garden_area && <p className="text-red-500">{errors.garden_area.message}</p>}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-14">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">السعر :</label>
              <input
                type="text"
                {...register("price", { required: "هذا الحقل مطلوب" })}
                placeholder="السعر"
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
              {errors.price && <p className="text-red-500">{errors.price.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">المدينة :</label>
              <select
                {...register("city", { required: "هذا الحقل مطلوب" })}
                className="w-40 xl:w-[397px] h-11 border pr-2 rounded-lg bg-section border-section text-white"
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name_ar}
                  </option>
                ))}
              </select>
              {errors.city && <p className="text-red-500">{errors.city.message}</p>}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-14">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">المنطقة :</label>
              <input
                type="text"
                {...register("region", { required: "هذا الحقل مطلوب" })}
                placeholder="المنطقة"
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
              {errors.region && <p className="text-red-500">{errors.region.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">الشارع :</label>
              <input
                type="text"
                {...register("street", { required: "هذا الحقل مطلوب" })}
                placeholder="الشارع"
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
              {errors.street && <p className="text-red-500">{errors.street.message}</p>}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-14">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">أقرب نقطة :</label>
              <input
                type="text"
                {...register("addressDescription", { required: "هذا الحقل مطلوب" })}
                placeholder="أقرب نقطة"
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
              {errors.addressDescription && <p className="text-red-500">{errors.addressDescription.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">نوع العرض :</label>
              <select
                {...register("offer", { required: "هذا الحقل مطلوب" })}
                value={selectedOffer}
                onChange={handleOfferChange}
                className="w-40 xl:w-[397px] h-11 border pr-2 rounded-lg bg-section border-section text-white"
              >
                {offerTypes.map((offer) => (
                  <option key={offer.id} value={offer.id}>
                    {offer.offer}
                  </option>
                ))}
              </select>
              {errors.offer && <p className="text-red-500">{errors.offer.message}</p>}
            </div>
          </div>
          <div className={`flex flex-row justify-center items-center gap-1 xl:gap-14 ${selectedOffer === 0 ? "hidden" : ""}`}>
            <div className={`${selectedOffer === 1 ? "hidden" : ""} mb-4`}>
              <label className="block text-white font-semibold text-sm mb-2">
                مدة {selectedOffer === 2 ? "الإيجار" : "الرهن"} :{" "}
                <span className="text-gray-400 text-sm">
                  {" "}
                  {selectedOffer === 2 ? "(بالأشهر)" : "(بالسنوات)"}
                </span>
              </label>
              <input
                type="text"
                {...register("duration", { required: selectedOffer === 2 ? "هذا الحقل مطلوب" : false })}
                placeholder="مدة العرض"
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
              {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
            </div>
          </div>
        </div>
        <div className="w-full m-0 my-6 flex flex-col gap-2">
          <span className="text-gray-400 text-base mb-[-2px]">
            قم بالنقر على الخارطة لتحديد مكان العقار
          </span>
          <MapForProperty onAddressSelect={setGeoAddress} />
        </div>
        <div className="mb-4 flex justify-start items-center">
          <button
            type="submit"
            className="w-[40] h-11 border p-2 rounded-md bg-accent border-accent hover:bg-accent-hover text-white"
          >
            إضافة المنزل
          </button>
        </div>
      </form>
    </div>
  );
}
