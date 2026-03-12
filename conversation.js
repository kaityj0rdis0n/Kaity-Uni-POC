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

//Future-proof: adding a new step? Just add a new object

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
    id: "venue_name",
    question: "Where is the event happening (venue name)?",
    field: "venueName",
    validator: "required", // still optional in GraphQL, but CLI enforces a value
    errorMessage: "Venue name is required."
  },
  {
    id: "address",
    field: "address",
    question: "What is the street address of the event?",
    validator: "required", // still optional in GraphQL, but CLI enforces a value
    errorMessage: "Must add an associated address to the event"
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
  },
  {
    id: "description",
    field: "description",
    question: "Provide a short description of the event:",
    validator: "required",
    errorMessage: "Description cannot be empty."
  },
  {
    id: "age_limit",
    field: "ageLimit",
    question: "Is there an age limit? (Optional, e.g. 18+, All Ages)" // free text input at this time
  },
  {
    id: "latitude",
    question: "Enter a latitude coordinate, must be between -90 and 90",
    field: "latitude",
    validator: "latitude",           // matches validators.latitude in cli.js
    errorMessage: "Latitude must be a number between -90 and 90"
  },
  {
    id: "longitude",
    question: "Enter a longitude coordinate, must be between -180 and 180",
    field: "longitude",
    validator: "longitude",          // matches validators.longitude in cli.js
    errorMessage: "Longitude must be a number between -180 and 180"
  }
]