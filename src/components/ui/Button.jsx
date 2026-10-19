// Pill button. `href` renders a link, otherwise a button. variant: 'rust' (filled) | 'line' (outline).
export default function Button({ variant = 'line', href, className = '', children, ...props }) {
  const cls = `pill pill-${variant} ${className}`.trim()
  if (href) {
    const rel = props.target === '_blank' ? 'noopener noreferrer' : undefined
    return <a className={cls} href={href} rel={rel} {...props}>{children}</a>
  }
  return <button type="button" className={cls} {...props}>{children}</button>
}
