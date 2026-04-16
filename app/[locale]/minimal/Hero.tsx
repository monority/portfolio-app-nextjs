import { useTranslations } from "next-intl";

export default function Hero() {
    const t = useTranslations('minimal');
    return (
        <section id="hero">
            <div className="minimal-hero-header card-full">

                <p className="minimal-hero__subtitle muted accent">Creative Developer</p>
                <h1 className="minimal-hero__title">Ronan Chenu</h1>
            </div>
            <div className="minimal-hero-description">
                <div className="minimal-hero-description__item">
                </div>
            </div>
        </section>
    )
}
