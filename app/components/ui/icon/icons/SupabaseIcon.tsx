'use client'

import React from 'react'
import type { IconProps } from '../types'

const SupabaseIcon = React.memo(({
    size = 22,
    className = '',
    title,
    ...props
}: IconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden={title ? undefined : true}
            role={title ? 'img' : undefined}
            {...props}
        >
            {title && <title>{title}</title>}
            <g>
                <path
                    d="M16.7 3.2c-.4-.6-1.3-.6-1.7 0L3.7 19.2c-.5.7 0 1.8.9 1.8h7.6l-2.2 7.8c-.2.7.7 1.2 1.2.7l15.3-16.1c.6-.6.1-1.7-.8-1.7h-7.2l2.2-7.7z"
                    fill="#3ECF8E"
                />
            </g>
        </svg>
    )
})

SupabaseIcon.displayName = 'SupabaseIcon'

export default SupabaseIcon
