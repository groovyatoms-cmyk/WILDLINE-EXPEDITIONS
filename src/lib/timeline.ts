import { film, frames } from '@/data/site'
import { clamp01 } from '@/hooks/useScrollProgress'
import { isMobile } from './frames'

export const frameTotal = () => (isMobile() ? frames.mobileCount : frames.count)

// Film progress -> frame position (0–1) in each shot, plus slice progress `t` (0–1).
export function timeline(p: number) {
  const t = clamp01((p - film.shot1End) / (film.shot2Start - film.shot1End))
  return {
    t,
    f1: clamp01(p / film.shot1End),
    f2: clamp01((p - film.shot2Start) / (film.shot2End - film.shot2Start)),
  }
}

export const frameNo = (f: number) => Math.round(f * (frameTotal() - 1)) + 1
