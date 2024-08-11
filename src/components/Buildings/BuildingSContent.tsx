/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState } from 'react'
import BuildingError from '../error/BuildingError';
import { ApiApartmentSearch, ApiBuildingSearch, ApiCommercialSearch, ApiHouseSearch, ApilandSearch, ApiSearch2 } from '@/utils/API';
import AllBuildingsType2 from '../BuildingCom/AllBuildingsType2';
import BuildingLoade from '../loade/BuildingLoade';

export default function BuildingSContent(property: any) {
    const [offer, setOffer] = useState<number>(0);
    const [similarProperties, setSimilarProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // حالة لتتبع التحميل

    useEffect(() => {
        // تحديد العرض بناءً على قيمة offer
        if (property.property.offer === "بيع") {
            setOffer(1);
        } else if (property.property.offer === "إيجار") {
            setOffer(2);
        } else {
            setOffer(3);
        }

        const fetchSimilarProperties = async () => {
            setLoading(true); // تعيين حالة التحميل إلى true عند بدء الجلب
            let build;
            // تحديد نوع العقار وجلب العقارات المشابهة
            switch (property.property.property_object?.property_type?.en) {
                case "house":
                    build = await ApiHouseSearch('', offer, 14);
                    break;
                case "apartment":
                    build = await ApiApartmentSearch('', offer, 14);
                    break;
                case "building":
                    build = await ApiBuildingSearch('', offer, 14);
                    break;
                case "commercialproperty":
                    build = await ApiCommercialSearch('', offer, 14);
                    break;
                case "land":
                    build = await ApilandSearch('', offer, 14);
                    break;
                default:
                    build = { results: [] };
            }

            // تصفية العقارات المشابهة لاستبعاد العقار الحالي
            const filteredProperties = build?.results?.filter((item: any) => item.property.id !== property.property.id).slice(0, 4);

            setSimilarProperties(filteredProperties);
            setLoading(false); // تعيين حالة التحميل إلى false بعد اكتمال الجلب
        }

        fetchSimilarProperties();
    }, [property.property.offer, property.property.property_object?.property_type?.en, offer, property.property.id]);

    console.log("Similar properties: ", similarProperties);

    return (
        <div>
            {loading ? (
                <BuildingLoade /> // عرض مكون التحميل أثناء تحميل البيانات
            ) : similarProperties && similarProperties.length > 0 ? (
                <AllBuildingsType2 Building={similarProperties} />
            ) : (
                <BuildingError />
            )}
        </div>
    );
}
