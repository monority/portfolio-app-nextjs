import { useTranslations } from "next-intl";

export default function About() {
    const t = useTranslations("about");
    return (
        <section className="about">
            <div className="about-shell">
                <h1 className="about-title">{t("title")}</h1>
            </div>
        </section>
    )
}