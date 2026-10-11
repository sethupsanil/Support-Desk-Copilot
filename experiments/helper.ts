import type { AIMessage } from "@langchain/core/messages";

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

export const checkMaxTokens = (response: AIMessage) => {
    if (response.response_metadata.stop_reason === 'max_tokens') {
        throw new Error("Max tokens reached. Consider increasing maxTokens in config.ts or adjusting your prompt.");
    }
}