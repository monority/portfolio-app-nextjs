"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Badge from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import LocalTime from "@/components/utils/LocalTime";

export default function Hero() {
    const t = useTranslations("hero");

    return (
        <section id="hero">
            <div className="hero-shell">
                <div className="hero-layout">
                    <div className="hero-header">
                        <div className="hero-header__titles">
                            <h1 className="hero-header__job">
                                {t("role").split(" ").map((word, index) => (
                                    <span key={`${word}-${index}`}>
                                        {index > 0 ? <br /> : null}
                                        {word}
                                    </span>
                                ))}
                            </h1>
                        </div>
                        <div className="hero-header__legend">
                            <div className="hero-header__avatar">
                                <Image
                                    src="/avatar.webp"
                                    alt={t("imageAlt")}
                                    width={720}
                                    height={960}
                                    className="hero-header__image"
                                    priority
                                />
                            </div>
                            <div className="hero-header__tech">
                                <Badge size="sm">
                                    <Icon name="react" />
                                    <span>React</span>
                                </Badge>
                                <Badge size="sm">
                                    <Icon name="nextjs" />
                                    <span>Next.js</span>
                                </Badge>
                                <Badge size="sm">
                                    <Icon name="node" />
                                    <span>Node.js</span>
                                </Badge>
                                <Badge size="sm">
                                    <Icon name="dotnet" />
                                    <span>.NET</span>
                                </Badge>
                                <Badge size="sm">
                                    <Icon name="typescript" />
                                    <span>TypeScript</span>
                                </Badge>

                            </div>
                        </div>
                    </div>
                    <div className="hero__description">
                        <h2>{t("name")}</h2>
                        <p className="hero__description-text">{t("description")}</p>
                    </div>
                    <div className="hero__city">
                        <Icon name="location" sizeClass="icon-sm" />
                        <span className="hero__text-muted">{t("city")}</span>
                    </div>
                    <div className="hero__availability">
                        <span className="hero__availability-dot" aria-hidden="true" />
                        <p className="hero__text-muted">{t("availability")}</p>
                    </div>

                </div>
            </div>
        </section>
    );
}
