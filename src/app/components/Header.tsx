"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiUserDuotone, PiMagnifyingGlassDuotone, PiBellSimpleDuotone } from "react-icons/pi";

function Header() {
  const route = usePathname();
  const searchActive = route === "/search";
  const notActive = route === "/notification";
  const accountActive = route === "/account";
  return (
    <div className="sticky top-0 w-full h-16 bg-sidpar shadow-lg  z-40 xl:pr-20 flex flex-row justify-between items-center">
      <div>
        <Image
          width={40}
          alt="logo"
          height={0}
          src={"/3aqarat1.png"}
          className="xl:hidden mr-3 "
        />
        <Link href={"/search"}>
          <PiMagnifyingGlassDuotone className={`text-4xl text-white p-2 ${searchActive ? 'bg-accent' : 'bg-body '} rounded-md cursor-pointer hidden xl:block `} />
        </Link>
      </div>
      <div className="mx-2 flex flex-row gap-2">
        <Link href={"/search"}>
          <PiMagnifyingGlassDuotone className={`text-4xl text-white p-2 ${searchActive ? 'bg-accent' : 'bg-body '} rounded-md cursor-pointer xl:hidden`} />
        </Link>
        <Link href={"/notification"}>
          <PiBellSimpleDuotone className={` text-4xl text-white p-2 ${notActive ? 'bg-accent' : 'bg-body '} rounded-md cursor-pointer`} />
        </Link>
        <Link href={"/account"}>
          <PiUserDuotone className={`text-4xl text-white p-2 ${accountActive ? 'bg-accent' : 'bg-body '} rounded-md cursor-pointer`} />
        </Link>
      </div>
    </div>
  );
}

export default Header;
