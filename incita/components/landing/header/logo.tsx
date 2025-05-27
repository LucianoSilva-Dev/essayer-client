import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative h-16 w-16">
        <Image src="/logo.png" alt="Logo" fill className="object-contain" priority />
      </div>
    </Link>
  )
}
