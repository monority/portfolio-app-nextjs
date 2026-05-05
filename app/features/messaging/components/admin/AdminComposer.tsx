"use client";

import { useTranslations } from "next-intl";

import Button from "@/components/ui/button";
import FormField from "../shared/FormField";

interface AdminComposerProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
    disabled: boolean;
}

export default function AdminComposer({
    value,
    onChange,
    onSubmit,
    isSubmitting,
    disabled,
}: AdminComposerProps) {
    const t = useTranslations("messaging.admin");

    return (
        <form className="messaging-form messaging-admin__composer" onSubmit={onSubmit}>
            <FormField label={t("replyLabel")}>
                <textarea
                    className="msg-textarea"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={t("replyPlaceholder")}
                    required
                    maxLength={1500}
                    disabled={disabled}
                />
            </FormField>
            <div className="messaging-form__actions messaging-admin__composer-actions">
                <Button type="submit" loading={isSubmitting} disabled={disabled}>
                    {t("replyAction")}
                </Button>
            </div>
        </form>
    );
}
