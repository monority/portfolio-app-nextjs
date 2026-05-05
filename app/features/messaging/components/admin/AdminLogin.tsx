"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import Button from "@/components/ui/button";
import Backdrop from "@/components/ui/backdrop/Backdrop";
import FormField from "../shared/FormField";

interface AdminLoginProps {
    onLogin: (email: string, password: string) => Promise<void>;
    error: string | null;
}

export default function AdminLogin({ onLogin, error }: AdminLoginProps) {
    const t = useTranslations("messaging.admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            await onLogin(email, password);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Backdrop variant="card" className="messaging-admin__login">
            <h2 className="messaging-card__title">{t("loginHeading")}</h2>
            <p className="messaging-card__text">{t("loginDescription")}</p>

            {error && (
                <p className="messaging-status messaging-status--error" role="alert">{error}</p>
            )}

            <form className="messaging-form" onSubmit={handleSubmit}>
                <FormField label={t("emailLabel")}>
                    <input
                        className="msg-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </FormField>

                <FormField label={t("passwordLabel")}>
                    <input
                        className="msg-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </FormField>

                <div className="messaging-form__actions">
                    <Button type="submit" loading={isSubmitting}>
                        {t("loginAction")}
                    </Button>
                </div>
            </form>
        </Backdrop>
    );
}
