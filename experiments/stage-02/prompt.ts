import { ChatPromptTemplate } from '@langchain/core/prompts';
import { checkMaxTokens, errorHandler, logResponseContent } from '../helper.js';
import { model } from './llm.js';

try {
    const chatPrompt = ChatPromptTemplate.fromMessages([
        ["system", `You are a support assistant for {product}.`],
        ["human", "my question is {question}"],
    ]);


//    await chatPrompt.invoke({
//         product: "Mobile",
//         question: "best mobile phone in 2024?"
//     });

    const pipeValue =  chatPrompt.pipe(model);
    const response = await pipeValue.invoke({
        product: "Laptop",
        question: "best  2 laptop in 2026?"
    })

    checkMaxTokens(response);
    logResponseContent(response);

    const response2 = await pipeValue.invoke({
        product: "bike",
        question: "best bike in 2025?"
    });
    checkMaxTokens(response2);
    logResponseContent(response2);

} catch (err) { errorHandler(err); }