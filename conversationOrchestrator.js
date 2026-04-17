// The conversation orchestrator knows the order of steps, runs validation,
// collects answers, and calls normalize + the service.
//
// It does NOT know how input is collected — that's the job of whoever calls
// runConversation(). A CLI passes a readline-based askQuestion. A UI would
// pass its own. Same orchestration, swappable input mechanism.

import { eventBuildConversationSteps } from "./conversation.js";
import { normalizeEvent } from "./normalizeEvent.js";
import { createDraftEvent } from "./universeService.js";
import { isValidDate, isRequired, isPositiveNumber, isValidLatitude, isValidLongitude } from "./validate.js";

// Validator map moved here from cli.js — validation is part of orchestration,
// not part of how the terminal works
const validators = {
    date: isValidDate,
    required: isRequired,
    capacity: isPositiveNumber,
    latitude: (input) => isValidLatitude(input, "Latitude"),
    longitude: (input) => isValidLongitude(input, "Longitude")
};

/**
 * Run the full event builder conversation.
 *
 * @param {function} askQuestion - Takes a prompt string, returns a Promise<string>.
 *                                 This is the only thing that differs between CLI and UI.
 * @param {function} showError   - Takes an error string and displays it to the user.
 *                                 Defaults to console.warn — a UI would pass its own.
 * @returns {Promise<object>}    - The created event from Universe
 */
export async function runConversation(
    askQuestion,
    showError = (msg) => console.warn(msg)
) {
    const answers = {};

    // Step through each question in order.
    // If validation fails, keep asking the same question until we get valid input.
    for (const step of eventBuildConversationSteps) {
        let answered = false;

        while (!answered) {
            const input = (await askQuestion(step.question + " ")).trim();

            if (step.validator) {
                const validateFn = validators[step.validator];

                if (!validateFn) {
                    throw new Error(`Validator "${step.validator}" is not defined`);
                }

                if (!validateFn(input)) {
                    showError(step.errorMessage || "Invalid input, please try again.");
                    continue; // re-ask the same step
                }
            }

            answers[step.field] = input;
            answered = true;
        }
    }

    console.log("\nRaw input:");
    console.log(answers);

    const normalized = normalizeEvent(answers);
    console.log("\nNormalized event object:");
    console.log(normalized);

    const createdEvent = await createDraftEvent(normalized);
    console.log("Created event in Universe:", createdEvent);

    return createdEvent;
}
