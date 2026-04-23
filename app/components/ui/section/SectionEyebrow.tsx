import './section.css'

type SectionEyebrowProps = {
  number: string
  label: string
  className?: string
}

export default function SectionEyebrow({
  number,
  label,
  className = '',
}: SectionEyebrowProps) {
  const classes = ['section-eyebrow', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <span className="section-eyebrow__number">{number}</span>
      <span className="section-eyebrow__line" aria-hidden="true" />
      <span className="section-eyebrow__text">{label}</span>
    </div>
  )
}
