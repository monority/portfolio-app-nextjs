'use client'

import React from 'react'
import type { IconProps } from '@/components/ui/icon/types'

const UnityIcon = React.memo(({
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
            <g transform="scale(1)">
                <path d="m15.266 12.001 4.2-7.249 2.03 7.253-2.03 7.25-4.2-7.25zm-2.047 1.177 4.201 7.254-7.316-1.876-5.285-5.378zm4.2-9.608-4.2 7.253h-8.4l5.285-5.378 7.314-1.875zm6 5.963-2.566-9.533-9.564 2.555-1.416 2.489-2.873-.021-7 6.978 7 6.977 2.871-.022 1.418 2.489 9.564 2.554 2.56-9.531-1.453-2.468z"></path>
            </g>
        </svg>
    )
})

UnityIcon.displayName = 'UnityIcon'

export default UnityIcon
