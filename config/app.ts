import { serverEnv } from "../env.server";

export const appConfig = {
    name: "portfolio-app-nextjs",
    env: serverEnv.NODE_ENV,
    isProd: serverEnv.NODE_ENV === "production",
    isDev: serverEnv.NODE_ENV === "development",
};
