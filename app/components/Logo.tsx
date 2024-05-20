import Image from "next/image";
import Link from "next/link";
const Logo = () => {
  return (
    <Link href={"/"} className=" flex  items-center gap-4 z-10">
      <Image src="/logo.png" width={60} height={60} alt="The wild oasis logo" />
      <span className=" text-xl font-semibold">The wild Oases</span>
    </Link>
  );
};

export default Logo;
