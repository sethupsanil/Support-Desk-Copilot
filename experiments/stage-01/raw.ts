try {
    const url = "https://api.anthropic.com/v1/messages";
    const API_KEY = process.env.ANTHROPIC_API_KEY || '';
    if (!API_KEY) {
        throw new Error("Missing ANTHROPIC_API_KEY in environment variables.");
    }
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "x-api-key": API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            model: "claude-haiku-5-5",
            max_tokens: 50,
            system: "You are a concise support assistant.",
            messages: [{ role: "user", content: "Hello" }]
        })
    });
    const message = await res.json();
    if (!res.ok) {
        const error = message.error || "Unknown error";
    throw new Error(`Request failed with status ${res.status}: ${error.message || error}`);
}

    for (const block of message.content) {
        if (block.type === "text") {
            console.log(block.text);
        }
    }

    console.log("Stop reason:", message.stop_reason);
    console.log("Model usage input:", message.usage.input_tokens);
    console.log("Model usage output:", message.usage.output_tokens);
}catch (error) {
    console.error("Error occurred:", error);
}