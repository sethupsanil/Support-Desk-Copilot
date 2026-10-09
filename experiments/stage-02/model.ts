import { HumanMessage, type BaseMessage } from '@langchain/core/messages';
import { model } from './connector.js';
const conversation: BaseMessage[] = [
    new HumanMessage("My name is john doe!")
];
const response = await model.invoke(conversation);
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