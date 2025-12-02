'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion'

interface ScrollVelocityProps {
  children: string;
  baseVelocity?: number;
  className?: string;
}

export function ScrollVelocity({
  children,
  baseVelocity = 2,
  className = '',
}: ScrollVelocityProps) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  const [repetitions, setRepetitions] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const textWidth = textRef.current.offsetWidth
      const newRepetitions = Math.ceil(containerWidth / textWidth) + 2
      setRepetitions(newRepetitions)
    }
  }, [children])

  const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`)

  const directionFactor = useRef<number>(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      <motion.div style={{ x }} className='flex gap-8'>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span
            key={i}
            ref={i === 0 ? textRef : null}
            className='inline-block'
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

interface ParallaxTextProps {
  children: string[];
  baseVelocity?: number;
  className?: string;
  itemClassName?: string;
}

export function ParallaxText({
  children,
  baseVelocity = 2,
  className = '',
  itemClassName = '',
}: ParallaxTextProps) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  const [repetitions, setRepetitions] = useState(2)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const contentWidth = contentRef.current.offsetWidth
      const newRepetitions = Math.ceil(containerWidth / contentWidth) + 2
      setRepetitions(newRepetitions)
    }
  }, [children])

  const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`)

  const directionFactor = useRef<number>(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      <motion.div style={{ x }} className='flex'>
        {Array.from({ length: repetitions }).map((_, repIndex) => (
          <div
            key={repIndex}
            ref={repIndex === 0 ? contentRef : null}
            className='flex items-center gap-8 mr-8'
          >
            {children.map((text, i) => (
              <span key={i} className={`inline-block ${itemClassName}`}>
                {text}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
