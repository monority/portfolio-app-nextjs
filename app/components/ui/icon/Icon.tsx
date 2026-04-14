'use client'

import { useMemo } from 'react'
import { iconRegistry } from './registry'
import type { IconProps, IconName } from './types'

interface IconComponentProps extends Omit<IconProps, 'size'> {
    name: IconName
    size?: number | string
    sizeClass?: IconProps['sizeClass']
    className?: string
}

const Icon = ({
    name,
    size = 24,
    sizeClass,
    className = '',
    ...props
}: IconComponentProps) => {
    const Component = useMemo(() => iconRegistry[name], [name])

    if (!Component) {
        console.warn(`Icon "${name}" not found in registry`)
        return null
    }

    // Combiner les classes CSS
    const combinedClassName = [
        sizeClass,
        className
    ].filter(Boolean).join(' ')

    return (
        <Component
            size={sizeClass ? undefined : size}
            className={combinedClassName}
            {...props}
        />
    )
}

export default Icon
