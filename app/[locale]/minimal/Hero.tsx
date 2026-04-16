import { useTranslations } from "next-intl";

export default function Hero() {
    const t = useTranslations('minimal.hero');
    return (
        <section id="hero">
            <div className="card-full">
                <div className="minimal-hero-header">

                    <p className="minimal-hero__subtitle muted accent">Creative Developer</p>
                    <h1 className="minimal-hero__title">Ronan Chenu</h1>
                </div>
                <div className="minimal-hero-description">
                    <div className="minimal-hero-description__item card-muted">
                        <p>{t('descriptions.projectOnline')}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
