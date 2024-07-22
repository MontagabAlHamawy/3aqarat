import { useForm } from "react-hook-form";
import axios from "axios";
import apiUrl from "@/utils/apiConfig";
import { GetToken } from "@/utils/API";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PiPlusCircleDuotone, PiTrashDuotone } from "react-icons/pi";
import { useRef, useState, useEffect } from "react";
import { useConfirmationAlert } from "../sweetalert/useConfirmationAlert";

export default function Apartment() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photo, setPhoto] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showConfirmation } = useConfirmationAlert();
  const [selectedOffer, setSelectedOffer] = useState<number | string>("");
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await axios.get(`${apiUrl}/cities/`);
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }

    fetchCities();
  }, []);

  const handleOfferChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOffer(e.target.value);
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
      title: "",
      description: "",
      tabu: "",
      area: "",
      number_of_rooms: "",
      floor_number: "",
      direction: "",
      price: "",
      months: "",
      region: "",
      street: "",
      address_description: "",
      geo_address: "",
      city: "",
    },
  });

  const tabuMapping: Record<string, number> = {
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
          duration_in_months: Number(data.months),
          address: {
            region: data.region,
            street: data.street,
            description: data.address_description,
            geo_address: data.geo_address,
            city: Number(data.city),
          },
          photos: selectedFile ? [{ photo: photo }] : [],
        },
        number_of_rooms: Number(data.number_of_rooms),
        floor_number: Number(data.floor_number),
        direction: data.direction,
      };

      try {
        await axios.post(`${apiUrl}/apartments/`, bodyContent, {
          headers: headersList,
        });
        toast.success("تمت إضافة العقار بنجاح");
        router.replace(`/buildings`);
      } catch (error) {
        console.error("Error adding property:", error);
        toast.error("فشل في إرسال البيانات");
      }
    });
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
        <div className="grid grid-cols-2 mt-7 mx-2 gap-x-2 gap-y-2 md:gap-x-3 xl:gap-x-3 xl:mb-6">
          {photo && (
            <div className="relative">
              <Image
                src={photo}
                width={300}
                height={0}
                alt="user"
                className="rounded-md"
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
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-4"></div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-4">
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
                عدد الغرف :
              </label>
              <input
                type="text"
                placeholder="عدد الغرف"
                className="w-40 xl:w-52 border p-2 rounded-lg bg-section border-section text-white"
                {...register("number_of_rooms", { required: true })}
              />
              {errors.number_of_rooms && (
                <p className="text-red-500">هذا الحقل مطلوب</p>
              )}
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
                {...register("floor_number", { required: true })}
              />
              {errors.floor_number && (
                <p className="text-red-500">هذا الحقل مطلوب</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                الاتجاه :
              </label>
              <select
                className="w-40 xl:w-52 h-11 border pr-2 rounded-lg bg-section border-section text-white"
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
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                عدد الشهور :
              </label>
              <input
                type="text"
                placeholder="عدد الشهور"
                className="w-40 xl:w-52 border p-2 rounded-lg bg-section border-section text-white"
                {...register("months", { required: true })}
              />
              {errors.months && (
                <p className="text-red-500">هذا الحقل مطلوب</p>
              )}
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
                {...register("region", { required: true })}
              />
              {errors.region && (
                <p className="text-red-500">هذا الحقل مطلوب</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                الشارع :
              </label>
              <input
                type="text"
                placeholder="الشارع"
                className="w-40 xl:w-52 border p-2 rounded-lg bg-section border-section text-white"
                {...register("street", { required: true })}
              />
              {errors.street && (
                <p className="text-red-500">هذا الحقل مطلوب</p>
              )}
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
                {...register("address_description", { required: true })}
              />
              {errors.address_description && (
                <p className="text-red-500">هذا الحقل مطلوب</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                العنوان على الخريطة :
              </label>
              <input
                type="text"
                placeholder="العنوان على الخريطة"
                className="w-40 xl:w-52 border p-2 rounded-lg bg-section border-section text-white"
                {...register("geo_address", { required: true })}
              />
              {errors.geo_address && (
                <p className="text-red-500">هذا الحقل مطلوب</p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-4">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                المدينة :
              </label>
              <select
                className="w-40 xl:w-52 h-11 border pr-2 rounded-lg bg-section border-section text-white"
                {...register("city", { required: true })}
              >
                {cities.map((city: any) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.city && <p className="text-red-500">هذا الحقل مطلوب</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                نوع العرض :
              </label>
              <select
                className="w-40 xl:w-52 h-11 border pr-2 rounded-lg bg-section border-section text-white"
                value={selectedOffer}
                onChange={handleOfferChange}
              >
                <option value="">اختر نوع العرض</option>
                <option value="1">عرض 1</option>
                <option value="2">عرض 2</option>
                <option value="3">عرض 3</option>
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          إرسال
        </button>
      </form>
    </div>
  );
}