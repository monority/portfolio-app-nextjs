'use client'

import React from 'react'
import type { IconProps } from '@/components/ui/icon/types'

const ThreeJSIcon = React.memo(({
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
            <g xmlns="http://www.w3.org/2000/svg" transform="translate(8.964 4.2527), scale(0.14815)" fillRule="evenodd" stroke="currentColor" strokeLinecap="butt" strokeLinejoin="round" strokeWidth="4">
                <path d="m63.02 200.61-43.213-174.94 173.23 49.874z" />
                <path d="m106.39 50.612 21.591 87.496-86.567-24.945z" />
                <path d="m84.91 125.03-10.724-43.465 43.008 12.346z" />
                <path d="m63.458 38.153 10.724 43.465-43.008-12.346z" />
                <path d="m149.47 62.93 10.724 43.465-43.008-12.346z" />
                <path d="m84.915 125.06 10.724 43.465-43.008-12.346z" />
            </g>
        </svg>
    )
})

ThreeJSIcon.displayName = 'ThreeJSIcon'

export default ThreeJSIcon
