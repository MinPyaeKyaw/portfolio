import { NavLink } from 'react-router-dom'
import logo from '@/assets/logo.svg'
import { cn } from '@/lib/utils'

export const BRAND_NAME = 'Myanhon'

export function BrandLinkToHome() {
  return (
    <NavLink
      to="/"
      end
      className={({ isActive }) =>
        cn(
          'group flex min-w-0 items-center gap-3 rounded-lg py-1 pr-2 pl-1 transition-opacity',
          isActive ? 'opacity-100' : 'opacity-95 hover:opacity-100'
        )
      }
    >
      <img
        src={logo}
        alt=""
        width={52}
        height={52}
        className="size-[52px] shrink-0 object-contain md:size-14"
        decoding="async"
      />
      <span className="font-heading truncate text-lg font-semibold leading-tight text-primary md:text-xl">
        {BRAND_NAME}
      </span>
    </NavLink>
  )
}

export function BrandHero() {
  return (
    <div className="flex flex-col gap-6">
      <img
        src={logo}
        alt={BRAND_NAME}
        width={160}
        height={160}
        className="size-40 object-contain md:size-44 lg:size-48"
        decoding="async"
      />
      <h1 className="font-heading text-3xl font-semibold tracking-tight text-primary md:text-4xl">
        {BRAND_NAME}
      </h1>
    </div>
  )
}
