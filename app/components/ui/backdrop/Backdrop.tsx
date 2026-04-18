import type { CSSProperties, ElementType, ReactNode } from 'react'
import './backdrop.css'

type BackdropVariant = 'card' | 'muted' | 'premium' | 'accent' | 'custom'

interface BackdropProps {
    children: ReactNode
    variant?: BackdropVariant
    background?: string
    className?: string
    as?: ElementType
    style?: CSSProperties
}

const VARIANT_MAP: Record<Exclude<BackdropVariant, 'custom'>, string> = {
    card: 'backdrop--card',
    muted: 'backdrop--muted',
    premium: 'backdrop--premium',
    accent: 'backdrop--accent',
}

export default function Backdrop({
    children,
    variant = 'card',
    background,
    className = '',
    as: Tag = 'div',
    style,
}: BackdropProps) {
    const variantClass = variant !== 'custom' ? VARIANT_MAP[variant] : ''
    const inlineStyle: CSSProperties = background
        ? { ...style, background }
        : style ?? {}

    return (
        <Tag
            className={['backdrop', variantClass, className].filter(Boolean).join(' ')}
            style={Object.keys(inlineStyle).length ? inlineStyle : undefined}
        >
            {children}
        </Tag>
    )
}
