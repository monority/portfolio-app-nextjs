import Button from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/components/ui/icon/types";
import { useTranslations } from "next-intl";

export default function About() {
    const t = useTranslations("about");

    const frontend__tech: IconName[] = ["react", "astro", "nextjs", "motion"];
    const backend__tech: IconName[] = ["node", "express", "mongo", "jwt", "nodemon", "sql"];
    const hosting__tech: IconName[] = ["vercel", "railway", "supabase", "render", "neon"];
    const tools__tech: IconName[] = ["github", "vscode", "postman", "figma", "docker"];
    const language__tech: IconName[] = ["typescript", "javascript", "csharp"];
    //    git, mongoose, cors, dotenv, github, vscode, bcrypt

    return (
        <section className="about">
            <div className="about-shell">
                <div className="about-header">
                    <div className="about-header__description">

                    </div>
                    <h1 className="about-header__title">{t("title")}</h1>
                    <p className="about-header__description">
                        {t("description")}
                    </p>
                </div>
                <div className="about-tech">
                    <div className="about-tech__front">
                        <h2 className="about-tech__title">Front-end</h2>
                        <ul className="front-tech__list">
                            {frontend__tech.map((tech) => (
                                <li key={tech} className="front-tech__item">
                                    <Button size="lg">
                                        <Icon name={tech} />
                                    </Button>
                                </li>
                            ))}
                            <ul className="back-tech__list">
                                {backend__tech.map((tech) => (
                                    <li key={tech} className="back-tech__item">
                                        <Button size="lg">
                                            <Icon name={tech} />
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                            <ul className="hosting-tech__list">
                                {hosting__tech.map((tech) => (
                                    <li key={tech} className="hosting-tech__item">
                                        <Button size="lg">
                                            <Icon name={tech} />
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                            <ul className="language-tech__list">
                                {language__tech.map((tech) => (
                                    <li key={tech} className="language-tech__item">
                                        <Button size="lg">
                                            <Icon name={tech} />
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </ul>
                    </div>
                </div>
            </div >
        </section >
    )
}