//This is the main entry point for the POC's CLI (Command line interface) assitant.
//Here, we can simulate asking an event builder questions, collecting answers, and displaying results
//uses eventBuildConversationSteps to know what to ask
//uses normalizeEvent to transform answers

//Later, if we build a web UI or chat interface, this can be repurposed without messing with the conversation or normalization logic

import readline from "readline";
import { eventBuildConversationSteps } from "./conversation.js";
import {normalizeEvent} from "./normalizeEvent.js";

const rl = readline.createInterface ({
    input: process.stdin,
    output: process.stdout
});

const answers ={}; //stores answers in an array
let currentStep = 0;

const askNext = () => { // JavaScript arrow function called askNext that picks current question from eventBuildConversationSteps, and calls questions until the last step adn then closes the CLIn
    const step = eventBuildConversationSteps[currentStep];

    if (!step) {
        //all questions asked
        console.log("\nRaw input:");
        console.log(answers);

        const normalized = normalizeEvent(answers);
        console.log("\nNormalized event object:");
        console.log(normalized);

        rl.close();
        return;
    }

    rl.question(step.question + " ", (input) => {
        answers[step.field]=input.trim(); //trimwhitespace
        currentStep++;
        askNext();
    });
};

askNext();