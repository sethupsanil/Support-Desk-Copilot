import { ChatAnthropic } from '@langchain/anthropic';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import * as z from 'zod';
import { config } from '../config.js';
import { errorHandler, logParsedResponse } from '../helper.js';

try {
    const model = new ChatAnthropic({
     model: config.model,
        maxTokens: config.maxTokens,
});

const structureSchema = z.object({
    intent: z.enum(["request", "refund", "order_status", "other"]).describe("The intent of the support ticket, eg: request, refund, order_status, other"),
    urgency: z.enum(["low", "medium", "high"]).describe("The urgency level of the support ticket"),
    summary: z.string().describe("A brief summary of the support ticket"),
});

    const modelWithStructuredOutput = model.withStructuredOutput(structureSchema, { includeRaw: true });

const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", `You are a support ticket helper for help user for support their order on the platform. 
     Your task is to generate structured support ticket based on user message and {chanel}`],
    ["human", "{message}"],
]);

    const ticketChain = chatPrompt.pipe(modelWithStructuredOutput)
    const response = await ticketChain.invoke({
    chanel: "request",
    message: "I would like to request a refund for my recent order.",
    });
    logParsedResponse(response);

    const response1 = await ticketChain.invoke({
        chanel: "request",
        message: "I would like to know my status of the imac i added to the cart",
    });
    logParsedResponse(response1);
    
}catch (err) {
    errorHandler(err)
}