import { ImagApartment, ImagBuilding } from "../links";
import EditBSlide from "../Slide/EditBSlide";
import { useForm } from "react-hook-form";
import axios from "axios";
import apiUrl from "@/utils/apiConfig";
import { GetToken } from "@/utils/API";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Apartment({ apartment }: any) {
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
      number_of_rooms: apartment.property_object.number_of_rooms,
      floor_number: apartment.property_object.floor_number,
      direction: apartment.property_object.direction,
      price: apartment.price,
    },
  });

  const tabuMapping: any = {
    "طابو أخضر ( السجل العقاري )": 1,
    "عقار حكم المحكمة": 2,
    "الملكية بموجب وكالة كاتب العدل غير قابلة للعزل": 3,
    "الملكية بعقد بيع قطعي فقط وساعة كهرباء": 4,
    "حصة من عقار على الشيوع": 5,
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
      number_of_rooms: Number(data.number_of_rooms),
      floor_number: Number(data.floor_number),
      direction: data.direction,
    };

    try {
      await axios.patch(`${apiUrl}/apartments/${apartment.id}/`, bodyContent, {
        headers: headersList,
      });

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
    imagee = ImagApartment;
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
        <div
          className={`grid grid-cols-2 mt-7  gap-x-2 gap-y-2 md:gap-x-3 xl:gap-x-10 xl:mb-6 ${
            im ? "block" : "hidden"
          }`}
        >
          {imagee.map((index: any, id: any) => {
            console.log(index);
            return (
              <div key={id}>
                <Image
                  src={index.photo}
                  width={300}
                  height={0}
                  alt={`Gallery Image`}
                  className="  object-center rounded-md cursor-pointer"
                />
              </div>
            );
          })}
        </div>
        <div className={`${!im ? "block" : "hidden"}`}>
          <Image
            src={imagee[0].photo}
            width={390}
            height={390}
            alt={`Gallery Image`}
            className="w-[500px] h-[300px] object-center rounded-md cursor-pointer"
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
              className="w-80 xl:w-full h-11 border p-2 rounded-lg bg-section border-section text-white"
              {...register("tabu", { required: true })}
            >
              <option value="طابو أخضر ( السجل العقاري )">
                طابو أخضر ( السجل العقاري )
              </option>
              <option value="عقار حكم المحكمة">عقار حكم المحكمة</option>
              <option value="الملكية بموجب وكالة كاتب العدل غير قابلة للعزل">
                الملكية بموجب وكالة كاتب العدل غير قابلة للعزل
              </option>
              <option value="الملكية بعقد بيع قطعي فقط وساعة كهرباء">
                الملكية بعقد بيع قطعي فقط وساعة كهرباء
              </option>
              <option value="حصة من عقار على الشيوع">
                حصة من عقار على الشيوع
              </option>
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
              {errors.number_of_rooms && (
                <p className="text-red-500">هذا الحقل مطلوب</p>
              )}
            </div>
          </div>
          <div className="flex w-full flex-row justify-center items-center gap-1 xl:gap-4">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                رقم الطابق :
              </label>
              <input
                type="text"
                placeholder="رقم الطابق"
                className="w-40 xl:w-full border p-2 rounded-lg bg-section border-section text-white"
                {...register("floor_number", { required: true })}
              />
              {errors.floor_number && (
                <p className="text-red-500">هذا الحقل مطلوب</p>
              )}
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
          <div className="mb-4">
            <button
              type="submit"
              className="w-full h-11 border p-2 rounded-md bg-accent border-accent hover:bg-accent-hover text-white"
            >
              تحديث البيانات
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
