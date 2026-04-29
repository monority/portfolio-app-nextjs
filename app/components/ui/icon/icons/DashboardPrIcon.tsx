'use client'

import React from 'react'
import type { IconProps } from '@/components/ui/icon/types'

const DashboardPrIcon = React.memo(({
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
            stroke="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden={title ? undefined : true}
            role={title ? 'img' : undefined}
            {...props}
        >
            {title && <title>{title}</title>}
            <g transform='scale(0.375)'>
                <rect width="64" height="64" rx="14" fill="#0f62fe" />
                <path d="M17 18h12v12H17zm18 0h12v20H35zM17 36h12v10H17zm18 0h12v10H35z" fill="#fff" />
            </g>
        </svg >
    )
})

DashboardPrIcon.displayName = 'DashboardPrIcon'

export default DashboardPrIcon
