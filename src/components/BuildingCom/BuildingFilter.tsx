import React, { useState } from 'react';
import { hom } from '../links';

export default function BuildingFilter({ onFilterChange }: any) {
    const [filterType, setFilterType] = useState("all");

    const handleFilterChange = (type: string) => {
        setFilterType(type);
        onFilterChange(type);
    };

    return (
        <div className="grid grid-cols-3 mt-7 md:grid-cols-7 xl:grid-cols-7 gap-x-2 gap-y-5 md:gap-x-3 xl:gap-x-10 xl:mb-6">
            {hom.map((link, index) => (
                <div
                    key={index}
                    className={`py-1 px-5 text-md w-full text-white rounded-xl flex justify-center items-center cursor-pointer ${
                        filterType === link.type ? "bg-accent" : "bg-sidpar"
                    }`}
                    onClick={() => handleFilterChange(link.type)}
                >
                    <p className="text-white text-sm md:text-base xl:text-lg">{link.name}</p>
                </div>
            ))}
        </div>
    );
}
