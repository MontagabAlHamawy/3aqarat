import { ImagBuilding } from "../links";
import EditBSlide from "../Slide/EditBSlide";
import { useForm } from "react-hook-form";
import axios from "axios";
import apiUrl from "@/utils/apiConfig";
import { GetToken } from "@/utils/API";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BBuilding({ building }: any) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    },
  });

  const tabuMapping: any = {
    "الطابو الأخضر ( السجل العقاري )": 1,
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
      num_of_apartments: Number(data.num_of_apartments),
      num_of_floors: Number(data.num_of_floors),
      direction: data.direction,
    };

    try {
      await axios.patch(`${apiUrl}/buildings/${building.id}/`, bodyContent, {
        headers: headersList,
      });

      toast.success("تم تعديل البيانات بنجاح");
      router.replace(`/buildings/${building.id}`);
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("فشل في ارسال البيانات");
    }
  };

  let imagee;
  if (building.photos.length !== 0) {
    imagee = building.photos;
  } else {
    imagee = ImagBuilding;
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

  return (
    <div className="flex flex-col xl:flex-row  justify-center xl:justify-start items-center xl:items-start mt-10 gap-10 xl:gap-5">
      <div>
        <div
          className={`grid grid-cols-2 mt-7  gap-x-2 gap-y-2 md:gap-x-3 xl:gap-x-10 xl:mb-6 ${
            building.photos.length !== 0||1 ? "block" : "hidden"
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
                  className=" object-center rounded-md cursor-pointer"
                />
              </div>
            );
          })}
        </div>
        <div className={`${building.photos.length !== 0 ||1 ? "hidden" : "block"}`}>
          <Image
            src={imagee[0].photo}
            width={300}
            height={0}
            alt={`Gallery Image`}
            className=" object-center rounded-md cursor-pointer"
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
              <option value="الطابو الأخضر ( السجل العقاري )">
                الطابو الأخضر ( السجل العقاري )
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
                عدد الشقق :
              </label>
              <input
                type="text"
                placeholder="عدد الشقق"
                className="w-40 xl:w-full border p-2 rounded-lg bg-section border-section text-white"
                {...register("num_of_apartments", { required: true })}
              />
              {errors.num_of_apartments && (
                <p className="text-red-500">هذا الحقل مطلوب</p>
              )}
            </div>
          </div>
          <div className="flex w-full flex-row justify-center items-center gap-1 xl:gap-4">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                عدد الطوابق :
              </label>
              <input
                type="text"
                placeholder="عدد الطوابق"
                className="w-40 xl:w-full border p-2 rounded-lg bg-section border-section text-white"
                {...register("num_of_floors", { required: true })}
              />
              {errors.num_of_floors && (
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