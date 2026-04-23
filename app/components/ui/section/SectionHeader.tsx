import './section.css'

type SectionHeaderProps = {
  title: string
  intro?: string
  className?: string
  titleClassName?: string
  introClassName?: string
  headingLevel?: 'h1' | 'h2' | 'h3'
}

export default function SectionHeader({
  title,
  intro,
  className = '',
  titleClassName = '',
  introClassName = '',
  headingLevel = 'h2',
}: SectionHeaderProps) {
  const HeadingTag = headingLevel
  const rootClasses = ['section-header', className].filter(Boolean).join(' ')
  const titleClasses = ['section-header__title', titleClassName].filter(Boolean).join(' ')
  const introClasses = ['section-header__intro', introClassName].filter(Boolean).join(' ')

  return (
    <div className={rootClasses}>
      <HeadingTag className={titleClasses}>{title}</HeadingTag>
      {intro ? <p className={introClasses}>{intro}</p> : null}
    </div>
  )
}
