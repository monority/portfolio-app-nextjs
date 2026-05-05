"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useVisitorConversation } from "../hooks/useVisitorConversation";
import ModalThread from "./modal/ModalThread";
import ModalForm from "./modal/ModalForm";

import "./modal/modal.css";

interface MessagingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MessagingModal({ isOpen, onClose }: MessagingModalProps) {
    const t = useTranslations("messaging");
    const {
        thread,
        username,
        setUsername,
        message,
        setMessage,
        error,
        isLoading,
        isSubmitting,
        submit,
        threadRef,
    } = useVisitorConversation(isOpen);

    const hasMessages = (thread?.messages.length ?? 0) > 0;

    return (
        <AnimatePresence>
            {isOpen ? (
                <motion.div
                    className="msg-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                >
                    <button
                        type="button"
                        className="msg-overlay__bg"
                        aria-label={t("close")}
                        onClick={onClose}
                    />

                    <motion.div
                        className="msg-panel"
                        data-state={hasMessages ? "thread" : "empty"}
                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 14, scale: 0.97 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="msg-title"
                    >
                        <header className="msg-header">
                            <div className="msg-header__text">
                                <span className="msg-eyebrow">{t("eyebrow")}</span>
                                <h2 id="msg-title" className="msg-title">{t("title")}</h2>
                                {!hasMessages && (
                                    <p className="msg-description">{t("description")}</p>
                                )}
                            </div>
                            <button
                                type="button"
                                className="msg-close"
                                aria-label={t("close")}
                                onClick={onClose}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                    <path
                                        d="M1 1l12 12M13 1L1 13"
                                        stroke="currentColor"
                                        strokeWidth="1.75"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </header>

                        {hasMessages && thread && (
                            <ModalThread thread={thread} threadRef={threadRef} />
                        )}

                        {isLoading && !hasMessages && (
                            <p className="msg-state">{t("visitor.loading")}</p>
                        )}

                        {error && (
                            <p className="msg-error" role="alert">{error}</p>
                        )}

                        <ModalForm
                            username={username}
                            onUsernameChange={setUsername}
                            message={message}
                            onMessageChange={setMessage}
                            onSubmit={submit}
                            isSubmitting={isSubmitting}
                            hasThread={!!thread}
                        />
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}