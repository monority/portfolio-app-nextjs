import React from 'react'
import './text.css'

// ─── Types ───────────────────────────────────────────────────────

type TextVariant =
    | 'display'    // hero: clamp(2.5rem → 5rem), tight tracking
    | 'heading'    // h2-level: clamp(1.5rem → 2.5rem)
    | 'subheading' // h3-level: clamp(1.125rem → 1.75rem)
    | 'body'       // 1rem, relaxed leading
    | 'small'      // 0.875rem, secondary use
    | 'caption'    // 0.75rem, labels / meta
    | 'mono'       // mono font, same size as body
    | 'eyebrow'    // UPPERCASE, tracked, mono, secondary color
    | 'lead'       // large intro paragraph: clamp(1.125rem → 1.5rem)

type TextColor =
    | 'default'    // var(--foreground)
    | 'secondary'  // var(--text-secondary)
    | 'muted'      // var(--muted)
    | 'inherit'    // inherit from parent

type TextWeight =
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'

type TextAlign = 'left' | 'center' | 'right' | 'balance'

type TextAs =
    | 'p' | 'span' | 'div'
    | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    | 'label' | 'figcaption' | 'strong' | 'em' | 'time'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
    as?: TextAs
    variant?: TextVariant
    color?: TextColor
    weight?: TextWeight
    align?: TextAlign
    truncate?: boolean        // single-line truncate
    clamp?: 2 | 3 | 4 | 5   // multi-line clamp
    srOnly?: boolean          // visually hidden, accessible
}

// ─── Maps ────────────────────────────────────────────────────────

const VARIANT_DEFAULT_TAG: Record<TextVariant, TextAs> = {
    display: 'h1',
    heading: 'h2',
    subheading: 'h3',
    body: 'p',
    small: 'p',
    caption: 'span',
    mono: 'span',
    eyebrow: 'span',
    lead: 'p',
}

const VARIANT_CLASS: Record<TextVariant, string> = {
    display: 'text--display',
    heading: 'text--heading',
    subheading: 'text--subheading',
    body: 'text--body',
    small: 'text--small',
    caption: 'text--caption',
    mono: 'text--mono',
    eyebrow: 'text--eyebrow',
    lead: 'text--lead',
}

const COLOR_CLASS: Record<TextColor, string> = {
    default: '',
    secondary: 'text--secondary',
    muted: 'text--muted',
    inherit: 'text--inherit',
}

const WEIGHT_CLASS: Record<TextWeight, string> = {
    normal: 'text--normal',
    medium: 'text--medium',
    semibold: 'text--semibold',
    bold: 'text--bold',
}

const ALIGN_CLASS: Record<TextAlign, string> = {
    left: '',
    center: 'text--center',
    right: 'text--right',
    balance: 'text--balance',
}

const CLAMP_CLASS: Record<2 | 3 | 4 | 5, string> = {
    2: 'text--clamp-2',
    3: 'text--clamp-3',
    4: 'text--clamp-4',
    5: 'text--clamp-5',
}

// ─── Component ───────────────────────────────────────────────────

const Text = React.forwardRef<HTMLElement, TextProps>(
    (
        {
            as,
            variant = 'body',
            color = 'default',
            weight,
            align = 'left',
            truncate = false,
            clamp,
            srOnly = false,
            className = '',
            children,
            ...props
        },
        ref
    ) => {
        const Tag = (as ?? VARIANT_DEFAULT_TAG[variant]) as React.ElementType

        const classes = [
            'text',
            VARIANT_CLASS[variant],
            COLOR_CLASS[color],
            weight ? WEIGHT_CLASS[weight] : '',
            ALIGN_CLASS[align],
            truncate ? 'text--truncate' : '',
            clamp ? CLAMP_CLASS[clamp] : '',
            srOnly ? 'text--sr-only' : '',
            className,
        ]
            .filter(Boolean)
            .join(' ')

        return (
            <Tag ref={ref} className={classes} {...props}>
                {children}
            </Tag>
        )
    }
)

Text.displayName = 'Text'

export default Text
