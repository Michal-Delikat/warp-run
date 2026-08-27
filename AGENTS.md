# Contributing Guidelines
This file guides AI agents contributing to this repo.

## Communication Style
- **Concise**: Be direct and to the point. Avoid conversational filler (e.g., "Certainly! I'd be happy to help with that.").
- **Style**: Do not use emojis or LaTeX symbols in communication, code, commit messages, or documentation. Use "->" instead of LaTeX "$\rightarrow$".

## Code Style & Logging
- **Logging**: Do not add logging calls for progress tracking or success messages (e.g., "Syncing...", "Done"). Use logs only for critical error reporting or essential debugging. Log only when you can't otherwise explain an error state. Remove debug logs before finishing the change.
- **Clean Output**: Utility scripts should remain silent unless an error occurs. Exit code must reflect success/failure.

## Implementation Standards
- **Consider Edge Cases**: The implementation should cover the edge cases. If it's a plausible input under normal use, or an unlikely one with serious consequences, handle it. Otherwise, describe it in the commit message.
- **Limit Comments**: Do not add comments, unless justified by specific industry standard (e.g., license headers, JSDoc on exported/public functions) or a solution that would otherwise look like a mistake. Existing comments should remain. 

## Testing
- **No Test Writing**: Do not create or modify test files unless asked. If a change breaks an existing test, report it — do not edit the test to make it pass.
- **Run Existing Tests**: Run the provided tests after every change.