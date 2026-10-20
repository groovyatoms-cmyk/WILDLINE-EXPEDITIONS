'use client'

// Pill button. `href` renders a link, otherwise a button. variant: 'rust' (filled) | 'line' (outline).
type Props = React.HTMLAttributes<HTMLElement> & {
  variant?: 'rust' | 'line'
  href?: string
  target?: string
  type?: 'button' | 'submit'
}

// Two copies of the label: on hover the first rolls out and the second rolls in (CSS, mouse only).
const Roll = ({ children }: { children: React.ReactNode }) => (
  <span className="roll">
    <span>{children}</span>
    <span aria-hidden="true">{children}</span>
  </span>
)

export default function Button({ variant = 'line', href, className = '', children, ...props }: Props) {
  const cls = `pill pill-${variant} ${className}`.trim()
  if (href) {
    const rel = props.target === '_blank' ? 'noopener noreferrer' : undefined
    return (
      <a className={cls} href={href} rel={rel} {...props}>
        <Roll>{children}</Roll>
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...props}>
      <Roll>{children}</Roll>
    </button>
  )
}
