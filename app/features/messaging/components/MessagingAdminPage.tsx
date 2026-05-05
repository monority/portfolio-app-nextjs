"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import Button from "@/components/ui/button";
import Backdrop from "@/components/ui/backdrop/Backdrop";
import { useAdminSession } from "../hooks/useAdminSession";
import { useAdminConversations } from "../hooks/useAdminConversations";
import AdminLogin from "./admin/AdminLogin";
import ConversationList from "./admin/ConversationList";
import AdminThread from "./admin/AdminThread";
import AdminComposer from "./admin/AdminComposer";

import "./admin/admin.css";

function formatTimestamp(locale: string, value: string | null): string | null {
    if (!value) return null;
    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(value));
}

export default function MessagingAdminPage() {
    const locale = useLocale();
    const t = useTranslations("messaging.admin");

    const {
        session,
        isLoading: isLoadingSession,
        error: sessionError,
        setError: setSessionError,
        login,
        logout,
    } = useAdminSession();

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const {
        conversations,
        activeConversationId,
        setActiveConversationId,
        thread,
        reply,
        setReply,
        isLoadingConversations,
        isSubmitting,
        error: convError,
        sendReply,
    } = useAdminConversations(session);

    const error = sessionError ?? convError;
    const activeConversation = conversations.find((c) => c.id === activeConversationId) ?? null;

    const handleLogin = async (email: string, password: string) => {
        try {
            await login(email, password);
        } catch (err) {
            setSessionError(err instanceof Error ? err.message : t("errors.login"));
        }
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
        } catch (err) {
            setSessionError(err instanceof Error ? err.message : t("errors.logout"));
        } finally {
            setIsLoggingOut(false);
        }
    };

    if (isLoadingSession) {
        return (
            <main className="messaging-admin">
                <div className="messaging-admin__shell">
                    <p className="messaging-admin__muted">{t("loadingSession")}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="messaging-admin">
            <div className="messaging-admin__shell">
                <div className="messaging-admin__topbar">
                    <div>
                        <span className="messaging-admin__eyebrow">{t("eyebrow")}</span>
                        <h1 className="messaging-admin__title">{t("heading")}</h1>
                        <p className="messaging-admin__description">{t("description")}</p>
                    </div>
                    <Link href={`/${locale}`} className="btn btn-outline btn-md">
                        {t("backHome")}
                    </Link>
                </div>

                {error && (
                    <p className="messaging-status messaging-status--error" role="alert">{error}</p>
                )}

                {!session ? (
                    <AdminLogin onLogin={handleLogin} error={sessionError} />
                ) : (
                    <div className="messaging-admin__layout">
                        <Backdrop variant="card" className="messaging-admin__sidebar">
                            <div className="messaging-admin__thread-header messaging-admin__thread-header--sidebar">
                                <div className="messaging-admin__thread-copy">
                                    <h2 className="messaging-card__title">{t("listHeading")}</h2>
                                    <p className="messaging-admin__meta">
                                        {t("sessionActive", { email: session.email ?? "admin" })}
                                    </p>
                                </div>
                                <div className="messaging-admin__actions">
                                    <Button variant="outline" onClick={handleLogout} loading={isLoggingOut}>
                                        {t("logoutAction")}
                                    </Button>
                                </div>
                            </div>

                            <div className="messaging-admin__session-band">
                                <span className="messaging-status messaging-status--ok">
                                    {session.email ?? "admin"}
                                </span>
                                <span className="messaging-admin__meta">
                                    {activeConversation
                                        ? formatTimestamp(locale, activeConversation.lastMessageAt ?? activeConversation.updatedAt)
                                        : t("threadDescription")}
                                </span>
                            </div>

                            <ConversationList
                                conversations={conversations}
                                activeConversationId={activeConversationId}
                                isLoading={isLoadingConversations}
                                onSelect={setActiveConversationId}
                            />
                        </Backdrop>

                        <Backdrop variant="card" className="messaging-admin__panel">
                            <div className="messaging-admin__thread-header messaging-admin__thread-header--panel">
                                <div className="messaging-admin__thread-copy">
                                    {thread && (
                                        <span className="messaging-status messaging-status--ok">
                                            {thread.conversation.status}
                                        </span>
                                    )}
                                    <h2 className="messaging-card__title">
                                        {thread ? thread.conversation.visitorUsername : t("threadHeading")}
                                    </h2>
                                    <p className="messaging-admin__meta">
                                        {thread
                                            ? thread.conversation.lastMessagePreview ?? t("emptyPreview")
                                            : t("threadDescription")}
                                    </p>
                                </div>
                                {thread && (
                                    <div className="messaging-admin__thread-summary">
                                        <span className="messaging-admin__conversation-time">
                                            {formatTimestamp(
                                                locale,
                                                thread.conversation.lastMessageAt ?? thread.conversation.updatedAt,
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="messaging-admin__panel-body">
                                <AdminThread thread={thread} />
                                <AdminComposer
                                    value={reply}
                                    onChange={setReply}
                                    onSubmit={sendReply}
                                    isSubmitting={isSubmitting}
                                    disabled={!thread}
                                />
                            </div>
                        </Backdrop>
                    </div>
                )}
            </div>
        </main>
    );
}

