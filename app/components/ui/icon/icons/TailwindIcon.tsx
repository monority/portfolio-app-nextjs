'use client'

import React from 'react'
import type { IconProps } from '@/components/ui/icon/types'

const TailwindIcon = React.memo(({
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
            <g transform="scale(0.75)">
                {title && <title>{title}</title>}
                <path d="M9,13.7q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q11.1,10.9,9,13.7ZM2,22.1q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q4.1,19.3,2,22.1Z" fill="#44a8b3"></path>
            </g>
        </svg>
    )
})

TailwindIcon.displayName = 'TailwindIcon'

export default TailwindIcon
