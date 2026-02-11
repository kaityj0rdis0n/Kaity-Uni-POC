# Universe AI Event Builder CLI POC

This is a **proof-of-concept Command Line Interface (CLI)** for an AI-assisted event builder for Universe Clubs events.  
The CLI collects event details from the user, normalizes the data, and prepares it for potential integration with the Universe API.


## Features Implemented

- Interactive CLI asking users for:
  - Event name
  - Event type (single-night or recurring)
  - Event date (with format and future-date validation)
  - Event capacity (positive integer validation)
- Validators:
  - `isRequired` → ensures input is not empty
  - `isValidDate` → checks date format and future-datedness
  - `isPositiveNumber` → checks capacity is a positive integer
- Normalization:
  - Transforms raw CLI input into a consistent format ready for API integration
- Separation of concerns:
  - `cli.js` handles flow
  - `conversation.js` stores questions/fields
  - `validate.js` contains validators
  - `normalizeEvent.js` handles normalization

## Requirements

- Node.js v24 or higher
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/YourUsername/universe-ai-poc.git
cd universe-ai-poc

```

## 2. Install dependencies:

npm install

## Running the CLI
node cli.js


Follow the prompts to enter event information.
At the end, the CLI will display:

The raw input object

The normalized event object

**Example**

What is the name of your event? Lennon's best cuddle day
Is this a single-night or a recurring event? single
What date is the event? (YYYY-MM-DD) 2026-12-12
What is the event capacity? 3
Provide a short description of the event: Lennon loves cuddles, today is the best day ever because it's 12, 12
Where is the event? 123 front st W
What is the venue name? (Optional) 
Is there an age limit? (Optional, e.g. 18+, All Ages) 
Enter a latitude coordinate, must be between -90 and 90 -1
Enter a latitude coordinate, must be between -180 and 180 : 1

```
Raw input:
{
  name: "Lennon's best cuddle day",
  type: 'single',
  date: '2026-12-12',
  capacity: '3',
  description: "Lennon loves cuddles, today is the best day ever because it's 12, 12",
  address: '123 front st W',
  venueName: '',
  ageLimit: '',
  latitude: '-1',
  longitude: '1'
}

Normalized event object:
{
  title: "Lennon's best cuddle day",
  kind: 'SINGLE_EVENT',
  startDate: '2026-12-12T00:00:00.000Z',
  capacity: 3,
  address: '123 front st W',
  venueName: null,
  ageLimit: null,
  latitude: -1,
  longitude: 1
}
```

## Next Steps


Extend CLI to include additional fields (added fields in base event universe graphQL schema that were considered mandatory)

Phase 2: Service Layer for Universe API (GraphQL)

Goal: Prepare to push normalized events to Universe without changing CLI logic.
Connect to Universe GraphQL API to create draft events programmatically

Phase 3: Goal: Separate the conversational engine from the input/output layer to make it UI-ready.

Phase 4: LLM integration

Goal: Use AI to guide user input or suggest defaults.

Ideas:

- Suggest event titles or descriptions
- Validate ambiguous inputs
- Auto-fill fields based on minimal input

Transition CLI logic to a UI-based assistant in the future (refactor to suport a web or chat based UI)
error handling and edge cases
unit tests



License

ISC


---

You just need to:

1. Save this as `README.md` in your project root  
2. Stage, commit, and push it:

```bash
git add README.md
git commit -m "Add README with CLI instructions"
git push
