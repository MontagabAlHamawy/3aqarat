import { ImagBuilding, ImagCommercials } from "../links";
import EditBSlide from "../Slide/EditBSlide";
import { useForm } from "react-hook-form";
import axios from "axios";
import apiUrl from "@/utils/apiConfig";
import { GetToken } from "@/utils/API";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Slide from "../Slide/Slide";
import Image from "next/image";
import { PiPlusCircleDuotone, PiTrashDuotone } from "react-icons/pi";

export default function Commercialproperty({ apartment }: any) {
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
      direction: apartment.property_object.direction,
      price: apartment.price,
    },
  });

  const tabuMapping: any = {
    "طابو أخضر ( السجل العقاري )": 1,
    "إقرار محكمة": 2,
    "كاتب عدل": 3,
    "حكم قطعي": 4,
    "سجل مؤقت": 5,
  };
  const onSubmit = async (data: any) => {
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
      },
      direction: data.direction,
    };

    try {
      await axios.patch(
        `${apiUrl}/commercial-properties/${apartment.id}/`,
        bodyContent,
        {
          headers: headersList,
        }
      );

      toast.success("تم تعديل البيانات بنجاح");
      router.replace(`/buildings/${apartment.id}`);
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("فشل في ارسال البيانات");
    }
  };

  let imagee;
  if (apartment.photos.length !== 0) {
    imagee = apartment.photos;
  } else {
    imagee = ImagCommercials;
  }

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
  let im = false;
  if (apartment.photos.length === 0 || apartment.photos.length === 1) {
    im = false;
  } else {
    im = true;
  }
  console.log("photo=", apartment.photos.length);
  console.log("im=", im);

  return (
    <div className="flex flex-col xl:flex-row  justify-center xl:justify-start items-center xl:items-start mt-10 gap-10">
      <div>
        <div className="grid  grid-cols-2 mt-7 mx-2  gap-x-2 gap-y-2 md:gap-x-3 xl:gap-x-10 xl:mb-6 ">
          {imagee.map((index: any, id: any) => {
            console.log(index);
            return (
              <div key={id} className="relative">
                <Image
                  src={index.photo}
                  width={300}
                  height={0}
                  alt={`Gallery Image`}
                  className="  object-center rounded-md cursor-pointer"
                />
                <div
                  className={`${
                    imagee === ImagCommercials ? "hidden" : "block"
                  }p-1 w-max h-max bg-red-600 cursor-pointer rounded-md absolute top-1 right-1`}
                >
                  <PiTrashDuotone size={30} />
                </div>
              </div>
            );
          })}
          <div className="flex justify-center items-center w-40 h-28 xl:w-72 xl:h-40 rounded-md bg-sidpar text-4xl text-accent cursor-pointer">
            <PiPlusCircleDuotone size={50} />
          </div>
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
              className="w-80 xl:w-full h-11 border p-2 rounded-lg bg-section border-section text-white"
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
              {errors.direction && (
                <p className="text-red-500">هذا الحقل مطلوب</p>
              )}
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
            className="w-full h-11 border p-2 rounded-md  bg-accent border-accent hover:bg-accent-hover text-white"
          >
            تحديث البيانات
          </button>
        </div>
      </form>
    </div>
  );
}
