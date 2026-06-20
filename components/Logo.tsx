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
        width={340}
        height={45}
        style={{ width: "170px", height: "auto" }}
        priority
      />
    </Link>
  );
}
