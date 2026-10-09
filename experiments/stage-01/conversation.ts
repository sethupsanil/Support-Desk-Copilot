import Anthropic from '@anthropic-ai/sdk';
export const client = new Anthropic();
const messages: Anthropic.MessageParam[] = [{
      role: "user",
      content: "my name is john doe"
    }];
// STEP 1
const response = await client.messages.create({
  model: "claude-haiku-5-5",
  max_tokens: 100,
  messages: messages
}).catch((err) => {
  if (err instanceof Anthropic.APIError) {
    console.log(err.status);
    console.log(err.name);
    console.log(err.headers);
  }

  throw err; // Rethrow the error to propagate it
});

for (const block of response.content) {

  if (block.type === "text") {
    console.log(block.text);
  }
}

console.log("Stop reason:", response.stop_reason);
console.log("Model usage input:", response.usage.input_tokens);
console.log("Model usage output:", response.usage.output_tokens);

// STEP 2

const response1 = await client.messages.create({
  model: "claude-haiku-5-5",
  max_tokens: 100,
  messages: [{
    role: "user",
    content: "what is my name?"
  }]
}).catch((err) => {
  if (err instanceof Anthropic.APIError) {
    console.log(err.status);
    console.log(err.name);
    console.log(err.headers);
  }

  throw err; // Rethrow the error to propagate it
});

for (const block of response1.content) {

  if (block.type === "text") {
    console.log(block.text);
  }
}

console.log("Stop reason:", response1.stop_reason);
console.log("Model usage input:", response1.usage.input_tokens);
console.log("Model usage output:", response1.usage.output_tokens);

// STEP 3;

const response2 = await client.messages.create({
  model: "claude-haiku-5-5",
  max_tokens: 100,
  messages: messages
}).catch((err) => {
  if (err instanceof Anthropic.APIError) {
    console.log(err.status);
    console.log(err.name);
    console.log(err.headers);
  }

  throw err; // Rethrow the error to propagate it
});
messages.push({
  role: "assistant",
  content: response2.content
});
for (const block of response2.content) {

  if (block.type === "text") {
      console.log(block.text);
      
  }
}


console.log("Stop reason:", response2.stop_reason);
console.log("Model usage input:", response2.usage.input_tokens);
console.log("Model usage output:", response2.usage.output_tokens);

messages.push({
  role: "user",
  content: "what is my name?"
});

const response3 = await client.messages.create({
  model: "claude-haiku-5-5",
  max_tokens: 100,
  messages: messages
}).catch((err) => {
  if (err instanceof Anthropic.APIError) {
    console.log(err.status);
    console.log(err.name);
    console.log(err.headers);
  }

  throw err; // Rethrow the error to propagate it
});

for (const block of response3.content) {

  if (block.type === "text") {
      console.log(block.text);
      
  }
}


console.log("Stop reason:", response3.stop_reason);
console.log("Model usage input:", response3.usage.input_tokens);
console.log("Model usage output:", response3.usage.output_tokens);