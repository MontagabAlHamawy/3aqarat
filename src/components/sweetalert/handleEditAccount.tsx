import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function handleEditAccount(handleSubmit: () => void) {
  MySwal.fire({
    title: "هل أنت متأكد؟",
    text: "هل تريد تعديل المعلومات؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "تعديل المعلومات",
    cancelButtonText: "تراجع",
    customClass: {
      confirmButton:
        " bg-green-600 mx-3 flex justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-green-500 ease-in duration-300",
      cancelButton:
        "bg-accent flex mx-3 justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-accent-hover ease-in duration-300",
      popup: "text-white font-cairo",
    },
    buttonsStyling: false,
  })
    .then((result) => {
      if (result.isConfirmed) {
        handleSubmit();
        MySwal.fire({
          title: "تم ارسال معلومات المستخدم",
          text: "لقد تم ارسال معلومات المستخدم بنجاح.",
          confirmButtonText: "تم",
          icon: "success",
          customClass: {
            confirmButton:
              "bg-accent flex mx-3 justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-accent-hover ease-in duration-300",
            popup: "text-white font-cairo",
          },
          buttonsStyling: false,
        });
      }
    })
    .catch((error) => {
      MySwal.fire({
        title: "خطأ!",
        text: "حدث خطأ أثناء تعديل المعلومات.",
        confirmButtonText: "تم",
        icon: "error",
        customClass: {
          confirmButton:
            "bg-accent flex mx-3 justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-accent-hover ease-in duration-300",
          popup: "text-white font-cairo",
        },
        buttonsStyling: false,
      });
    });
}
