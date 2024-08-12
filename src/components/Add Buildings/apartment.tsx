"use client";
import { PiTrashDuotone } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ApiCities, ApiOfferTypes, GetToken } from "@/utils/API";
import apiUrl from "@/utils/apiConfig";
import dynamic from "next/dynamic";
const MapForProperty = dynamic(() => import("../map/MapForProperty"), {
  ssr: false,
});

export default function Apartment() {
  const [offer, setOffer] = useState<any>([]);
  const [city, setCity] = useState<any>([]);
  const [selectedOffer, setSelectedOffer] = useState<any>(1);
  const [geoAddress, setGeoAddress] = useState<string | null>(null); // State to store geo address
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    area: "",
    price: "",
    rooms: "",
    floorNumber: "",
    direction: "N",
    city: 1,
    region: "",
    street: "",
    addressDescription: "",
    duration: "",
    tabu: 1,
  });


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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data for API
    const data = {
      property: {
        area: Number(formData.area),
        price: Number(formData.price),
        title: formData.title,
        duration_in_months: selectedOffer === 1 ? 0 : Number(formData.duration),
        description: formData.description,
        tabu: formData.tabu,
        offer: selectedOffer,
        address: {
          region: formData.region,
          street: formData.street,
          description: formData.addressDescription,
          geo_address: geoAddress, // Set the geo address
          city: Number(formData.city),
        },
      },
      number_of_rooms: Number(formData.rooms),
      direction: formData.direction,
      floor_number: Number(formData.floorNumber),
    };
    console.log("data: ", JSON.stringify(data));

    let token = GetToken();
    try {
      // Send data to API
      const response = await fetch(`${apiUrl}/apartments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("تم إضافة الشقة بنجاح!");
      } else {
        alert("حدث خطأ أثناء إضافة الشقة.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ أثناء إضافة الشقة.");
    }
  };

  return (
    <div className="">
      <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
        <div className="">
          <div className="mb-4 ">
            <label className="block text-white font-semibold text-sm mb-2">
              العنوان :
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="العنوان"
              className="w-80 xl:w-[850px] border p-2 rounded-lg bg-section border-section text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold text-sm mb-2">
              الوصف :
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="الوصف"
              className="w-80 xl:w-[850px] border p-2 rounded-lg bg-section border-section text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold text-sm mb-2">
              الملكية :
            </label>
            <select
              name="tabu"
              value={formData.tabu}
              onChange={handleInputChange}
              className="w-80 xl:w-[850px] h-11 border pr-2 rounded-lg bg-section border-section text-white"
            >
              <option value="1">طابو أخضر ( السجل العقاري )</option>
              <option value="2">إقرار محكمة</option>
              <option value="3">كاتب عدل</option>
              <option value="4">حكم قطعي</option>
              <option value="5">سجل مؤقت</option>
            </select>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-14">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                المساحة :
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="المساحة"
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                عدد الغرف :
              </label>
              <input
                type="text"
                name="rooms"
                value={formData.rooms}
                onChange={handleInputChange}
                placeholder="عدد الغرف"
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-14">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                رقم الطابق :
              </label>
              <input
                type="text"
                name="floorNumber"
                value={formData.floorNumber}
                onChange={handleInputChange}
                placeholder="الطابق الأرضي 0"
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2 ">
                الاتجاه :
              </label>
              <select
                name="direction"
                value={formData.direction}
                onChange={handleInputChange}
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
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-14">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                السعر :
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="السعر"
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                المدينة :
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-40 xl:w-[397px] h-11 border pr-2 rounded-lg bg-section border-section text-white"
              >
                {city.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name_ar}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-14">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                المنطقة :
              </label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                placeholder="المنطقة"
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                الشارع :
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                placeholder="الشارع"
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-14">
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                أقرب نقطة :
              </label>
              <input
                type="text"
                name="addressDescription"
                value={formData.addressDescription}
                onChange={handleInputChange}
                placeholder="أقرب نقطة "
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold text-sm mb-2">
                نوع العرض :
              </label>
              <select
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
            </div>

          </div>
          <div className="flex flex-row justify-center items-center gap-1 xl:gap-14">
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
                className="w-40 xl:w-[397px] border p-2 rounded-lg bg-section border-section text-white"

              />

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
            إضافة الشقة
          </button>
        </div>
      </form>
    </div>
  );
}
