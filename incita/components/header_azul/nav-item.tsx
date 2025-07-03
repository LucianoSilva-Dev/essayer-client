import Link from "next/link"

interface NavItemProps {
  href: string
  label: string
}

export function NavItem({ href, label }: NavItemProps) {
  return (
    <Link
      href={href}
      className="text-black md:text-black lg:text-white text-2xl font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black md:after:bg-black lg:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
    >
      {label}
    </Link>
  )
}
