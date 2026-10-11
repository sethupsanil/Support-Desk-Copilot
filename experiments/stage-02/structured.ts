import { ChatPromptTemplate } from '@langchain/core/prompts';
import { errorHandler } from '../../src/llm/checks.js';
import { logParsedResponse } from '../helper.js';
import { structureSchema } from '../../src/schema/structure.schema.js';
import { model } from '../../src/llm/model.js';
try {
    const chatPrompt = ChatPromptTemplate.fromMessages([
        ["system", `You are a support ticket helper for {area}. 
         Your task is to generate structured support ticket based on user message`],
        ["human", "{message}"],
    ]);
    const structuredModel = model.withStructuredOutput(structureSchema, { includeRaw: true });
    const response = await chatPrompt.pipe(structuredModel).invoke({
        area: "hardware",
        message: "hello",
    });
    logParsedResponse(response);
}catch (err) { errorHandler(err); }