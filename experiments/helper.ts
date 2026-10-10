export const errorHandler = (err: unknown) => {
    if (err instanceof Error && "status" in err && err.status === 401) {
        console.error("Authentication failed: check ANTHROPIC_API_KEY in .env");
        process.exitCode = 1;
    } else {
        console.error("Error occurred:", err);
    }
}
 
export const logResponseContent = (response: any) => {
    for (const block of response.content) {
        if (block.type === "text") {
            console.log("*****************************")
            console.log(block.text);
            console.log("*****************************")

        }
    }
}

export const checkMaxTokens = (response: any) => {
    if (response.response_metadata.stop_reason === 'max_tokens') {
        throw new Error("Max tokens reached. Consider increasing maxTokens in config.ts or adjusting your prompt.");
    }
}