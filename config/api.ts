import { env } from "../env";

export const apiConfig = {
    baseUrl: env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
};