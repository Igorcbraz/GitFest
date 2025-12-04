'use client'
import React, { useEffect, useState } from 'react'
import './styles.css'
import base64Image from './image.json'

interface RockInRioTemplateProps {
  username: string;
  data: string[];
  className?: string;
  invertColors?: boolean;
}

export function RockInRioTemplate({ data, className }: RockInRioTemplateProps) {
  const [repositoriesNames, setRepositoriesNames] = useState<string[]>(data)

  useEffect(() => {
    setRepositoriesNames(data)
  }, [data])

  const baseLines = [
    { cls: 'cls-1', scale: 2.5, tx: 202.829, ty: 2650.897, target: 32 },
    { cls: 'cls-1', scale: 2.5, tx: 565.291, ty: 2794.81, target: 26 },
    { cls: 'cls-2', scale: 1.586, tx: 237.79, ty: 2904.119, target: 57 },
    { cls: 'cls-2', scale: 1.586, tx: 219.819, ty: 2998.982, target: 61 },
    { cls: 'cls-3', scale: 2.24, tx: 415.055, ty: 3090.702, target: 63 },
    { cls: 'cls-3', scale: 2.24, tx: 430.712, ty: 3159.161, target: 59 },
    { cls: 'cls-3', scale: 2.24, tx: 441.698, ty: 3238.052, target: 57 },
    { cls: 'cls-3', scale: 2.24, tx: 893.698, ty: 3316.053, target: 25 },
  ] as const

  const distributeLines = (items: string[]): string[] => {
    const lines: string[] = []
    let idx = 0
    for (let li = 0; li < baseLines.length; li++) {
      const target = baseLines[li].target
      let line = ''
      while (idx < items.length) {
        const next = items[idx] || ''
        const sep = line.length > 0 ? '  ' : ''
        const candidate = line + sep + next
        if (candidate.length <= target) {
          line = candidate
          idx++
        } else if (line.length === 0) {
          line = next
          idx++
          break
        } else {
          break
        }
      }
      lines.push(line)
    }
    return lines
  }

  const baseFontPx = (cls: string) => {
    switch (cls) {
      case 'cls-1':
        return 42
      case 'cls-2':
        return 41
      case 'cls-3':
        return 22
      default:
        return 42
    }
  }

  const getFontSizePx = (i: number, text: string) => {
    const base = baseLines[i]
    const basePx = baseFontPx(base.cls) * base.scale
    const len = Math.max(text.length, 1)
    const ratio = base.target / len
    const scale = ratio < 1 ? ratio : 1
    const px = basePx * scale
    return Number(px.toFixed(2))
  }

  if (repositoriesNames.length <= 0) {
    return (
      <div className='inline-block h-8 w-8 animate-spin rounded-full text-primary-400 border-4 border-solid border-current border-r-transparent'>
        <span className='sr-only'>Loading...</span>
      </div>
    )
  }

  return (
    <svg
      id='gitfest-rio-template'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={620}
      height={877}
      viewBox='0 0 2480 3508'
      className={className}
    >
      <defs>
        <style>{`
@font-face {
  font-family: "Helvetica Neue";
  src: url(/fonts/HelveticaNeue-medium.otf) format("opentype");
}
.cls-1 { font-size: 50px; fill: #fa502d; font-family: "Helvetica Neue", sans-serif; }
.cls-2 { font-size: 49.839px; fill: #bdb60a; font-family: "Helvetica Neue", sans-serif; }
.cls-3 { font-size: 26.231px; fill: #427eb0; font-family: "Helvetica Neue", sans-serif; }
        `}</style>
      </defs>
      <image id='Camada_2' data-name='Camada 2' x='-33' y='-30' width='2539' height='3581' xlinkHref={base64Image.data}/>
      {(() => {
        const itemsUpper = repositoriesNames.map(name => (name || '').toUpperCase())
        const lines = distributeLines(itemsUpper)

        const FIRST_LINE_TOP_EXTRA = 40
        const GAP_BETWEEN_RED_LINES = 35
        const GAP_RED_YELLOW = 60
        const GAP_YELLOW_BLUE = 40
        const computeY = (i: number) => {
          let extra = 0
          if (i === 0) extra += FIRST_LINE_TOP_EXTRA
          if (i === 1) extra += GAP_BETWEEN_RED_LINES
          if (i >= 2) extra += GAP_RED_YELLOW
          if (i >= 4) extra += GAP_YELLOW_BLUE
          return baseLines[i].ty + extra
        }
        return (
          <>
            <text id='LINE_1' data-name='LINE 1' className={baseLines[0].cls} textAnchor='middle' dominantBaseline='alphabetic' x={1240} y={computeY(0)} style={{ fontSize: getFontSizePx(0, lines[0] || '') }}>{lines[0] || ''}</text>
            <text id='LINE_2' data-name='LINE 2' className={baseLines[1].cls} textAnchor='middle' dominantBaseline='alphabetic' x={1240} y={computeY(1)} style={{ fontSize: getFontSizePx(1, lines[1] || '') }}>{lines[1] || ''}</text>
            <text id='LINE_3' data-name='LINE 3' className={baseLines[2].cls} textAnchor='middle' dominantBaseline='alphabetic' x={1240} y={computeY(2)} style={{ fontSize: getFontSizePx(2, lines[2] || '') }}>{lines[2] || ''}</text>
            <text id='LINE_4' data-name='LINE 4' className={baseLines[3].cls} textAnchor='middle' dominantBaseline='alphabetic' x={1240} y={computeY(3)} style={{ fontSize: getFontSizePx(3, lines[3] || '') }}>{lines[3] || ''}</text>
            <text id='LINE_5' data-name='LINE 5' className={baseLines[4].cls} textAnchor='middle' dominantBaseline='alphabetic' x={1240} y={computeY(4)} style={{ fontSize: getFontSizePx(4, lines[4] || '') }}>{lines[4] || ''}</text>
            <text id='LINE_6' data-name='LINE 6' className={baseLines[5].cls} textAnchor='middle' dominantBaseline='alphabetic' x={1240} y={computeY(5)} style={{ fontSize: getFontSizePx(5, lines[5] || '') }}>{lines[5] || ''}</text>
            <text id='LINE_7' data-name='LINE 7' className={baseLines[6].cls} textAnchor='middle' dominantBaseline='alphabetic' x={1240} y={computeY(6)} style={{ fontSize: getFontSizePx(6, lines[6] || '') }}>{lines[6] || ''}</text>
            <text id='LINE_8' data-name='LINE 8' className={baseLines[7].cls} textAnchor='middle' dominantBaseline='alphabetic' x={1240} y={computeY(7)} style={{ fontSize: getFontSizePx(7, lines[7] || '') }}>{lines[7] || ''}</text>
          </>
        )
      })()}
    </svg>
  )
}
