import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header>
      <Image
        src="https://placehold.co/200x50.png"
        alt="logo"
        width={200}
        height={50}
      />
      <input type="text" />

      <Link href="/carrinho">
        <button>Carrinho</button>
      </Link>
    </header>
  );
}
