import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { checkMaxTokens, errorHandler } from '../helper.js';
import { model } from './llm.js';

try {
    const chatPrompt = ChatPromptTemplate.fromMessages([
        ["system", `You are a support assistant for {product}.`],
        ["human", "my question is {question}"],
    ]);



    const promptValue =  chatPrompt.pipe(model)
       const pipeValue= await promptValue.invoke({
        product: "Laptop",
        question: "best  2 laptop in 2026?"
    })
    checkMaxTokens(pipeValue)
   const response = await new StringOutputParser().invoke(pipeValue)
   console.log("response", response)


    const response2 = await promptValue.invoke({
        product: "bike",
        question: "best bike in 2025?"
    });
  
        checkMaxTokens(response2)
console.log("response2", await new StringOutputParser().invoke(response2))
  //  logResponseContent(response2);

} catch (err) { errorHandler(err); }