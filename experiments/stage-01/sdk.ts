import Anthropic from '@anthropic-ai/sdk';
export const client = new Anthropic();
const message = await client.messages.create({
  model: "claude-haiku-5-5",
  max_tokens: 23,
  
  messages: [
    {
      role: "user",
      content: "hello"
    }
  ]
}).catch((err) => {
  if (err instanceof Anthropic.APIError) {
    console.log(err.status);
    console.log(err.name);
    console.log(err.headers);
  }

  throw err; // Rethrow the error to propagate it
});

for (const block of message.content) {

  if (block.type === "text") {
    console.log(block.text);
  }
}

console.log("Stop reason:", message.stop_reason);
console.log("Model usage input:", message.usage.input_tokens);
console.log("Model usage output:", message.usage.output_tokens);