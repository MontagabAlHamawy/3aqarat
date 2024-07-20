import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useCallback } from "react";

const MySwal = withReactContent(Swal);

export function useConfirmationAlert() {
  const showConfirmation = useCallback(async (handleConfirm: () => void) => {
    try {
      const result = await MySwal.fire({
        title: "هل أنت متأكد؟",
        text: "هل تريد تعديل المعلومات؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "تعديل المعلومات",
        cancelButtonText: "تراجع",
        customClass: {
          confirmButton:
            "bg-green-700 mx-3 flex justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-green-500 ease-in duration-300",
          cancelButton:
            "bg-accent flex mx-3 justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-accent-hover ease-in duration-300",
          popup: "text-white",
        },
        buttonsStyling: false,
      });

      if (result.isConfirmed) {
        handleConfirm();
        await MySwal.fire({
          title: "تم الإرسال",
          text: "لقد تم إرسال المعلومات بانتظار النتيجة.",
          confirmButtonText: "تم",
          icon: "success",
          customClass: {
            confirmButton:
              "bg-accent flex mx-3 justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-accent-hover ease-in duration-300",
            popup: "text-white",
          },
          buttonsStyling: false,
        });
      }
    } catch (error) {
      await MySwal.fire({
        title: "خطأ!",
        text: "حدث خطأ أثناء ارسال المعلومات.",
        confirmButtonText: "تم",
        icon: "error",
        customClass: {
          confirmButton:
            "bg-accent flex mx-3 justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-accent-hover ease-in duration-300",
          popup: "text-white",
        },
        buttonsStyling: false,
      });
    }
  }, []);

  return { showConfirmation };
}
