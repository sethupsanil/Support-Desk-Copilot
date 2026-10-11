# Progress tracker: Support Desk Copilot

Current: **Stage 1 passed, Stage 2 next.** Update this file after each gate. Study pace: about 5 hours a day, 6 days a week.

| #   | Stage                                                                    | Branch                              | Status      | Tag           |
| --- | ------------------------------------------------------------------------ | ----------------------------------- | ----------- | ------------- |
| 1   | Raw API calls (basics only, ~2 hours, all fundamentals still tested)     | feature/stage-01-raw-api            | passed      | stage-1-done  |
| 2   | LangChain basics                                                         | feature/stage-02-langchain-basics   | not started | stage-2-done  |
| 3   | Tool calling                                                             | feature/stage-03-tool-calling       | not started | stage-3-done  |
| 4   | Prebuilt agent                                                           | feature/stage-04-prebuilt-agent     | not started | stage-4-done  |
| 5   | LangGraph core                                                           | feature/stage-05-langgraph-core     | not started | stage-5-done  |
| 6   | RAG                                                                      | feature/stage-06-rag                | not started | stage-6-done  |
| 7   | Advanced LangGraph (memory, human-in-the-loop, Postgres, retries, loops) | feature/stage-07-advanced-langgraph | not started | stage-7-done  |
| 8   | LangSmith (tracing, datasets, evals), used from Stage 2 onward           | feature/stage-08-langsmith          | not started | stage-8-done  |
| 9   | Guardrails and security                                                  | feature/stage-09-guardrails         | not started | stage-9-done  |
| 10  | Cost and performance optimisation                                        | feature/stage-10-cost-performance   | not started | stage-10-done |
| 11  | Deployment                                                               | feature/stage-11-deployment         | not started | stage-11-done |

Optional after Stage 11: Deep Agents and subagents. Ask the learner at that point, not before.

## Stage 1 must-know (the gate)

1. The API is an HTTP POST with a JSON body (endpoint, headers, required fields).
2. A message has a role and content. The system prompt is separate from messages.
3. The API is stateless, so history is resent on every call.
4. `max_tokens` and `stop_reason` mean specific things.
5. Token usage (input and output) is in the response, and cost comes from it.
6. Errors have a shape: bad key vs rate limit vs bad request.
7. The SDK is the same call with less boilerplate (show both).
8. The model has a knowledge limit, which is why tools exist (leads into Stage 3).

Safe to leave for later: streaming in depth, batch, files, vision, extended thinking, prompt caching details, tuning parameters.

## Re-estimate

Total estimate is 105-140 hours (about 5-7 weeks). Re-estimate after Stage 4 using the real pace.

## Notes log

(Add one line per stage when the gate is passed: date, what was shaky, what to revisit.)
