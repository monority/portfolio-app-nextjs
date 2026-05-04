import { env } from "../env";

export const features = {
    messaging: env.NEXT_PUBLIC_ENABLE_MESSAGING,
    newUI: env.NEXT_PUBLIC_ENABLE_NEW_UI,
};