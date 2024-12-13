'use client'

import React from 'react'
import useScreenSize from './hooks/useScreenSize'

interface ResponsiveComponentProps {
  children: (props: { size: ReturnType<typeof useScreenSize> }) => React.ReactNode
}

const ResponsiveComponent: React.FC<ResponsiveComponentProps> = ({ children }) => {
  const size = useScreenSize()

  return (
    <>
      {children({ size })}
    </>
  )
}

export default ResponsiveComponent

