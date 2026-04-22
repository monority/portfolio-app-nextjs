'use client'

import React from 'react'
import type { IconProps } from '@/components/ui/icon/types'

const AxiosIcon = React.memo(({
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
            <g transform="scale(0.75)">
                <path
                    fill="#5a29e4"
                    d="m 34,43.977569 27.379067,-22.912155 0.0385,91.494586 -9.3189,7.74007 -0.15403,-76.091455 z" />
                <path
                    fill="#5a29e4"
                    d="M 96.961687,82.322502 69.582627,105.23466 69.544127,13.74007 78.863017,6 l 0.15403,76.091452 z" />

            </g>
        </svg>
    )
})

AxiosIcon.displayName = 'AxiosIcon'

export default AxiosIcon

