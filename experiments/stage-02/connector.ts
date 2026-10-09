import { ChatAnthropic } from '@langchain/anthropic'
import { config } from '../config.js'
export const model = new ChatAnthropic({
    model: config.model,
    maxTokens: config.maxTokens
}) 