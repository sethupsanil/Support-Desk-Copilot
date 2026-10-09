try {
    if(!process.env.ANTHROPIC_API_KEY) {
        throw new Error("Missing ANTHROPIC_API_KEY in environment variables.");
    }
    const message: any = [{
        role: "user",
        content: "my name is john doe"
    }];

    const client = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "x-api-key": process.env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            system: "You are a support assistant.",
            model: "claude-haiku-5-5",
            max_tokens: 100,
            messages: message
        })
    });

    const response = await client.json();
      if (!client.ok) {
        const error = response.error || "Unknown error";
    throw new Error(`Request failed with status ${client.status}: ${error.message || error}`);
}
    message.push({
        role: "assistant",
        content: response.content
    });
    message.push({
        role: "user",
        content: "what is my name?"
    });
const client1 = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "x-api-key": process.env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            system: "You are a support assistant.",
            model: "claude-haiku-5-5",
            max_tokens: 100,
            messages: message
        })
    });

    const response1 = await client1.json();
      if (!client1.ok) {
        const error = response1.error || "Unknown error";
    throw new Error(`Request failed with status ${client1.status}: ${error.message || error}`);
}
    for (const block of response1.content) {

        if (block.type === "text") {
            console.log(block.text);
        }
    }

    console.log("Stop reason:", response1.stop_reason);
    console.log("Model usage input:", response1.usage.input_tokens);
    console.log("Model usage output:", response1.usage.output_tokens);
} catch (error) {
    console.error("Error occurred:", error);
}