'use client'
import React from 'react'

interface BuyProps { containerClassName?: string; coffeeClassName?: string; borderClassName?: string }
export const BuyMeACoffee: React.FC<BuyProps> = ({ containerClassName, coffeeClassName = 'fill-[#FFDD06]', borderClassName = 'fill-[#010202]' }) => (
  <svg className={containerClassName} version='1.0' id='katman_1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 600 450' xmlSpace='preserve'>
    <path className={borderClassName} d='M390.1,137.3l-0.2-0.1l-0.5-0.2C389.5,137.2,389.8,137.3,390.1,137.3z' />
    <path className={borderClassName} d='M393.4,160.9l-0.3,0.1L393.4,160.9z' />
    <path className={borderClassName} d='M390.1,137.2C390.1,137.2,390.1,137.2,390.1,137.2C390,137.2,390,137.2,390.1,137.2 C390.1,137.2,390.1,137.2,390.1,137.2z' />
    <path className={borderClassName} d='M393.1,160.7l0.4-0.2l0.1-0.1l0.1-0.1C393.5,160.4,393.3,160.6,393.1,160.7z' />
    <path className={borderClassName} d='M390.7,137.8l-0.4-0.4l-0.3-0.1C390.2,137.5,390.4,137.7,390.7,137.8z' />
    <path className={coffeeClassName} d='M308,212.8c-11.8,5.1-25.3,10.8-42.7,10.8c-7.3,0-14.5-1-21.5-3l12,123.6c0.4,5.2,2.8,10,6.6,13.5 c3.8,3.5,8.8,5.5,14,5.5c0,0,17.1,0.9,22.8,0.9c6.1,0,24.5-0.9,24.5-0.9c5.2,0,10.2-1.9,14-5.5c3.8-3.5,6.2-8.3,6.6-13.5l12.9-136.5 c-5.8-2-11.6-3.3-18.1-3.3C327.7,204.4,318.6,208.3,308,212.8z' />
  </svg>
)
