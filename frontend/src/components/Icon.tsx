interface IconProps {
  name: string
  filled?: boolean
  size?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Material Symbols Outlined icon component.
 * Uses Google's variable font for weight/fill control.
 */
export default function Icon({ name, filled = false, size, className = '', style }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
        fontSize: size ? `${size}px` : undefined,
        ...style,
      }}
    >
      {name}
    </span>
  )
}
