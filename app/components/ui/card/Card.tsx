"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import './card.css'

type CardLayout = 'stack' | 'overlay'
type CardSize = 'sm' | 'md' | 'lg'

export interface CardProps {
    title: string
    description?: string
    category?: string
    year?: string
    badge?: string
    tags?: string[]
    image?: { src: string; alt: string }
    href?: string
    layout?: CardLayout
    size?: CardSize
    className?: string
    onClick?: () => void
}

const CardInner = React.forwardRef<HTMLElement, CardProps>((
    { title, description, category, year, badge, tags, image, href, layout = 'stack', size = 'md', className = '', onClick },
    ref
) => {
    const classes = ['card', `card-${layout}`, `card-${size}`, className].filter(Boolean).join(' ')

    const media = image && (
        <div className="card__media">
            <Image
                src={image.src}
                alt={image.alt}
                fill
                className="card__img"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
    )

    const body = (
        <div className="card__body">
            {(badge || category) && (
                <div className="card__meta">
                    {badge && <span className="card__badge">{badge}</span>}
                    {category && <span className="card__category">{category}</span>}
                </div>
            )}
            <h3 className="card__title">{title}</h3>
            {description && <p className="card__desc">{description}</p>}
            {(year || tags?.length) && (
                <footer className="card__footer">
                    {year && <time className="card__year">{year}</time>}
                    {tags?.map(tag => <span key={tag} className="card__tag">{tag}</span>)}
                </footer>
            )}
        </div>
    )

    return (
        <motion.article
            ref={ref as React.Ref<HTMLDivElement>}
            className={classes}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
            {layout === 'overlay' ? (
                <>
                    {media}
                    {body}
                    {href && <Link href={href} className="card__link" aria-label={title} />}
                </>
            ) : href ? (
                <Link href={href} className="card__link">
                    {media}
                    {body}
                </Link>
            ) : (
                <>{media}{body}</>
            )}
        </motion.article>
    )
})

CardInner.displayName = 'CardInner'
const Card = React.memo(CardInner)
Card.displayName = 'Card'
export default Card
