'use client'

import React from 'react'
import type { IconProps } from '@/components/ui/icon/types'

const HumanworkforceIcon = React.memo(({
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
            <g transform="scale(0.1)">
                <defs>
                    <radialGradient id="hwfGradient" cx="50%" cy="40%" r="80%" fx="50%" fy="30%">
                        <stop offset="0%" stopColor="#4febeb" />
                        <stop offset="60%" stopColor="#50e9a9" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#16161a" stopOpacity="0.9" />
                    </radialGradient>
                </defs>

                <g fill="url(#hwfGradient)" stroke="none">
                    <path d="M24.5 54.9c-18.7 9.6-12 36.2 9.1 36.2 14.1 0 23.2-14.2 17.6-27.6-4-9.7-16.8-13.8-26.7-8.6z" />
                    <path d="M188.5 55.1c-18 10.9-9 37.7 12.1 36 21.2-1.8 25.2-30.8 5.2-37.6-6.3-2-12.1-1.5-17.3 1.6z" />
                    <path
                        d="M116.3 59.8c-16.1 4.6-30.3 19.9-32.3 34.9-0.5 2.8-0.9 6.3-1.3 7.8l-0.5 2.6-6.9-3.2c-14.9-7-35.1-3.4-46.3 8.2-10.6 11-12 17.3-11.5 49.8 0.4 25.6 0.4 25.9 3.8 33.1 11.7 25.2 43.5 31.7 64.1 13.2 9.3-8.2 12.6-15.3 13.4-29.7 1.3-20.2 7.8-26.3 29.2-27.8 27.1-2 44.2-18.1 44.5-42.1 0.2-30.4-27.5-52.2-56.2-44z m20.3 25c11.3 5.7 15.1 19.7 8.1 29-4.6 5.9-8 7.3-20.2 8.2-30.9 2.2-50.7 22.4-50.7 51.5 0 18.6-19.5 25.7-29.4 10.8-3.5-5.1-3.2-50.2 0.2-54.7 8.9-12 26.3-7.2 28.6 7.8l0.8 5.4 3.9-5.6c4.9-6.9 12.9-13.2 21.7-17.1 8.7-3.9 8.7-3.9 8.7-14.1 0-16.5 13.9-26.4 27.5-19.2z" />
                    <path
                        d="M188.6 104.9c-6.3 1.5-7.8 3-7.8 7.3 0 2.1-0.9 6.9-2.2 10.7-7.1 22.1-26.7 35.5-52 35.5-15.8 0-26.1 15.5-13.7 20.9 7.7 3.4 8 3.7 12.2 10.6 27.3 46.1 95.7 36.4 111.6-15.9 4.5-15.1 3.5-41.1-2.1-52-8-15.7-28.5-24.8-46-20.9z m17 25.1c7.1 3.6 8.5 8.2 8.1 26.1-0.3 14.3-0.7 17-3.1 21.5-11.5 21.5-39.1 27-56.8 11.2-5.9-5.3-7.2-7.4-4.4-7.4 3.2 0 16.4-7.2 21.2-11.7 6.2-5.8 10.9-15.2 12.1-23.7 1.8-14.2 12.1-21.3 22.9-15z" />


                </g> </g>
        </svg>
    )
})

HumanworkforceIcon.displayName = 'HumanworkforceIcon'

export default HumanworkforceIcon
