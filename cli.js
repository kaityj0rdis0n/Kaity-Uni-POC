// The CLI adapter — responsible only for terminal input/output.
// All conversation logic lives in conversationOrchestrator.js.
// To swap in a UI later, replace this file with a UI adapter that
// provides its own askQuestion and passes it to runConversation().

import readline from "readline";
import { runConversation } from "./conversationOrchestrator.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Wraps readline's callback-based question() in a Promise so the
// orchestrator can use async/await instead of nested callbacks
function askQuestion(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (input) => resolve(input));
    });
}

// Start the conversation, then close the terminal input stream when done
runConversation(askQuestion)
    .catch((err) => console.error("Event creation failed:", err))
    .finally(() => rl.close());
