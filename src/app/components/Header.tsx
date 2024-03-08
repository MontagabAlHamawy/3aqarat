import Image from "next/image";
import { PiUser, } from "react-icons/pi";

function Header() {
  return (
    <div className="xl:sticky top-0 w-full h-14 bg-sidpar shadow-lg  z-40 ">
      <div>
        <Image  width={40} alt="logo" height={0} src={"/3aqarat1.png"} className="xl:hidden mr-3 "/>
      </div>
      <div>
        <PiUser/>
      </div>
    </div>
  );
}

export default Header;
