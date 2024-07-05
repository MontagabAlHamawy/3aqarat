"use client"
import React, { useState, useEffect } from 'react';
import { GetToken } from '@/utils/API';
import apiUrl from '@/utils/apiConfig';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function EditBuilding(props:any) {
  const router = useRouter();
  const { building } = props.searchParams.url;

  const [buildingData, setBuildingData] = useState({
    name: '',
    address: '',
    description: '',
  });

  useEffect(() => {
    const token = Cookies.get("authToken") || false;
    if (!token) {
      router.replace("/login");
    } else {
      fetchBuildingData();
    }
  }, [building]);

  const fetchBuildingData = async () => {
    if (!building) return;

    try {
      const response = await fetch(`${apiUrl}/buildings/${building}`, {
        headers: {
          Authorization: `JWT ${GetToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setBuildingData(data);
    } catch (error) {
      toast.error("Error fetching building data");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuildingData({
      ...buildingData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/buildings/${building}`, {
        method: 'PUT',
        headers: {
          Authorization: `JWT ${GetToken()}`,
        },
        body: JSON.stringify(buildingData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      toast.success("Building information updated successfully");
      router.push(`/buildings/${building}`);
    } catch (error) {
      toast.error("Error updating building information");
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-accent text-center xl:text-right font-bold mb-9">
        تعديل معلومات العقار
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md px-10 xl:px-0">
        <div className="mb-4">
          <label className="block text-white font-semibold text-sm mb-2">
            اسم العقار:
          </label>
          <input
            type="text"
            name="name"
            value={buildingData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg bg-section text-base border-section text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-semibold text-sm mb-2">
            الوصف:
          </label>
          <input
            type="text"
            name="description"
            value={buildingData.description}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg bg-section text-base border-section text-white"
          />
        </div>
        {/* أضف حقولًا أخرى هنا حسب الحاجة */}
        <button
          type="submit"
          className="bg-accent text-white px-4 py-2 rounded hover:bg-accent-hover ease-in duration-300"
        >
          تعديل المعلومات
        </button>
      </form>
    </div>
  );
};

