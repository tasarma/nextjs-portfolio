'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { Github, Home, Linkedin, NotebookText, Palette, Library, User, type LucideIcon, Mail } from 'lucide-react'
import { NavButtonProps, IconType } from '@/types/navigation'
import ResponsiveComponent from '../ResponsiveComponent'

const getIcon = (icon: IconType): React.ReactElement<LucideIcon> => {
  const icons: Record<IconType, React.ReactElement<LucideIcon>> = {
    home: <Home className="w-full h-auto" strokeWidth={1.5} />,
    about: <User className="w-full h-auto" strokeWidth={1.5} />,
    projects: <Palette className="w-full h-auto" strokeWidth={1.5} />,
    mail: <Mail className="w-full h-auto" strokeWidth={1.5} />,
    github: <Github className="w-full h-auto" strokeWidth={1.5} />,
    linkedin: <Linkedin className="w-full h-auto" strokeWidth={1.5} />,
    library: <Library className="w-full h-auto" strokeWidth={1.5} />,
  }

  return icons[icon] || icons.home
}

const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
}

const NavLink = motion.create(Link)

const NavButton: React.FC<NavButtonProps> = ({
  x,
  y,
  label,
  link,
  icon,
  newTab,
  labelDirection = 'right',
}) => {
  return (
    <ResponsiveComponent>
      {({ size }) => {
        return size && size >= 480 ? (
          <div
            className="absolute cursor-pointer z-50"
            style={{ transform: `translate(${x}, ${y})` }}
          >
            <NavLink
              variants={item}
              href={link}
              target={newTab ? '_blank' : '_self'}
              className="text-foreground rounded-full flex items-center justify-center custom-bg"
              aria-label={label}
              prefetch={false}
              scroll={false}
            >
              <span className="relative w-14 h-14 p-4 animate-spin-slow-reverse group-hover:pause hover:text-accent">
                {getIcon(icon)}
                <span className="peer bg-transparent absolute top-0 left-0 w-full h-full" />
                <span className="absolute hidden peer-hover:block px-2 py-1 left-full mx-2 top-1/2 -translate-y-1/2 bg-background text-foreground text-sm rounded-md shadow-lg whitespace-nowrap">
                  {label}
                </span>
              </span>
            </NavLink>
          </div>
        ) : (
          <div className="w-fit cursor-pointer z-50">
            <NavLink
              variants={item}
              href={link}
              target={newTab ? '_blank' : '_self'}
              className="text-foreground rounded-full flex items-center justify-center custom-bg"
              aria-label={label}
              prefetch={false}
              scroll={false}
            >
              <span className="relative w-10 h-10 xs:w-14 xs:h-14 p-2.5 xs:p-4 hover:text-accent">
                {getIcon(icon)}
                <span className="peer bg-transparent absolute top-0 left-0 w-full h-full" />
                <span
                  className={clsx(
                    "absolute hidden peer-hover:block px-2 py-1 mx-2 top-1/2 -translate-y-1/2 bg-background text-foreground text-sm rounded-md shadow-lg whitespace-nowrap",
                    labelDirection === 'left' ? 'right-full' : 'left-full'
                  )}
                >
                  {label}
                </span>
              </span>
            </NavLink>
          </div>
        )
      }}
    </ResponsiveComponent>
  )
}

export default NavButton

