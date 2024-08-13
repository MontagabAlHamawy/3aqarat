import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
export default function mapErrorSweet() {
    MySwal.fire({
        title: "خطأ في تحديد الموقع!",
        text: "تعذر تحديد موقعك. يرجى تمكين خدمات الموقع والمحاولة مرة أخرى",
        confirmButtonText: "تم",
        icon: "error",
        customClass: {
            confirmButton:
                "bg-accent flex mx-3 justify-start items-center gap-1 xl:gap-2 cursor-pointer text-white px-3 py-2 xl:px-4 xl:py-2 rounded hover:bg-accent-hover ease-in duration-300",
            popup: "text-white font-cairo ",
        },
        buttonsStyling: false,
    });
}
