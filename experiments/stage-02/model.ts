import { HumanMessage, SystemMessage, type BaseMessage } from '@langchain/core/messages';
import { errorHandler } from '../helper.js';
import { model } from './llm.js';
try {
    const conversation: BaseMessage[] = [
        new SystemMessage("You are a helpful assistant that responds in a concise manner.and always answers single word answers."),
        new HumanMessage("My name is john doe!")
    ];
    const response = await model.invoke(conversation);
    if (response.response_metadata.stop_reason === 'max_tokens') {
        throw new Error("Max tokens reached. Consider increasing maxTokens in config.ts or adjusting your prompt.");
    }
    conversation.push(response);

    console.log("Response:", response.content);


    // STEP 2
    conversation.push(new HumanMessage("What is my name?"));
    const response2 = await model.invoke(conversation);
    if (response2.response_metadata.stop_reason === 'max_tokens') {
        throw new Error("Max tokens reached. Consider increasing maxTokens in config.ts or adjusting your prompt.");
    }
    console.log("*******")

    console.log("Response 2:", response2.content);


    console.log("*******")
}
catch (err) {
    errorHandler(err);
}