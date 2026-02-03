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
What is the name of your event? Gene's Borkday
Is this a single-night or a recurring event? Single
What date is the event? (YYYY-MM-DD) 2025-04-15
What is the event capacity? 20

```
Raw input:
{
  name: "Gene's Borkday",
  type: "single",
  date: "2025-04-15",
  capacity: "20"
}

Normalized event object:
{
  name: "Gene's Borkday",
  kind: "SINGLE_EVENT",
  startDate: "2025-04-15T00:00:00.000Z",
  capacity: 20
}

```


## Next Steps


Extend CLI to include additional fields (location, ticket price, description)

Connect to Universe GraphQL API to create draft events programmatically

Transition CLI logic to a UI-based assistant in the future (refactor to suport a web or chat based UI)
error handling and edge cases
unit tests

LLM integration

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
