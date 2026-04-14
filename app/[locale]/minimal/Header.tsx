"use client";

import DarkModeToggle from "@/components/DarkModeToggle"
import Button from "@/components/ui/button";
import { Icon } from "@/components/ui/icon"
import { useTranslations } from 'next-intl';

export default function Header() {
    const t = useTranslations('header');

    return (
        <>
            <header className="minimal-header">
                <div className="minimal-header__availability">
                    <span>{t('available')}</span>

                </div>
                <ul className="minimal-header__network">
                    <li className="minimal-header__item">
                        <DarkModeToggle />

                    </li>
                    <li className="minimal-header__item">
                        <Button variant="primary" size="md" loading={false}>
                            <Icon name="linkedin" title="linkedin" sizeClass="icon-md" className="minimal-header__icon" />
                        </Button>
                    </li>
                    <li className="minimal-header__item">
                        <Button variant="primary" size="md" loading={false}>
                            <Icon name="github" title="github" sizeClass="icon-md" className="minimal-header__icon" />
                        </Button>
                    </li>
                    <li className="minimal-header__item">
                        <Button variant="primary" size="md" loading={false}>
                            <Icon name="email" title="email" sizeClass="icon-md" className="minimal-header__icon" />
                        </Button>
                    </li>
                    <li className="minimal-header__item">
                        <Button variant="primary" size="md" loading={false}>
                            <Icon name="phone" title="phone" sizeClass="icon-md" className="minimal-header__icon" />
                        </Button>
                    </li>
                </ul>
            </header>

        </>
    );
}   