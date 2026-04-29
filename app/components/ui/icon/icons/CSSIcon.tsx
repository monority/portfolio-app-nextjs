'use client'

import React from 'react'
import type { IconProps } from '@/components/ui/icon/types'

const CSSIcon = React.memo(({
    size = 24,
    className = '',
    title,
    ...props
}: IconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden={title ? undefined : true}
            role={title ? 'img' : undefined}
            {...props}
        >
            {title && <title>{title}</title>}
            <g transform="scale(0.7)">
                <path d="M6 28L4 3H28L26 28L16 31L6 28Z" fill="#1172B8"></path> <path d="M26 5H16V29.5L24 27L26 5Z" fill="#33AADD"></path> <path d="M19.5 17.5H9.5L9 14L17 11.5H9L8.5 8.5H24L23.5 12L17 14.5H23L22 24L16 26L10 24L9.5 19H12.5L13 21.5L16 22.5L19 21.5L19.5 17.5Z" fill="white"></path>
            </g>
        </svg >
    )
})

CSSIcon.displayName = 'CSSIcon'

export default CSSIcon
