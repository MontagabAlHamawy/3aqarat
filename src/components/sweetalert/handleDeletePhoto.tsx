import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import apiUrl from "@/utils/apiConfig";

const MySwal = withReactContent(Swal);

interface HandleDeletePhotoProps {
  photoId: number;
  propertyId: string;
  token: string;
  onSuccess: () => void;
}

export function HandleDeletePhoto({ photoId, propertyId, token, onSuccess }: HandleDeletePhotoProps) {
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
            onSuccess();
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
}
