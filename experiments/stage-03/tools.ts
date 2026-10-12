import { ChatPromptTemplate } from "@langchain/core/prompts";
import { BaseMessage, tool } from "langchain";
import * as z from 'zod';
import { checkMaxTokens } from "../../src/llm/checks.js";
import { model } from "../../src/llm/model.js";
import { errorHandler, logResponseContent } from "../helper.js";
const schema = z.object({
    orderId:z.string().describe('Order id to search')
})

const searchFn = (orderId: {orderId:string}) => {
    const orderDetails = fakeOrder.find(v => v.id.toString() === orderId.orderId);
    return orderDetails ? orderDetails : 'Not found';
}
const searchTool = tool(searchFn, {
    name: "searchTool",
    schema,
    description:'Tool to identify the order details that matches to the order id'
})
const fakeOrder = [
    { id: "1", status: 'inprogress', item: "abc" },
    { id: "2", status: 'done', item: "xyz" },
    { id: "3", status: 'cancelled', item: "pqr" },
];

try {
    


const prompt = ChatPromptTemplate.fromMessages([
    {  role:'system', content: 'You are a oder support. You have to search and find the order details and give appropriate response' },
    {role:'human',content:'Find the oder details for this oder {id}'}
])

// Model message []
const message: BaseMessage[] = (await prompt.invoke({  })).toChatMessages();

// Bind tools and model
const bindTool= model.bindTools([searchTool])

// Calling model with the message array 
const response = await bindTool.invoke(message);

// checking for stop reason is max token
checkMaxTokens(response.response_metadata);

// Pushing model replay in to the message array
message.push(response);

// looping tool calls and calling tools
for (const toolCall of response.tool_calls ?? []) {
  const toolMessage = await searchTool.invoke(toolCall); // returns a ToolMessage
  message.push(toolMessage);
}

// Sending the latest message [] to model
const newResponse = await bindTool.invoke(message);
checkMaxTokens(newResponse);
logResponseContent(newResponse)

} catch (error) {
    errorHandler(error)
}