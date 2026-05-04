"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button";
import Backdrop from "@/components/ui/backdrop/Backdrop";
import { getApiErrorMessage, readJsonResponse } from "../http";
import type {
    MessagingAdminSession,
    MessagingConversationSummary,
    MessagingThread,
} from "@types/index";

import "./messaging.css";

function formatConversationTimestamp(locale: string, value: string | null) {
    if (!value) {
        return null;
    }

    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(value));
}

function formatMessageTimestamp(locale: string, value: string) {
    return new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
    }).format(new Date(value));
}

export default function MessagingAdminPage() {
    const locale = useLocale();
    const t = useTranslations("messaging.admin");
    const [session, setSession] = useState<MessagingAdminSession | null>(null);
    const [conversations, setConversations] = useState<MessagingConversationSummary[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [thread, setThread] = useState<MessagingThread | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reply, setReply] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoadingSession, setIsLoadingSession] = useState(true);
    const [isLoadingConversations, setIsLoadingConversations] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const activeConversation = conversations.find((conversation) => conversation.id === activeConversationId) ?? null;

    useEffect(() => {
        const loadSession = async () => {
            setIsLoadingSession(true);

            try {
                const response = await fetch("/api/messaging/admin/session", {
                    cache: "no-store",
                });

                if (!response.ok) {
                    setSession(null);
                    return;
                }

                const payload = await readJsonResponse<{ session: MessagingAdminSession | null }>(
                    response,
                    t("errors.session"),
                );
                setSession(payload.session);
            } catch {
                setSession(null);
            } finally {
                setIsLoadingSession(false);
            }
        };

        void loadSession();
    }, []);

    useEffect(() => {
        if (!session) {
            return;
        }

        const loadConversations = async () => {
            setIsLoadingConversations(true);
            setError(null);

            try {
                const response = await fetch("/api/messaging/admin/conversations", {
                    cache: "no-store",
                });
                const payload = await readJsonResponse<{
                    conversations: MessagingConversationSummary[];
                    error?: string;
                }>(response, t("errors.list"));

                if (!response.ok) {
                    throw new Error(getApiErrorMessage(payload, t("errors.list")));
                }

                setConversations(payload.conversations);
                setActiveConversationId((current) => current ?? payload.conversations[0]?.id ?? null);

                if (!payload.conversations.length) {
                    setThread(null);
                }
            } catch (requestError) {
                setError(requestError instanceof Error ? requestError.message : t("errors.list"));
            } finally {
                setIsLoadingConversations(false);
            }
        };

        void loadConversations();
    }, [session, t]);

    useEffect(() => {
        if (!session || !activeConversationId) {
            return;
        }

        const loadThread = async () => {
            try {
                const response = await fetch(`/api/messaging/admin/conversations/${activeConversationId}`, {
                    cache: "no-store",
                });
                const payload = await readJsonResponse<{ error?: string; thread: MessagingThread }>(
                    response,
                    t("errors.thread"),
                );

                if (!response.ok) {
                    throw new Error(getApiErrorMessage(payload, t("errors.thread")));
                }

                setThread(payload.thread);
            } catch (requestError) {
                setError(requestError instanceof Error ? requestError.message : t("errors.thread"));
            }
        };

        void loadThread();
    }, [activeConversationId, session, t]);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/messaging/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const payload = await readJsonResponse<{
                error?: string;
                session?: MessagingAdminSession;
            }>(response, t("errors.login"));

            if (!response.ok) {
                throw new Error(getApiErrorMessage(payload, t("errors.login")));
            }

            setSession(payload.session ?? null);
            setPassword("");
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : t("errors.login"));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/messaging/admin/logout", {
                method: "POST",
            });
            const payload = await readJsonResponse<{ error?: string }>(response, t("errors.logout"));

            if (!response.ok) {
                throw new Error(getApiErrorMessage(payload, t("errors.logout")));
            }

            setSession(null);
            setConversations([]);
            setActiveConversationId(null);
            setThread(null);
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : t("errors.logout"));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReply = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!activeConversationId) {
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(
                `/api/messaging/admin/conversations/${activeConversationId}/messages`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message: reply }),
                },
            );
            const payload = await readJsonResponse<{ error?: string; thread: MessagingThread }>(
                response,
                t("errors.reply"),
            );

            if (!response.ok) {
                throw new Error(getApiErrorMessage(payload, t("errors.reply")));
            }

            setThread(payload.thread);
            setReply("");

            const refreshedConversations = await fetch("/api/messaging/admin/conversations", {
                cache: "no-store",
            });
            const refreshedPayload = await readJsonResponse<{
                conversations: MessagingConversationSummary[];
            }>(refreshedConversations, t("errors.list"));

            if (refreshedConversations.ok) {
                setConversations(refreshedPayload.conversations);
            }
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : t("errors.reply"));
        } finally {
            setIsSubmitting(false);
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

                {error ? <p className="messaging-status messaging-status--error">{error}</p> : null}

                {!session ? (
                    <Backdrop variant="card" className="messaging-admin__login">
                        <h2 className="messaging-card__title">{t("loginHeading")}</h2>
                        <p className="messaging-card__text">{t("loginDescription")}</p>

                        <form className="messaging-form" onSubmit={handleLogin}>
                            <label className="messaging-field">
                                <span className="messaging-field__label">{t("emailLabel")}</span>
                                <input
                                    className="messaging-field__input"
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    autoComplete="email"
                                />
                            </label>

                            <label className="messaging-field">
                                <span className="messaging-field__label">{t("passwordLabel")}</span>
                                <input
                                    className="messaging-field__input"
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    autoComplete="current-password"
                                />
                            </label>

                            <div className="messaging-form__actions">
                                <Button type="submit" loading={isSubmitting}>
                                    {t("loginAction")}
                                </Button>
                            </div>
                        </form>
                    </Backdrop>
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
                                    <Button variant="outline" onClick={handleLogout} loading={isSubmitting}>
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
                                        ? formatConversationTimestamp(
                                            locale,
                                            activeConversation.lastMessageAt ?? activeConversation.updatedAt,
                                        )
                                        : t("threadDescription")}
                                </span>
                            </div>

                            {isLoadingConversations ? (
                                <p className="messaging-admin__muted">{t("loadingConversations")}</p>
                            ) : conversations.length ? (
                                <ul className="messaging-admin__conversation-list">
                                    {conversations.map((conversation) => (
                                        <li key={conversation.id}>
                                            <button
                                                type="button"
                                                className={`messaging-admin__conversation${conversation.id === activeConversationId ? " messaging-admin__conversation--active" : ""}`}
                                                aria-pressed={conversation.id === activeConversationId}
                                                onClick={() => setActiveConversationId(conversation.id)}
                                            >
                                                <span className="messaging-admin__conversation-row">
                                                    <span className="messaging-admin__conversation-name">
                                                        {conversation.visitorUsername}
                                                    </span>
                                                    <span className="messaging-admin__conversation-time">
                                                        {formatConversationTimestamp(
                                                            locale,
                                                            conversation.lastMessageAt ?? conversation.updatedAt,
                                                        )}
                                                    </span>
                                                </span>
                                                <span className="messaging-admin__conversation-row messaging-admin__conversation-row--bottom">
                                                    <span className="messaging-admin__conversation-preview">
                                                        {conversation.lastMessagePreview ?? t("emptyPreview")}
                                                    </span>
                                                    <span
                                                        className={`messaging-admin__conversation-badge messaging-admin__conversation-badge--${conversation.status}`}
                                                    >
                                                        {conversation.unreadCount > 0
                                                            ? conversation.unreadCount
                                                            : conversation.status}
                                                    </span>
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="messaging-admin__empty">{t("emptyConversations")}</p>
                            )}
                        </Backdrop>

                        <Backdrop variant="card" className="messaging-admin__panel">
                            <div className="messaging-admin__thread-header messaging-admin__thread-header--panel">
                                <div className="messaging-admin__thread-copy">
                                    {thread ? (
                                        <span className="messaging-status messaging-status--ok">
                                            {thread.conversation.status}
                                        </span>
                                    ) : null}
                                    <h2 className="messaging-card__title">
                                        {thread ? thread.conversation.visitorUsername : t("threadHeading")}
                                    </h2>
                                    <p className="messaging-admin__meta">
                                        {thread ? thread.conversation.lastMessagePreview ?? t("emptyPreview") : t("threadDescription")}
                                    </p>
                                </div>

                                {thread ? (
                                    <div className="messaging-admin__thread-summary">
                                        <span className="messaging-admin__conversation-time">
                                            {formatConversationTimestamp(
                                                locale,
                                                thread.conversation.lastMessageAt ?? thread.conversation.updatedAt,
                                            )}
                                        </span>
                                    </div>
                                ) : null}
                            </div>

                            <div className="messaging-admin__panel-body">
                                <div className="messaging-thread messaging-admin__thread">
                                    {thread?.messages.length ? (
                                        thread.messages.map((entry) => (
                                            <article
                                                key={entry.id}
                                                className={`messaging-bubble messaging-bubble--${entry.senderRole}`}
                                            >
                                                <span className="messaging-bubble__role">
                                                    {entry.senderRole === "admin" ? t("roles.admin") : thread.conversation.visitorUsername}
                                                </span>
                                                <p className="messaging-bubble__body">{entry.body}</p>
                                                <span className="messaging-bubble__time">
                                                    {formatMessageTimestamp(locale, entry.createdAt)}
                                                </span>
                                            </article>
                                        ))
                                    ) : (
                                        <p className="messaging-thread__empty">{t("threadEmpty")}</p>
                                    )}
                                </div>

                                <form className="messaging-form messaging-admin__composer" onSubmit={handleReply}>
                                <label className="messaging-field">
                                    <span className="messaging-field__label">{t("replyLabel")}</span>
                                    <textarea
                                        className="messaging-field__textarea"
                                        value={reply}
                                        onChange={(event) => setReply(event.target.value)}
                                        placeholder={t("replyPlaceholder")}
                                        required
                                        maxLength={1500}
                                        disabled={!thread}
                                    />
                                </label>

                                    <div className="messaging-form__actions messaging-admin__composer-actions">
                                        <Button type="submit" loading={isSubmitting} disabled={!thread}>
                                            {t("replyAction")}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Backdrop>
                    </div>
                )}
            </div>
        </main>
    );
}