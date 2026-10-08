import Anthropic from "@anthropic-ai/sdk";
import "dotenv/config";
const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY ,
});
const message = await client.messages.create({
    model: "Haiku-1",
    max_tokens: 1000,
  
  messages: [
    {
      role: "user",
      content: "What should I search for to find the latest developments in renewable energy?"
    }
  ]
});
for (const block of message.content) {
  if (block.type === "text") {
    console.log(block.text);
  }
}

console.log("Stop reason:", message.stop_reason);
console.log("Model usage input:", message.usage.input_tokens);
console.log("Model usage output:", message.usage.output_tokens);