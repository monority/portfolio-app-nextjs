import React from 'react'
import './skeleton.css'

type SkeletonVariant  = 'block' | 'image' | 'text' | 'circle'
type SkeletonRoundness = 'sharp' | 'rounded' | 'circle'

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Visual shape of the skeleton. @default 'block' */
    variant?: SkeletonVariant
    /**
     * CSS aspect-ratio for `variant="image"`.
     * Accepts any valid CSS value: "16/9", "1/1", "4/3" …
     */
    aspectRatio?: string
    width?: string | number
    height?: string | number
    /** Override the border-radius. */
    roundness?: SkeletonRoundness
    /**
     * When `variant="text"`, repeat N skeleton lines with a staggered
     * shimmer delay. The last line is automatically narrower (65%).
     */
    lines?: number
}

/* ─── Internal single item ─────────────────────────────────────── */

interface SkeletonItemProps extends SkeletonProps {
    /** Internal — not part of the public SkeletonProps interface */
    staggerIndex?: number
}

const SkeletonItemInner = React.forwardRef<HTMLSpanElement, SkeletonItemProps>(
    (
        {
            variant   = 'block',
            aspectRatio,
            width,
            height,
            roundness,
            lines: _lines,        // consumed by Skeleton, not passed to DOM
            staggerIndex = 0,
            className = '',
            style,
            ...props
        },
        ref
    ) => {
        const classes = [
            'skeleton',
            `skeleton--${variant}`,
            roundness ? `skeleton--${roundness}` : '',
            className,
        ]
            .filter(Boolean)
            .join(' ')

        const inlineStyle: React.CSSProperties = {
            ...(width       && { width:       typeof width  === 'number' ? `${width}px`  : width  }),
            ...(height      && { height:      typeof height === 'number' ? `${height}px` : height }),
            ...(aspectRatio && { aspectRatio }),
            // Stagger via CSS custom property — no re-render, compositor-only
            ...(staggerIndex > 0 && ({ '--skeleton-delay': `${staggerIndex * 0.08}s` } as React.CSSProperties)),
            ...style,
        }

        return (
            <span
                ref={ref}
                className={classes}
                style={inlineStyle}
                aria-hidden="true"
                {...props}
            />
        )
    }
)

SkeletonItemInner.displayName = 'SkeletonItemInner'

const SkeletonItem = React.memo(SkeletonItemInner)
SkeletonItem.displayName = 'SkeletonItem'

/* ─── Public component ─────────────────────────────────────────── */

const SkeletonInner = React.forwardRef<HTMLSpanElement, SkeletonProps>(
    ({ variant = 'block', lines, ...props }, ref) => {
        if (variant === 'text' && lines && lines > 1) {
            return (
                <>
                    {Array.from({ length: lines }, (_, i) => (
                        <SkeletonItem
                            key={i}
                            variant="text"
                            staggerIndex={i}
                            // Only the first item gets the forwarded ref
                            ref={i === 0 ? ref : undefined}
                            {...props}
                        />
                    ))}
                </>
            )
        }

        return <SkeletonItem ref={ref} variant={variant} {...props} />
    }
)

SkeletonInner.displayName = 'SkeletonInner'

const Skeleton = React.memo(SkeletonInner)
Skeleton.displayName = 'Skeleton'

export default Skeleton
