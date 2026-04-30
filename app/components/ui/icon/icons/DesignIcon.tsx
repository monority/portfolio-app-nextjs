'use client'

import React from 'react'
import type { IconProps } from '@/components/ui/icon/types'

const DesignIcon = React.memo(({
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
            <g transform="scale(01)">
                <path d="M20,20.854c0-1.136,0.642-2.175,1.658-2.683L24,17L17,3h-2L8,17l2.342,1.171 C11.358,18.679,12,19.718,12,20.854V21h-2v8h12v-8h-2V20.854z M11.236,16.382l-0.553-0.276L15,7.472V15h2V7.472l4.317,8.633 l-0.553,0.276C19.059,17.234,18,18.948,18,20.854V21h-4v-0.146C14,18.948,12.941,17.234,11.236,16.382z M20,27h-8v-4h8V27z"></path>
            </g>
        </svg>
    )
})

DesignIcon.displayName = 'DesignIcon'

export default DesignIcon
