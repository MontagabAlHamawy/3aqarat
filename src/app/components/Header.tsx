import { PiMagnifyingGlass } from "react-icons/pi";

function Header() {
  return (
    <div className="sticky top-0 w-full bg-sidpar shadow-lg  z-50">
      <div className="flex flex-col xl:flex-row gap-y-5 justify-between items-center py-3 px-5 ">
        <img src="/3aqarat.png" className="w-32" />
        <div className="flex justify-center items-center bg-slate-100 rounded-full pl-3">
          <input
            type="text"
            placeholder="البحث ..."
            className=" border-none w-64 flex justify-start items-center px-4 h-10 bg-slate-100 rounded-full "
          />
          <PiMagnifyingGlass className="text-2xl"/>
        </div>
      </div>
    </div>
  );
}

export default Header;
