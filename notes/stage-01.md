## Notes

- `Fetch` Only throws only if the network it self failed. it wont throw 401 errors unless we throw it.
- `max_token` vs `stop_reason` : Max token limit the output of the response. if an output needs more token but we provided only less then the `stop_reason` will be max_token. saying token limit reached. also if the reply completed then it will show `end_turn`
- `input_token` is the everything that we sent to the AI model,
