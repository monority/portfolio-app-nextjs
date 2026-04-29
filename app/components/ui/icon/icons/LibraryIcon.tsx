'use client'

import React from 'react'
import type { IconProps } from '@/components/ui/icon/types'

const LibraryIcon = React.memo(({
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
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : true}
            role={title ? 'img' : undefined}
            {...props}
        >
            {title && <title>{title}</title>}
            <defs>
                <linearGradient id="g" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#7C83FF" />
                    <stop offset="50%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
            </defs>


            <path
                d="M8 12C8 9.8 9.8 8 12 8C14.2 8 16 9.8 16 12C16 14.2 14.2 16 12 16"
                stroke="url(#g)"
                strokeWidth="1.8"
                strokeLinecap="round"
            />

            <path
                d="M12 16C9.8 16 8 14.2 8 12"
                stroke="#22D3EE"
                strokeOpacity="0.5"
                strokeWidth="1.8"
                strokeLinecap="round"
            />

            <circle cx="12" cy="12" r="1.2" fill="currentColor" />

            <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeOpacity="0.06" />
        </svg>
    )
})

LibraryIcon.displayName = 'LibraryIcon'

export default LibraryIcon
