import { HumanMessage, type BaseMessage } from '@langchain/core/messages';
import { model } from './llm.js';
try {
    const conversation: BaseMessage[] = [
        new HumanMessage("My name is john doe!")
    ];
    const response = await model.invoke(conversation);
    if (response.response_metadata.stop_reason === 'max_tokens') {
        throw new Error("Max tokens reached. Consider increasing maxTokens in config.ts or adjusting your prompt.");
    }
    conversation.push(response);

    console.log("Response:", response.content);
    console.log("response metadata:", response.response_metadata);
    console.log("*******")
    console.log("response usage metadata:", response.usage_metadata);

    // STEP 2
    conversation.push(new HumanMessage("What is my name?"));
    const response2 = await model.invoke(conversation);
    // console.log("Response 2 full:", response2);
    console.log("*******")

    console.log("Response 2:", response2.content);
    console.log("Response 2 metadata:", response2.response_metadata);
    console.log("*******")
    console.log("Response 2 usage metadata:", response2.usage_metadata);

    console.log("*******")
}
catch (err) {
    if (err instanceof Error && "status" in err && err.status === 401) {
        console.error("Authentication failed: check ANTHROPIC_API_KEY in .env");
        process.exitCode = 1;
    } else {
        console.error("Error occurred:", err);
    }
}