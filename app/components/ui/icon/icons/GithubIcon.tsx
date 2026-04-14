'use client'

import React from 'react'
import type { IconProps } from '../types'

const GithubIcon = React.memo(({
    size = 24,
    className = '',
    title,
    ...props
}: IconProps) => {
    return (
        <svg
            {...(size !== undefined && { width: size, height: size })}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden={title ? undefined : true}
            role={title ? 'img' : undefined}
            {...props}
        >
            {title && <title>{title}</title>}
            <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.44c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.41-4.04-1.41-.55-1.4-1.34-1.77-1.34-1.77-1.1-.76.08-.75.08-.75 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.31 3.52 1 .11-.79.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.92 0-1.31.47-2.38 1.25-3.22-.13-.31-.54-1.54.12-3.2 0 0 1.01-.32 3.3 1.23a11.48 11.48 0 016 0c2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.89.12 3.2.78.84 1.25 1.91 1.25 3.22 0 4.6-2.81 5.62-5.49 5.91.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
    )
})

GithubIcon.displayName = 'GithubIcon'

export default GithubIcon
