'use client'

import React from 'react'
import type { IconProps } from '@/components/ui/icon/types'

const MotionIcon = React.memo(({
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
            <g transform="scale(0.5)">
                <path d="m47.3 3.7v21.8l-10.9 10.9-10.9 10.9-10.9-10.9 10.9-10.9v.1-.1z" fill="#59529d" />
                <path d="m47.3 25.5v21.8l-10.9-10.9z" fill="#5271b4" />
                <path d="m25.5 25.5-10.9 10.9-10.9 10.9v-43.6l10.9 10.9z" fill="#bb4b96" />
            </g>
        </svg>
    )
})

MotionIcon.displayName = 'MotionIcon'

export default MotionIcon
