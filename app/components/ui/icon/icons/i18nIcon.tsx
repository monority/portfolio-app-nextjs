'use client'

import React from 'react'
import type { IconProps } from '@/components/ui/icon/types'

const i18nIcon = React.memo(({
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
            <g transform="scale(0.0325)">
                <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M488.797 538.208 384.392 435.04l1.237-1.28c69.63-77.385 121.655-168.946 152.491-268.373h120.448V83.0827H370.824V.906738h-82.219V83.1254H.818604v82.2616H459.997c-28.404 81.238-72.699 156.007-130.304 219.946-37.519-41.579-69.448-87.879-94.976-137.728h-82.176c30.824 68.465 72.139 131.704 122.454 187.435L65.7999 641.419l58.3681 58.368 205.525-205.526 127.872 127.83 31.232-83.84"
                    fill="#7986CB"
                />
            </g>
        </svg>
    )
})

i18nIcon.displayName = 'i18nIcon'

export default i18nIcon
