import Backdrop from "@/components/ui/backdrop/Backdrop";
import Card from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function Hero() {
    const t = useTranslations('minimal.hero');
    return (
        <section id="hero">
            <Backdrop variant="premium" className="minimal-hero">
                <div className="minimal-hero-header">

                    <p className="minimal-hero__subtitle muted accent">Creative Developer</p>
                    <h1 className="minimal-hero__title">Ronan Chenu</h1>
                </div>
                <div className="minimal-hero-description">
                    <Backdrop variant="card">
                        <div className="minimal-hero-description__item">
                            <p>{t('descriptions.projectOnline')}</p>
                        </div>
                    </Backdrop>
                </div>
            </Backdrop>

        </section>
    )
}
