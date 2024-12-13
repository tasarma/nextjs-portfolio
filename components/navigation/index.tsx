'use client'

import { motion } from 'framer-motion'
import NavButton from './NavButton'
import { BtnList } from '@/lib/data'
import ResponsiveComponent from '../ResponsiveComponent'
import useScreenSize from '../hooks/useScreenSize'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const Navigation = () => {
  const angleIncrement = 360 / BtnList.length
  const size = useScreenSize();
  const isLarge = size !== undefined && size >= 1024
  const isMedium = size !== undefined && size >= 768

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <ResponsiveComponent>
        {({ size }) => {
          return size && size >= 480 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="relative flex items-center justify-center w-max group hover:pause animate-spin-slow"
            >
              {BtnList.map((btn, index: number) => {
                const angleRad = (index * angleIncrement * Math.PI) / 180
                const radius = isLarge
                  ? 'calc(20vw - 1rem)'
                  : isMedium
                  ? 'calc(30vw - 1rem)'
                  : 'calc(40vw - 1rem)'
                const x = `calc(${radius}*${Math.cos(angleRad)})`
                const y = `calc(${radius}*${Math.sin(angleRad)})`

                return <NavButton key={btn.label} x={x} y={y} {...btn} />
              })}
            </motion.div>
          ) : (
            <>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="relative flex flex-col space-y-4 px-2.5 xs:p-0 xs:w-max xs:items-center justify-center group xs:hidden"
              >
                {BtnList.slice(0, BtnList.length / 2).map((btn) => {
                  return <NavButton key={btn.label} x={0} y={0} {...btn} />
                })}
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="relative flex flex-col space-y-4 items-end px-2.5 xs:p-0 xs:w-max xs:items-center justify-center group xs:hidden"
              >
                {BtnList.slice(BtnList.length / 2, BtnList.length).map((btn) => {
                  return (
                  <NavButton key={btn.label} x={0} y={0} {...btn} labelDirection="left" />
                )})}
              </motion.div>
            </>
          )
        }}
      </ResponsiveComponent>
    </div>
  )
}

export default Navigation
