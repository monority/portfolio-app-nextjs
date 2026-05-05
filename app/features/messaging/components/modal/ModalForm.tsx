"use client";

import { useTranslations } from "next-intl";

import Button from "@/components/ui/button";
import FormField from "../shared/FormField";

interface ModalFormProps {
    username: string;
    onUsernameChange: (value: string) => void;
    message: string;
    onMessageChange: (value: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
    hasThread: boolean;
}

export default function ModalForm({
    username,
    onUsernameChange,
    message,
    onMessageChange,
    onSubmit,
    isSubmitting,
    hasThread,
}: ModalFormProps) {
    const t = useTranslations("messaging");

    return (
        <form className="msg-form" onSubmit={onSubmit}>
            {!hasThread && (
                <FormField label={t("visitor.usernameLabel")}>
                    <input
                        className="msg-input"
                        value={username}
                        onChange={(e) => onUsernameChange(e.target.value)}
                        placeholder={t("visitor.usernamePlaceholder")}
                        autoComplete="nickname"
                        required
                        minLength={3}
                        maxLength={24}
                    />
                </FormField>
            )}
            <FormField label={t("visitor.messageLabel")}>
                <textarea
                    className="msg-textarea"
                    value={message}
                    onChange={(e) => onMessageChange(e.target.value)}
                    placeholder={t("visitor.messagePlaceholder")}
                    required
                    maxLength={1500}
                />
            </FormField>
            <Button type="submit" loading={isSubmitting} fullWidth>
                {hasThread ? t("visitor.replyAction") : t("visitor.startAction")}
            </Button>
        </form>
    );
}
