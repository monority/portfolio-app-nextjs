import TechStack, { type TechStackGroup } from "@/components/ui/tech-stack";
import { useTranslations } from "next-intl";

const techGroups: readonly Omit<TechStackGroup, "title">[] = [
    {
        id: "frontend",
        items: ["react", "nextjs", "astro", "tailwind", "sass" , "motion"],
        wrapperClassName: "about-tech__front",
        titleClassName: "about-tech__title",
        listClassName: "front-tech__list",
        itemClassName: "front-tech__item",
    },
    {
        id: "backend",
        items: ["node", "express", "mongo", "jwt", "nodemon", "sql"],
        wrapperClassName: "about-tech-back",
        titleClassName: "about-tech-front__title",
        listClassName: "about-tech-back__list",
        itemClassName: "about-tech-back__item",
    },
    {
        id: "hosting",
        items: ["vercel", "railway", "supabase", "render", "neon"],
        wrapperClassName: "about-tech-hosting",
        titleClassName: "about-tech-front__title",
        listClassName: "about-tech-hosting__list",
        itemClassName: "about-tech-hosting__item",
    },
    {
        id: "languages",
        items: ["typescript", "javascript", "csharp"],
        wrapperClassName: "about-tech-language",
        titleClassName: "about-tech-front__title",
        listClassName: "about-tech-language__list",
        itemClassName: "about-tech-language__item",
    },
    {
        id: "tools",
        items: ["github", "vscode", "postman", "figma", "docker", "photoshop"],
        wrapperClassName: "about-tech-tools",
        titleClassName: "about-tech-front__title",
        listClassName: "about-tech-tools__list",
        itemClassName: "about-tech-tools__item",
    },
] as const;

export default function About() {
    const t = useTranslations("about");
    const localizedTechGroups: TechStackGroup[] = techGroups.map((group) => ({
        ...group,
        title: group.id === "frontend" ? "Front-end" : t(`tech.${group.id}`),
    }));

    return (
        <section className="about">
            <div className="about-shell">
                <div className="about-header">
                    <div className="about-header__description"></div>
                    <h1 className="about-header__title heading-title">{t("title")}</h1>
                    <p className="about-header__description">
                        {t("description")}
                    </p>
                </div>
                <TechStack
                    className="about-tech"
                    groups={localizedTechGroups}
                />
            </div>
        </section>
    )
}
