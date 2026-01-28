# Universe AI Event Builder CLI POC

This is a **proof-of-concept Command Line Interface (CLI)** for an AI-assisted event builder for Universe Clubs events.  
The CLI collects event details from the user, normalizes the data, and prepares it for potential integration with the Universe API.

## Features

- Multi-step interactive CLI for creating event details
- Normalizes input data:
  - Converts date to ISO format
  - Converts capacity to number
  - Determines event type (`SINGLE_EVENT` or `RECURRING_EVENT`)
- Modular design for easy extension
- Compatible with Node.js ES modules

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

Add validation for additional inputs

Extend CLI to include additional fields (location, ticket price, description)

Connect to Universe GraphQL API to create draft events programmatically

Transition CLI logic to a UI-based assistant in the future

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
