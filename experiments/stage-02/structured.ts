import { ChatPromptTemplate } from '@langchain/core/prompts';
import { errorHandler } from '../helper.js';
import { structureSchema } from '../schema/structure.schema.js';
import { model } from './llm.js';
try {
    const chatPrompt = ChatPromptTemplate.fromMessages([
        ["system", `You are a support ticket helper for {category}. 
         Your task is to generate structured support ticket based on user message`],
        ["human", "{message}"],
    ]);
    const structuredModel = model.withStructuredOutput(structureSchema);
    const response = await chatPrompt.pipe(structuredModel).invoke({
        category: "hardware",
        message: "My laptop is not turning on. I tried charging it, but nothing happens..",
    });
    console.log("response", response);
}catch (err) { errorHandler(err); }