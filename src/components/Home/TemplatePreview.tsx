import { animated, useSpring, config } from '@react-spring/web'
import { DarkTemplate } from '../../components/Templates/Dark'

type XYS = [number, number, number];
const calc = (x: number, y: number): XYS => [-(y - window.innerHeight / 2) / 120, (x - window.innerWidth / 5) / 120, 1]
const trans = (x: number, y: number, s: number) => `perspective(1200px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

export default function TemplatePreview({ username, data, invertColors }: { username: string; data: string[]; invertColors: boolean }) {
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1] as XYS, config: config.gentle }))

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <animated.div
        className='relative w-full h-full flex items-center justify-center group/preview'
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: (props.xys as any).to(trans) }}
      >
        <div className='relative overflow-hidden rounded-xl w-full h-full flex items-center justify-center'>
          <DarkTemplate
            username={username}
            data={data}
            invertColors={invertColors}
            className='w-auto h-[95%] max-w-full object-contain border-2 border-gray-200/50 dark:border-zinc-700/50 rounded-xl shadow-lg transition-all duration-500 group-hover/preview:shadow-xl group-hover/preview:border-primary-400/30 dark:group-hover/preview:border-primary-500/30'
          />
        </div>
      </animated.div>
    </div>
  )
}
