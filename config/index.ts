// src/config/index.ts
import { appConfig } from "./app";
import { apiConfig } from "./api";
import { features } from "./features";

export const config = {
    app: appConfig,
    api: apiConfig,
    features,
};