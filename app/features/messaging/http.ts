function getInvalidResponseMessage(response: Response, responseText: string, fallbackMessage: string) {
    const trimmedResponse = responseText.trim();

    if (trimmedResponse && !trimmedResponse.startsWith("<")) {
        return trimmedResponse;
    }

    if (response.status >= 500) {
        return `${fallbackMessage} (server returned invalid response)`;
    }

    return fallbackMessage;
}

export async function readJsonResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
    const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";

    if (!contentType.includes("application/json")) {
        const responseText = await response.text();
        throw new Error(getInvalidResponseMessage(response, responseText, fallbackMessage));
    }

    return response.json() as Promise<T>;
}

export function getApiErrorMessage(payload: unknown, fallbackMessage: string) {
    if (
        payload &&
        typeof payload === "object" &&
        "error" in payload &&
        typeof payload.error === "string" &&
        payload.error.length > 0
    ) {
        return payload.error;
    }

    return fallbackMessage;
}