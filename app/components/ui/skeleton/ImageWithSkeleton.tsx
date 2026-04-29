'use client'

import React, { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import Skeleton from './Skeleton'

export type ImageWithSkeletonProps = ImageProps & {
    /** CSS aspect-ratio — ex: "16/9", "1/1", "4/3" */
    aspectRatio?: string
    roundness?: 'sharp' | 'rounded' | 'circle'
    wrapperClassName?: string
}

const ImageWithSkeleton = React.memo(function ImageWithSkeleton({
    aspectRatio,
    roundness,
    wrapperClassName = '',
    onLoad,
    style,
    ...imageProps
}: ImageWithSkeletonProps) {
    const [loaded, setLoaded] = useState(false)

    return (
        <div
            className={wrapperClassName}
            style={{
                position: 'relative',
                width: '100%',
                ...(aspectRatio && { aspectRatio }),
            }}
        >
            {!loaded && (
                <Skeleton
                    variant="image"
                    roundness={roundness}
                    style={{ position: 'absolute', inset: 0 }}
                />
            )}
            <Image
                {...imageProps}
                onLoad={(e) => {
                    setLoaded(true)
                    onLoad?.(e)
                }}
                style={{
                    ...style,
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            />
        </div>
    )
})

ImageWithSkeleton.displayName = 'ImageWithSkeleton'

export default ImageWithSkeleton
