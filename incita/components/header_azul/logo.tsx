import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/main" className="flex items-center">
      <div className="relative h-20 w-20">
        <Image src="/favicon_2d.png" alt="Logo" fill className="object-contain" priority />
      </div>
    </Link>
  )
}
