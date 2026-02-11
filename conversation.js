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
  },
{
    field: "description",
    question: "Provide a short description of the event:",
    validator: "required",
    errorMessage: "Description cannot be empty."
},
{
    field: "address",
    question: "Where is the event?",
    validator: "required",
    errorMessage: "Must add an associated address to the event" //did not add required validator,(also not in graphQL mandatory) thinking about when people have different things like popups etc
},
{
    field: "venueName",
    question: "What is the venue name? (Optional)" //did not add required validator(also not in graphhQL mandatory), thinking about when people have different things like popups etc
},
{
    field: "ageLimit",
    question: "Is there an age limit? (Optional, e.g. 18+, All Ages)" //free text input at this time
},
{
    question: "Enter a latitude coordinate, must be between -90 and 90",
    field: "latitude",
    validator: "coordinate",
    errorMessage: "Latitude must be a number between -90 and 90"
},
{
    question: "Enter a latitude coordinate, must be between -180 and 180 :",
    field: "longitude",
    validator: "coordinate",
    errorMessage: "Longitude must be a number between -180 and 180"
}
]