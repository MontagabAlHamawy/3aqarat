"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PiTrashDuotone, PiPlusCircleDuotone } from 'react-icons/pi';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { GetToken } from '@/utils/API';
import apiUrl from '@/utils/apiConfig';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-toastify';
import Link from 'next/link';

const MySwal = withReactContent(Swal);

interface Photo {
    id: number;
    photo: string;
}


export default function Page() {
    const searchParams = useSearchParams();
    const propertyId = searchParams.get('url');
    const [photos, setPhotos] = useState<Photo[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const token = GetToken();

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get(`${apiUrl}/properties/${propertyId}/photos/`);
                if (Array.isArray(response.data.results)) {
                    setPhotos(response.data.results);
                } else {
                    toast.error("شكل استجابة غير متوقع من الخادم.");
                }
            } catch (error) {
                toast.error("حدث خطأ أثناء جلب الصور.");
            }
        };

        fetchPhotos();
    }, [propertyId, token]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            if (photos.length + filesArray.length > 5) {
                toast.warning("لا يمكنك إضافة أكثر من 5 صور.");
            } else {
                filesArray.forEach(uploadPhoto);
            }
        }
    };

    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    const uploadPhoto = async (photo: File) => {
        const formData = new FormData();
        formData.append('photo', photo);

        try {
            const response = await axios.post(
                `${apiUrl}/properties/${propertyId}/photos/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `JWT ${token}`,
                    }
                }
            );
            const { id, photo: photoUrl } = response.data;
            if (id && photoUrl) {
                setPhotos((prevPhotos) => [...prevPhotos, { id, photo: photoUrl }]);
                toast.success("تم رفع الصورة بنجاح.");
            } else {
                toast.error('شكل استجابة غير متوقع بعد رفع الصورة.');
            }
        } catch (error: any) {
            toast.error(`خطأ في رفع الصورة`);
        }
    };

    const triggerDeleteConfirmation = (photoId: number) => {
        MySwal.fire({
            title: "هل أنت متأكد؟",
            text: "لن تتمكن من التراجع عن هذا!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "حذف الصورة",
            cancelButtonText: "تراجع",
            customClass: {
                confirmButton: "bg-red-600 mx-3 font-cairo flex justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-red-500 ease-in duration-300",
                cancelButton: "bg-accent font-cairo flex mx-3 justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-accent-hover ease-in duration-300",
                popup: "text-white font-cairo",
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${apiUrl}/properties/${propertyId}/photos/${photoId}/`, {
                    headers: {
                        'Authorization': `JWT ${token}`,
                    },
                })
                    .then(() => {
                        MySwal.fire({
                            title: "تم الحذف!",
                            text: "تم حذف الصورة بنجاح.",
                            confirmButtonText: "تم",
                            icon: "success",
                            customClass: {
                                confirmButton: "bg-accent font-cairo flex mx-3 justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-accent-hover ease-in duration-300",
                                popup: "text-white font-cairo",
                            },
                            buttonsStyling: false,
                        }).then(() => {
                            setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== photoId));
                        });
                    })
                    .catch(() => {
                        MySwal.fire({
                            title: "خطأ!",
                            text: "حدث خطأ أثناء حذف الصورة.",
                            confirmButtonText: "تم",
                            icon: "error",
                            customClass: {
                                confirmButton: "bg-accent flex mx-3 justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-accent-hover ease-in duration-300",
                                popup: "text-white font-cairo",
                            },
                            buttonsStyling: false,
                        });
                    });
            }
        });
    };

    return (
        <div>
            <div>
                <div className="grid grid-cols-2 xl:grid-cols-3 mt-7 mx-2 gap-3 xl:gap-y-10 xl:mb-6 place-items-center">
                    {photos.map((photo) => (
                        <div key={photo.id} className="relative">
                            <Image
                                src={photo.photo}
                                width={300}
                                height={0}
                                alt={`Gallery Image`}
                                className={`w-48 h-36 xl:w-80 xl:h-60 object-center rounded-md cursor-pointer`}
                            />
                            <button
                                onClick={() => triggerDeleteConfirmation(photo.id)}
                                className="p-1 w-max h-max bg-red-600 cursor-pointer rounded-md absolute top-1 right-1"
                            >
                                <PiTrashDuotone size={30} />
                            </button>
                        </div>
                    ))}
                    {photos.length < 5 && (
                        <button
                            onClick={handleIconClick}
                            className="flex justify-center items-center w-48 h-36 xl:w-80 xl:h-60 rounded-md bg-body text-4xl text-accent cursor-pointer"
                        >
                            <PiPlusCircleDuotone size={60} />
                        </button>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        style={{ display: 'none' }}
                    />
                </div>
            </div>
            <Link href={`/propertys/${propertyId}`} className='flex justify-center mt-5 xl:mt-0 xl:justify-start xl:px-14'>
                <p className="bg-accent text-white px-4 py-2 rounded hover:bg-accent-hover">
                    تم التعديل
                </p>
            </Link>
        </div>
    );
}
