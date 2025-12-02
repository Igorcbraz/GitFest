'use client'

import { motion, Variants, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

type TextAnimateProps = {
  text: string;
  type?: 'paragraph' | 'heading';
  className?: string;
  animation?: {
    hidden: { opacity: number; y?: number; x?: number };
    visible: { opacity: number; y?: number; x?: number };
  };
  delay?: number;
  duration?: number;
  once?: boolean;
};

const defaultAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function TextAnimate({
  text,
  type = 'paragraph',
  className,
  animation = defaultAnimation,
  delay = 0,
  duration = 0.5,
  once = true,
}: TextAnimateProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.3 })
  const words = text.split(' ')
  const Tag = type === 'heading' ? motion.h1 : motion.p

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  }

  const child: Variants = {
    visible: {
      ...animation.visible,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration,
      },
    },
    hidden: animation.hidden,
  }

  return (
    <Tag
      ref={ref}
      className={cn('overflow-hidden', className)}
      variants={container}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className='inline-block mr-[0.25em]'
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}

export function TextFade({
  text,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.5 })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration, ease: 'easeOut' }}
      className={className}
    >
      {text}
    </motion.p>
  )
}

export function TextBlur({
  text,
  className,
  delay = 0,
  duration = 0.8,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.3 })
  const words = text.split(' ')

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  }

  const child: Variants = {
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration,
      },
    },
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
    },
  }

  return (
    <motion.p
      ref={ref}
      className={cn('overflow-hidden', className)}
      variants={container}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className='inline-block mr-[0.25em]'
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}

export function TextGradient({
  text,
  className,
  gradientClassName,
  delay = 0,
  as = 'h1',
  once = true,
}: {
  text: string;
  className?: string;
  gradientClassName?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  once?: boolean;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.5 })
  const MotionTag = motion[as] as any

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className={cn('relative inline-block', className)}
    >
      <span
        className={cn(
          'bg-gradient-to-r bg-clip-text text-transparent',
          gradientClassName
        )}
      >
        {text}
      </span>
    </MotionTag>
  )
}

export function TextReveal({
  text,
  className,
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.3 })
  const letters = text.split('')

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  }

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  }

  return (
    <motion.span
      ref={ref}
      className={cn('overflow-hidden inline-block', className)}
      variants={container}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className='inline-block'>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function TextShimmer({
  text,
  className,
  shimmerWidth = 100,
}: {
  text: string;
  className?: string;
  shimmerWidth?: number;
}) {
  return (
    <motion.p
      initial={{ backgroundPosition: '-200%' }}
      animate={{ backgroundPosition: '200%' }}
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: 'linear',
      }}
      className={cn(
        'inline-block bg-gradient-to-r from-transparent via-white to-transparent bg-clip-text text-transparent',
        className
      )}
      style={{
        backgroundSize: `${shimmerWidth}% 100%`,
      }}
    >
      {text}
    </motion.p>
  )
}

export function TextSlide({
  text,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  once = true,
}: {
  text: string;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  once?: boolean;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.5 })

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  }

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...directionOffset[direction] }}
      transition={{ delay, duration, ease: 'easeOut' }}
      className={className}
    >
      {text}
    </motion.p>
  )
}

export function TextRotate({
  text,
  className,
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.5 })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, rotateX: -90 }}
      animate={isInView ? { opacity: 1, rotateX: 0 } : { opacity: 0, rotateX: -90 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className={className}
      style={{ transformOrigin: 'center' }}
    >
      {text}
    </motion.p>
  )
}

export function TextScale({
  text,
  className,
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.5 })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className={className}
    >
      {text}
    </motion.p>
  )
}
