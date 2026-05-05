'use client'

import React from 'react'
import type { IconProps } from '@/components/ui/icon/types'

const NpmIcon = React.memo(({
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
            <rect width="24" height="24" fill="#D40001"></rect> <path fill="#FFF" d="M16.7179487,7.92840493 L12.2051282,7.92840493 L12.2051282,20.2494172 L4,20.2494172 L4,3 L12.2051282,3 L20,3 L20,7.92840493 L20,20.2494172 L16.7179487,20.2494172 L16.7179487,7.92840493 Z"></path>
        </svg>
    )
})

NpmIcon.displayName = 'NpmIcon'

export default NpmIcon
