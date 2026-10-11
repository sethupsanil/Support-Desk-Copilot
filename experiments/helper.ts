import type { AIMessage, BaseMessage } from "@langchain/core/messages";

export const errorHandler = (err: unknown) => {
    if (err instanceof Error && "status" in err) {
        const apiError = err as Error & { status: number; error?: { error?: { message?: string } } };

        switch (apiError.status) {
            case 401:
        console.error("Authentication failed: check ANTHROPIC_API_KEY in .env");
        process.exitCode = 1;
                break;
            case 400:
                console.error("Bad request:", apiError.error?.error?.message ?? err.message);
                process.exitCode = 1;
                break;
            default:
                console.error("Error occurred:", err);
                process.exitCode = 1;
        }
    }
    else {
        console.error("Error occurred:", err);
    }
}
 
export const logResponseContent = (response: AIMessage) => {
    if (typeof response.content === "string") {
        console.log("*****************************")
        console.log(response.content);
        console.log("*****************************")
        return;
    }
    for (const block of response.content) {
        if (block.type === "text") {
            console.log("*****************************")
            console.log(block.text);
            console.log("*****************************")

        }
    }
}

export interface HasResponseMetadata {
    response_metadata?: object;
}

export const checkMaxTokens = (response: HasResponseMetadata) => {
    const metadata = response.response_metadata;
    if (metadata && "stop_reason" in metadata && metadata.stop_reason === 'max_tokens') {
        throw new Error("Max tokens reached. Consider increasing maxTokens in config.ts or adjusting your prompt.");
    }
}

export interface StructuredResult<T> {
    raw: BaseMessage;
    parsed: T;
}

export const logParsedResponse = <T>(response: StructuredResult<T>) => {
    checkMaxTokens(response.raw);
    console.log(response.parsed);
}