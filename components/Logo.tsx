import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link
      className="relative z-20 flex items-center focus:outline-none"
      href="/"
    >
      <Image
        src="/malik_seeds_logo.svg"
        alt="Malik Seeds"
        width={170}
        height={22}
        style={{ width: "auto", height: "22px" }}
        priority
      />
    </Link>
  );
}
