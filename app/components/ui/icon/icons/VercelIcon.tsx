'use client'

import React from 'react'
import type { IconProps } from '../types'

const VercelIcon = React.memo(({
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
            <g transform="scale(1.6)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.49998 1L6.92321 2.00307L1.17498 12L0.599976 13H1.7535H13.2464H14.4L13.825 12L8.07674 2.00307L7.49998 1ZM7.49998 3.00613L2.3285 12H12.6714L7.49998 3.00613Z"
                    fill="currentColor"
                />
            </g>
        </svg>
    )
})

VercelIcon.displayName = 'VercelIcon'

export default VercelIcon
