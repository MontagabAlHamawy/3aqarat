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

export default function CommercialProperty() {
  const [offer, setOffer] = useState<any[]>([]);
  const [city, setCity] = useState<any[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<any>(1);
  const [geoAddress, setGeoAddress] = useState<string | null>(null);
  const { showConfirmation } = useConfirmationAlert();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      area: "",
      price: "",
      floor_number: "",
      direction: "N",
      city: 1,
      offer: 1,
      region: "",
      street: "",
      addressDescription: "",
      duration_in_months: "",
      tabu: 1,
    },
  });

  const formData = watch();

  useEffect(() => {
    async function fetchData() {
      const offerData = await ApiOfferTypes();
      const City = await ApiCities();
      setOffer(offerData);
      setCity(City);
    }
    fetchData();
  }, []);

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
          duration_in_months: selectedOffer === 1 ? 0 : Number(data.duration_in_months),
          description: data.description,
          tabu: data.tabu,
          offer: selectedOffer,
          address: {
            region: data.region,
            street: data.street,
            description: data.addressDescription,
            geo_address: geoAddress,
            city: Number(data.city),
          },
        },
        direction: data.direction,
        floor_number: Number(data.floor_number),
      };

      try {
        const response = await axios.post(`${apiUrl}/commercial-properties/`, bodyContent, {
          headers: headersList,
        });

        if (response.status === 201) {
          toast.success("تم إضافة المحل بنجاح!");
          router.push(`/propertys/edit-property/photo?url=${response.data.property.id}`);
        } else {
          toast.error("حدث خطأ أثناء إضافة المحل.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("حدث خطأ أثناء إضافة المحل.");
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
              <option value="1">طابو أخضر ( السجل العقاري )</option>
              <option value="2">إقرار محكمة</option>
              <option value="3">كاتب عدل</option>
              <option value="4">حكم قطعي</option>
              <option value="5">سجل مؤقت</option>
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
              <label className="block text-white font-semibold text-sm mb-2">رقم الطابق :</label>
              <input
                type="text"
                {...register("floor_number", { required: "هذا الحقل مطلوب" })}
                placeholder="الطابق الأرضي 0"
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
              {errors.floor_number && <p className="text-red-500">{errors.floor_number.message}</p>}
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
              <label className="block text-white font-semibold text-sm mb-2">الاتجاه :</label>
              <select
                {...register("direction", { required: "هذا الحقل مطلوب" })}
                className="w-40 xl:w-[397px] h-11 border pr-2 rounded-lg bg-section border-section text-white"
              >
                <option value="N">شمالي</option>
                <option value="E">شرقي</option>
                <option value="S">جنوبي</option>
                <option value="W">غربي</option>
                <option value="NE">شمالي شرقي</option>
                <option value="NW">شمالي غربي</option>
                <option value="SE">جنوبي شرقي</option>
                <option value="SW">جنوبي غربي</option>
              </select>
              {errors.direction && <p className="text-red-500">{errors.direction.message}</p>}
            </div>

          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-14">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">المدينة :</label>
              <select
                {...register("city", { required: "هذا الحقل مطلوب" })}
                className="w-40 xl:w-[397px] h-11 border pr-2 rounded-lg bg-section border-section text-white"
              >
                {city.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name_ar}
                  </option>
                ))}
              </select>
              {errors.city && <p className="text-red-500">{errors.city.message}</p>}
            </div>
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
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-14">
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
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">أقرب نقطة :</label>
              <input
                type="text"
                {...register("addressDescription", { required: "هذا الحقل مطلوب" })}
                placeholder="أقرب نقطة "
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
              {errors.addressDescription && <p className="text-red-500">{errors.addressDescription.message}</p>}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-14">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">نوع العرض :</label>
              <select
                {...register("offer", { required: "هذا الحقل مطلوب" })}
                value={selectedOffer}
                onChange={handleOfferChange}
                className="w-40 xl:w-[397px] h-11 border pr-2 rounded-lg bg-section border-section text-white"
              >
                {offer.map((o: any) => (
                  <option key={o.id} value={o.id}>
                    {o.offer}
                  </option>
                ))}
              </select>
              {errors.offer && <p className="text-red-500">{errors.offer.message}</p>}
            </div>
            <div className="flex flex-row justify-center items-center gap-1 xl:gap-14">
              <div className={`${selectedOffer === 1 ? "hidden" : ""} mb-4`}>
                <label className="block text-white font-semibold text-sm mb-2">
                  مدة {selectedOffer === 2 ? "الإيجار" : "الرهن"} :{" "}
                  <span className="text-gray-400 text-sm">
                    {selectedOffer === 2 ? "(بالأشهر)" : "(بالسنوات)"}
                  </span>
                </label>
                <input
                  type="text"
                  {...register("duration_in_months", { required: selectedOffer === 2 ? "هذا الحقل مطلوب" : false })}
                  placeholder="مدة العرض"
                  className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
                />
                {errors.duration_in_months && <p className="text-red-500">{errors.duration_in_months.message}</p>}
              </div>
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
            إضافة المحل
          </button>
        </div>
      </form>
    </div>
  );
}
