import React from 'react';
import { animated, useSpring, config } from '@react-spring/web';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { DarkTemplate } from '../../components/Templates/Dark';

type XYS = [number, number, number];
const calc = (x: number, y: number): XYS => [-(y - window.innerHeight / 2) / 25, (x - window.innerWidth / 5) / 25, 1];
const trans = (x: number, y: number, s: number) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export default function TemplatePreview({ username, data, invertColors, onDownload }: { username: string; data: string[]; invertColors: boolean; onDownload: () => void }) {
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1] as XYS, config: config.default }));

  return (
    <div className='flex justify-center mb-5 md:mb-0'>
      <animated.div
        className='relative inline-block w-fit h-fit md:w-[33vw]'
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: (props.xys as any).to(trans) }}
      >
        <DarkTemplate
          username={username}
          data={data}
          invertColors={invertColors}
          className='w-full h-full border-4 border-primary-300 rounded-lg shadow-lg shadow-gray-800'
        />
        <button
          className='absolute bottom-0 right-0 mr-4 mb-3 bg-white shadow-lg shadow-gray-800 text-primary-300 font-bold p-2 rounded-full transition hover:bg-primary-200 hover:text-primary-100 hover:scale-110'
          onClick={onDownload}
        >
          <ArrowDownTrayIcon className='w-6 h-6' />
        </button>
      </animated.div>
    </div>
  );
}
