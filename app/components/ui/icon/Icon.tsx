'use client'

import { useMemo } from 'react'
import { iconRegistry } from '@/components/ui/icon/registry'
import type { IconProps, IconName } from '@/components/ui/icon/types'

interface IconComponentProps extends Omit<IconProps, 'size'> {
    name: IconName
    size?: number | string
    sizeClass?: IconProps['sizeClass']
    className?: string
}

const Icon = ({
    name,
    size,
    sizeClass,
    className = '',
    ...props
}: IconComponentProps) => {
    const Component = useMemo(() => iconRegistry[name], [name])

    if (!Component) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`Icon "${name}" not found in registry`)
        }
        return null
    }

    const combinedClassName = [
        'icon',
        sizeClass,
        className
    ].filter(Boolean).join(' ')

    return (
        <Component
            style={size && !sizeClass ? { width: size, height: size } : undefined}
            className={combinedClassName}
            {...props}
        />
    )
}

export default Icon
