import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/home" className="flex items-center">
      <div className="relative h-25 w-25">
        <Image src="/icons/favicon_2d.png" sizes="(min-height: 25px), (min-width: 25px)" alt="Logo" fill className="object-contain" priority />
      </div>
    </Link>
  ) 
}
