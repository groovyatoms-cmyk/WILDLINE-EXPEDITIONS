'use client'

import { useEffect, useRef, useState } from 'react'
import { isFilled } from '@/lib/guard'

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  // Width / height of the real picture, e.g. '16 / 9'. The skeleton is exactly that shape, so nothing jumps when the image arrives.
  ratio?: string
}

// Lazy image with a shimmer skeleton that is exactly the image's box until the file has loaded.
// A missing or empty `src` keeps showing the skeleton instead of a broken-image icon.
export default function ShimmerImg({ className = '', ratio, src, style, onError, onLoad, ...props }: Props) {
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  // A new source starts as a skeleton again; an image that is already cached is shown at once.
  useEffect(() => {
    const img = ref.current
    setLoaded(Boolean(img?.complete && img.naturalWidth > 0))
  }, [src])

  const hasSrc = typeof src === 'string' && isFilled(src)
  return (
    <img
      loading="lazy"
      decoding="async"
      {...props}
      ref={ref}
      src={hasSrc ? src : undefined}
      className={`${className}${loaded && hasSrc ? '' : ' shimmer'}`}
      style={ratio ? { aspectRatio: ratio, ...style } : style}
      onLoad={(e) => {
        setLoaded(true)
        onLoad?.(e)
      }}
      onError={(e) => {
        setLoaded(true)
        onError?.(e)
      }}
    />
  )
}
