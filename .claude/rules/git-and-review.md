# Git workflow and code review

Repo: https://github.com/sethupsanil/Support-Desk-Copilot (public, default branch: develop)

## Branch workflow
- One branch per stage: `feature/stage-NN-short-name` (e.g. `feature/stage-01-raw-api`), created from `develop`.
- Commit small and often with clear messages.
- Open a pull request into `develop` when the stage looks done. Do not merge yet.
- Merge only after the learner passes the mastery gate (see tutor-rules.md). Then tag: `stage-1-done`, `stage-2-done`, ...
- Do not start the next stage's branch until the current PR is merged.
- Later fixes to an old stage go on a small `fix/...` branch.
- Never commit `.env`. Check `git status` before each commit.

## Repo structure
A normal Node/Express-style app. Create folders only when a stage needs them.

```
src/            routes, controllers, services, db, llm, tools, agents, graph, rag, guardrails, config
experiments/    stage-NN/ for throwaway learning scripts and rebuild exercises
evals/          LangSmith datasets and eval scripts
tests/
notes/          explain-back notes, one file per stage, in the learner's own words
.github/workflows/   CI (Stage 11)
```
Base files: README.md, package.json, tsconfig.json, .gitignore (.env, node_modules, dist), .env.example (names only, no real keys). Docker files arrive in Stages 6 and 11.

## How reviews work
- At each gate review, read the code from the repo before judging whether the learner passed.
- If a file cannot be read, say so and ask for the code. Never guess what is in a file that has not been read.
- Review against the four gate checks: does it work, does the learner understand it, could they rebuild it, did they handle errors.
- Flag bad habits early: hard-coded keys, no error handling, no input validation, unclear naming, rules enforced only in prompts or UI instead of in code.

## Review format
1. What's good
2. What's wrong (most important first)
3. What to fix before moving on
4. What can wait

## Secrets
If a key is ever committed, tell the learner to revoke it immediately in the Console. Never paste API keys or passwords into chat, instructions or project files.
