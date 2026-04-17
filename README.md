# Universe AI Event Builder CLI POC

A **proof-of-concept CLI** for an AI-assisted event builder for Universe Clubs events.
The CLI collects event details from the user, normalizes the data, and submits it to the Universe GraphQL API as a draft event.

---

## Architecture

Each file has a single responsibility:

| File | Responsibility |
|------|---------------|
| `cli.js` | Terminal adapter — readline setup and input collection only |
| `conversationOrchestrator.js` | Orchestrates the conversation: steps through questions, validates answers, normalizes, and calls the API |
| `conversation.js` | Source of truth for all questions and field definitions |
| `validate.js` | Validation functions (required, date, capacity, lat/long) |
| `normalizeEvent.js` | Transforms raw input into a structured, API-ready event object |
| `universeService.js` | GraphQL API calls to Universe |

**Flow:**
`cli.js` (collects input) → `conversationOrchestrator.js` (orchestrates) → `normalizeEvent.js` (transforms) → `universeService.js` (submits)

---

## Requirements

- Node.js v24 or higher
- npm

---

## Installation

```bash
git clone https://github.com/kaityj0rdis0n/Kaity-Uni-POC.git
cd Kaity-Uni-POC
npm install
```

Set your Universe API token as an environment variable:

```bash
# macOS/Linux
export UNIVERSE_API_TOKEN="your_token_here"

# Windows (PowerShell)
setx UNIVERSE_API_TOKEN "your_token_here"
```

---

## Running the CLI

```bash
node cli.js
```

Follow the prompts. At the end, the CLI displays the raw input, the normalized event object, and the result of the Universe API call.

---

## Example

```
What is the name of your event? Lennon's best cuddle day
Is this a single-night or a recurring event? single
Where is the event happening (venue name)? The Couch
What is the street address of the event? 123 Front St W
What date is the event? (YYYY-MM-DD) 2026-12-12
What is the event capacity? 3
Provide a short description of the event: Lennon loves cuddles
Is there an age limit? (Optional, e.g. 18+, All Ages) All Ages
Enter a latitude coordinate, must be between -90 and 90: -1
Enter a longitude coordinate, must be between -180 and 180: 1
```

```
Raw input:
{
  name: "Lennon's best cuddle day",
  type: 'single',
  venueName: 'The Couch',
  address: '123 Front St W',
  date: '2026-12-12',
  capacity: '3',
  description: 'Lennon loves cuddles',
  ageLimit: 'All Ages',
  latitude: '-1',
  longitude: '1'
}

Normalized event object:
{
  title: "Lennon's best cuddle day",
  description: 'Lennon loves cuddles',
  kind: 'SINGLE_EVENT',
  startDate: '2026-12-12T00:00:00.000Z',
  capacity: 3,
  venueName: 'The Couch',
  address: '123 Front St W',
  ageLimit: 'All Ages',
  latitude: -1,
  longitude: 1
}
```

---

## Phases

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1 | ✅ Done | CLI + validation + normalization |
| Phase 2 | ✅ Done | Service layer — GraphQL integration scaffolded |
| Phase 3 | 🔄 In progress | Decouple for UI — CLI adapter pattern introduced |
| Phase 4 | Not started | LLM-assisted input (suggest titles, auto-fill fields, validate ambiguous input) |

---

## Changelog

### April 16 2026
- Extracted conversation orchestration into `conversationOrchestrator.js` (Phase 3 start)
- `cli.js` is now a thin readline adapter — no business logic
- Fixed `description` being silently dropped in normalization
- Added `HANDLED_FIELDS` safeguard to warn when raw input fields are unmapped
- Fixed `package.json` main entry point (`index.js` → `cli.js`)

### March 12 2026
- Added service layer (`universeService.js`) to submit draft events to Universe via GraphQL
- Added venue name, address, latitude, longitude, description fields
- Updated normalization to handle optional fields as `null`

---

## License

ISC
