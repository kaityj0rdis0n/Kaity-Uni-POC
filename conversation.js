//This folder is a structured definition of all the "questions" the POC assistant asks 
//It is a single source of truth for the POC flow
//Intended to be reusable for a CLI (Command Line Interface) project, a web UI, or a chatbot
//Consider it a future UI spec from the POC
//Positive: questions can be tweaked without touching code

// Defines the steps for the Event Builder CLI and future UI
// Each step declares:
//   - id: unique identifier (good for UI keys, labels, or analytics)
//   - field: key used for storing answers and normalization
//   - question: what to ask the user
//   - validator: optional validator name from validate.js
//   - errorMessage: optional custom message on invalid input

//Future-proof

//Adding a new step? Just add a new object

//Do not change CLI.js

export const eventBuildConversationSteps = [
  {
    id: "event_name",          // unique identifier for UI or tracking
    field: "name",             // used in answers object
    question: "What is the name of your event?",
    validator: "required",
    errorMessage: "Event name cannot be empty."
  },
  {
    id: "event_type",
    field: "type",
    question: "Is this a single-night or a recurring event?",
    validator: "required",
    errorMessage: "Please type 'single' or 'recurring'."
  },
  {
    id: "event_date",
    field: "date",             // maps to normalizeEvent.js startDate
    question: "What date is the event? (YYYY-MM-DD)",
    validator: "date",
    errorMessage: "Invalid date. Use YYYY-MM-DD and make sure date is today or in the future."
  },
  {
    id: "event_capacity",
    field: "capacity",
    question: "What is the event capacity?",
    validator: "capacity",
    errorMessage: "Capacity must be a positive number."
  }
];
