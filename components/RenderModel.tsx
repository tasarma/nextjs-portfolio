'use client'

import React, { Suspense, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { CanvasProps } from '@react-three/fiber'
import { EnvironmentProps } from '@react-three/drei'
import clsx from 'clsx'

const Canvas = dynamic<CanvasProps>(() => import('@react-three/fiber').then((mod) => mod.Canvas), {
  ssr: false
})

const Environment = dynamic<EnvironmentProps>(() => import('@react-three/drei').then((mod) => mod.Environment), {
  ssr: false
})

interface RenderModelProps {
  children: ReactNode
  className?: string
}

const RenderModel: React.FC<RenderModelProps> = ({ children, className }) => {
  return (
      <Canvas
        className={clsx("w-screen h-screen -z-10 relative", className)}
        shadows={false}
        dpr={[1, 2]}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: -10 }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
        <Environment preset="dawn" />
      </Canvas>
  )
}

export default RenderModel
