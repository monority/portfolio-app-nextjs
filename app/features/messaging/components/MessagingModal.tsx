"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button";
import Backdrop from "@/components/ui/backdrop/Backdrop";
import { getApiErrorMessage, readJsonResponse } from "../http";
import type { MessagingThread } from "@types/index";

import "./messaging.css";

interface MessagingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MessagingModal({ isOpen, onClose }: MessagingModalProps) {
    const t = useTranslations("messaging");
    const [thread, setThread] = useState<MessagingThread | null>(null);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        document.body.style.overflow = "hidden";

        const loadThread = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch("/api/messaging/visitor/thread", {
                    cache: "no-store",
                });
                const payload = await readJsonResponse<{ error?: string; thread: MessagingThread | null }>(
                    response,
                    t("visitor.errors.load"),
                );

                if (!response.ok) {
                    throw new Error(getApiErrorMessage(payload, t("visitor.errors.load")));
                }

                setThread(payload.thread);
                setUsername(payload.thread?.conversation.visitorUsername ?? "");
            } catch (requestError) {
                setError(requestError instanceof Error ? requestError.message : t("visitor.errors.load"));
            } finally {
                setIsLoading(false);
            }
        };

        void loadThread();

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen, t]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(
                thread ? "/api/messaging/visitor/messages" : "/api/messaging/visitor/conversation",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        thread
                            ? { message }
                            : {
                                username,
                                message,
                            },
                    ),
                },
            );
            const payload = await readJsonResponse<{ error?: string; thread: MessagingThread }>(
                response,
                t("visitor.errors.submit"),
            );

            if (!response.ok) {
                throw new Error(getApiErrorMessage(payload, t("visitor.errors.submit")));
            }

            setThread(payload.thread);
            setUsername(payload.thread.conversation.visitorUsername);
            setMessage("");
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : t("visitor.errors.submit"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen ? (
                <motion.div className="messaging-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.button
                        type="button"
                        className="messaging-modal__backdrop"
                        aria-label={t("close")}
                        onClick={onClose}
                    />

                    <motion.section
                        className="messaging-modal__surface"
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 18, scale: 0.98 }}
                        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="messaging-modal-title"
                    >
                        <header className="messaging-modal__header">
                            <div>
                                <span className="messaging-modal__eyebrow">{t("eyebrow")}</span>
                                <h2 id="messaging-modal-title" className="messaging-modal__title">
                                    {t("title")}
                                </h2>
                                <p className="messaging-modal__description">{t("description")}</p>
                            </div>

                            <button type="button" className="messaging-modal__close" onClick={onClose}>
                                ×
                            </button>
                        </header>

                        <div className="messaging-modal__body">
                            <Backdrop variant="card" className="messaging-card">
                                <span className={`messaging-status ${thread ? "messaging-status--ok" : "messaging-status--ok"}`}>
                                    {thread ? t("visitor.status.ready") : t("visitor.status.new")}
                                </span>
                                <h3 className="messaging-card__title">
                                    {thread
                                        ? t("visitor.threadLabel", { username: thread.conversation.visitorUsername })
                                        : t("visitor.introTitle")}
                                </h3>
                                <p className="messaging-card__text">
                                    {thread ? t("visitor.introResume") : t("visitor.introBody")}
                                </p>
                            </Backdrop>

                            {error ? <p className="messaging-status messaging-status--error">{error}</p> : null}

                            <div className="messaging-thread" aria-live="polite">
                                {isLoading ? (
                                    <p className="messaging-thread__empty">{t("visitor.loading")}</p>
                                ) : thread?.messages.length ? (
                                    thread.messages.map((entry) => (
                                        <article
                                            key={entry.id}
                                            className={`messaging-bubble messaging-bubble--${entry.senderRole}`}
                                        >
                                            <span className="messaging-bubble__role">
                                                {entry.senderRole === "admin" ? t("visitor.roles.admin") : thread.conversation.visitorUsername}
                                            </span>
                                            <p className="messaging-bubble__body">{entry.body}</p>
                                            <span className="messaging-bubble__time">
                                                {new Intl.DateTimeFormat(undefined, {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    day: "2-digit",
                                                    month: "short",
                                                }).format(new Date(entry.createdAt))}
                                            </span>
                                        </article>
                                    ))
                                ) : (
                                    <p className="messaging-thread__empty">{t("visitor.empty")}</p>
                                )}
                            </div>

                            <form className="messaging-form" onSubmit={handleSubmit}>
                                {!thread ? (
                                    <div className="messaging-form__grid">
                                        <label className="messaging-field">
                                            <span className="messaging-field__label">{t("visitor.usernameLabel")}</span>
                                            <input
                                                className="messaging-field__input"
                                                value={username}
                                                onChange={(event) => setUsername(event.target.value)}
                                                placeholder={t("visitor.usernamePlaceholder")}
                                                autoComplete="nickname"
                                                required
                                                minLength={3}
                                                maxLength={24}
                                            />
                                        </label>
                                    </div>
                                ) : null}

                                <label className="messaging-field">
                                    <span className="messaging-field__label">{t("visitor.messageLabel")}</span>
                                    <textarea
                                        className="messaging-field__textarea"
                                        value={message}
                                        onChange={(event) => setMessage(event.target.value)}
                                        placeholder={t("visitor.messagePlaceholder")}
                                        required
                                        maxLength={1500}
                                    />
                                </label>

                                <div className="messaging-form__actions">
                                    <Button type="submit" loading={isSubmitting}>
                                        {thread ? t("visitor.replyAction") : t("visitor.startAction")}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.section>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}