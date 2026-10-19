import { useState } from 'react'

// Image that shows a shimmer skeleton in its own box until it has loaded, so the placeholder is exactly the image's size.
export default function ShimmerImg({ className = '', onError, ...props }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      {...props}
      className={`${className}${loaded ? '' : ' shimmer'}`}
      onLoad={() => setLoaded(true)}
      onError={(e) => { setLoaded(true); onError?.(e) }}
    />
  )
}
