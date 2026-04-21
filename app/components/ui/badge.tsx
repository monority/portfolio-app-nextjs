import React from 'react'
import './badge.css'

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'premium' | 'success' | 'warning' | 'danger' | 'info'
type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  icon?: React.ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'badge--default',
  secondary: 'badge--secondary',
  outline: 'badge--outline',
  premium: 'badge--premium',
  success: 'badge--success',
  warning: 'badge--warning',
  danger: 'badge--danger',
  info: 'badge--info',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'badge--sm',
  md: 'badge--md',
  lg: 'badge--lg',
}

const BadgeInner = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className = '',
      variant = 'default',
      size = 'md',
      dot = false,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'badge',
      variantClasses[variant],
      sizeClasses[size],
      dot && 'badge--dot',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <span ref={ref} className={classes} {...props}>
        {dot && <span className="badge__dot" aria-hidden="true" />}
        {icon && <span className="badge__icon" aria-hidden="true">{icon}</span>}
        <span className="badge__label">{children}</span>
      </span>
    )
  }
)

BadgeInner.displayName = 'BadgeInner'

const Badge = React.memo(BadgeInner)
Badge.displayName = 'Badge'

export default Badge