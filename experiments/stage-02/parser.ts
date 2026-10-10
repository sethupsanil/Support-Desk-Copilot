import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { checkMaxTokens, errorHandler } from '../helper.js';
import { model } from './llm.js';

try {
    const chatPrompt = ChatPromptTemplate.fromMessages([
        ["system", `You are a support assistant for {product}.`],
        ["human", "my question is {question}"],
    ]);



    const chain = chatPrompt.pipe(model)
       const firstReply= await chain.invoke({
        product: "Laptop",
        question: "best  2 laptop in 2026?"
    })
    checkMaxTokens(firstReply)
   const firstText = await new StringOutputParser().invoke(firstReply)
   console.log("response", firstText)


    const secondReply = await chain.invoke({
        product: "bike",
        question: "best bike in 2025?"
    });

        checkMaxTokens(secondReply)
console.log("response2", await new StringOutputParser().invoke(secondReply))
  //  logResponseContent(response2);

} catch (err) { errorHandler(err); }