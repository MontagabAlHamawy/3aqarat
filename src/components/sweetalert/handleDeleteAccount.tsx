import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DeletMyAccount } from "@/utils/API";

const MySwal = withReactContent(Swal);

export function handleDeleteAccount(logout: () => void) {
  MySwal.fire({
    title: "هل أنت متأكد؟",
    text: "لن تتمكن من التراجع عن هذا!",
    icon: "warning",
    input: "password",
    inputLabel: "كلمة السر",
    inputPlaceholder: "أدخل كلمة السر هنا",
    inputAttributes: {
      autocapitalize: "off",
      autocorrect: "off",
    },
    showCancelButton: true,
    confirmButtonText: "حذف الحساب",
    cancelButtonText: "تراجع",
    customClass: {
      confirmButton:
        "bg-red-600 mx-3 flex justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-red-500 ease-in duration-300",
      cancelButton:
        "bg-accent flex mx-3 justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-accent-hover ease-in duration-300",
      popup: "text-white",
    },
    buttonsStyling: false,
    preConfirm: (password) => {
      if (!password) {
        MySwal.showValidationMessage("كلمة السر مطلوبة");
        return;
      }
      return password;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      DeletMyAccount(result.value)
        .then(() => {
          MySwal.fire({
            title: "تم الحذف!",
            text: "تم حذف حسابك.",
            confirmButtonText: "تم",
            icon: "success",
            customClass: {
              confirmButton:
                "bg-accent flex mx-3 justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-accent-hover ease-in duration-300",
              popup: "text-white",
            },
            buttonsStyling: false,
          }).then(() => {
            logout();
          });
        })
        .catch((error) => {
          MySwal.fire({
            title: "خطأ!",
            text: "حدث خطأ أثناء حذف الحساب.",
            confirmButtonText: "تم",
            icon: "error",
            customClass: {
              confirmButton:
                "bg-accent flex mx-3 justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-accent-hover ease-in duration-300",
              popup: "text-white",
            },
            buttonsStyling: false,
          });
        });
    }
  });
}
