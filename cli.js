//This is the main entry point for the POC's CLI (Command line interface) assistant.
//Here, we can simulate asking an event builder questions, collecting answers, and displaying results
//uses eventBuildConversationSteps to know what to ask
//uses normalizeEvent to transform answers
// this file should focus on asking questions and handling flow, no business rules

//Later, if we build a web UI or chat interface, this can be repurposed without messing with the conversation or normalization logic


import readline from "readline";
import { eventBuildConversationSteps } from "./conversation.js";
import { normalizeEvent } from "./normalizeEvent.js";
import { isValidDate, isRequired, isPositiveNumber } from "./validate.js";


// Map validator names to functions
const validators = {
    date: isValidDate,
    required: isRequired,
    capacity: isPositiveNumber // map capacity to positive number validator
};

// create readLine interface for CLI input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const answers = {}; // stores answers in an object by field name
let currentStep = 0;

// main function to ask next question
const askNext = () => { // JavaScript arrow function called askNext that picks current question from eventBuildConversationSteps, and calls questions until the last step and then closes the CLI
    const step = eventBuildConversationSteps[currentStep];

    // If no more steps (all q asked) normalize answers and close
    if (!step) {
        console.log("\nRaw input:");
        console.log(answers);

        const normalized = normalizeEvent(answers);
        console.log("\nNormalized event object:");
        console.log(normalized);

        rl.close();
        return;
    }

    // ask current question
    rl.question(step.question + " ", (input) => {
        const trimmedInput = input.trim(); // remove trailing or leading whitespace

        // Generic validation hook: run validator dynamically if specified
        if (step.validator) {
            const validateFn = validators[step.validator];

            if (!validateFn) {
                throw new Error(`Validator "${step.validator}" is not defined`);
            }

            // run validator, if invalid, re-ask the same question
            if (!validateFn(trimmedInput)) {
                console.log(step.errorMessage || "Oops! Invalid input please try again");
                askNext(); // re-ask same question
                return; // stops execution of this callback safely in ESM
            }
        }

        // store answer and move to next step
        answers[step.field] = trimmedInput;
        currentStep++;
        askNext();
    });
};

// start CLI
askNext();



   