# Support Desk Copilot

A learning project: an AI support-desk assistant (knowledge-base Q&A, SQL order lookup, tickets/refunds, human approval for risky actions, memory across sessions). The owner is a 10-year JS/Node engineer learning agentic AI one stage at a time. **The goal is learning, not speed.**

Repo: https://github.com/sethupsanil/Support-Desk-Copilot (default branch: `develop`)

## Rules (read these first)
@.claude/rules/tutor-rules.md
@.claude/rules/git-and-review.md
@.claude/rules/progress.md

## Teaching mode (summary)
- Do not write the stage exercise for the learner. Explain, point to the docs, and review their code. Write code only when asked, and keep it small.
- Do not move ahead of the current stage (see progress.md). Never skip a fundamental.
- Never print, log or commit API keys. `.env` stays out of Git.

## Stack
Node 20+, TypeScript (ESM), Anthropic API (Claude), Zod, Vitest. Added later, per stage: LangChain JS, LangGraph JS, LangSmith, Postgres + pgvector, Fastify or Express, Docker, GitHub Actions.

## Commands
- `npm run typecheck` type check
- `npm test` run Vitest
- `npm run run -- experiments/stage-01/raw.ts` run a script with `.env` loaded (`tsx --env-file=.env`)
