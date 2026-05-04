import { z } from "zod";

export const messagingUsernameSchema = z
	.string()
	.trim()
	.min(3)
	.max(24)
	.regex(/^[a-zA-Z0-9_-]+$/, "Invalid username");

export const messagingBodySchema = z.string().trim().min(1).max(1500);

export const messagingConversationSchema = z.object({
	username: messagingUsernameSchema,
	message: messagingBodySchema,
});

export const messagingPostMessageSchema = z.object({
	message: messagingBodySchema,
});

export const messagingAdminLoginSchema = z.object({
	email: z.string().trim().email(),
	password: z.string().min(8),
});

export const messagingConversationIdSchema = z.object({
	conversationId: z.string().uuid(),
});

export type MessagingConversationPayload = z.infer<typeof messagingConversationSchema>;
export type MessagingPostMessagePayload = z.infer<typeof messagingPostMessageSchema>;
export type MessagingAdminLoginPayload = z.infer<typeof messagingAdminLoginSchema>;
