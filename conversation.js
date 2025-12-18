//This folder is a structured definition of all the "questions" the POC assistant asks 
//It is a single source of truth for the POC flow
//Intended to be reusable for a CLI (Command Line Interface) project, a web UI, or a chatbot
//Consider it a future UI spec from the POC
//Positive: questions can be twealed without touching code


export const eventBuildConversationSteps = [
    {
        id: "event_Name",
        question: "What is the name of your event?",
        field: "name"
    },
    {
        id: "event_type",
        question: "Is this ia single-night or a recurring event?",
        field: "type"
    },
    {
        id: "event_date",
        question: "What date is the event? (YYYY-MM-DD)",
        field:"date"
    },
    {
        id: "capacity",
        question: "What is the event capacity?",
        field: "capacity"
    }
    
];