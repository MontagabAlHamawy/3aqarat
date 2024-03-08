import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <div className="bg-section py-4 xl:py-0 xl:h-14 xl:pr-20 static bottom-0 left-0 mb-[54px] xl:mb-0 flex flex-col xl:flex-row gap-3 items-center xl:justify-between">
      <Link href={"/"}>
        <Image width={100} height={0} src={"/3aqarat.png"} alt="logo" />
      </Link>
      <p className="text-sm xl:text-base font-extralight text-white/80 xl:ml-5">
        Made with love <span className="text-accent">❤</span> by Montagab
        AL-Hamawy
      </p>
    </div>
  );
}

export default Footer;
