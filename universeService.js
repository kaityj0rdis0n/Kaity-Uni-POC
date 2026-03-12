// I pivoted and now this is Phase 2: A Service layer to interact with Universe GraphQL API
// This is Responsible for sending normalized events to Universe without touching CLI or conversation logic
// Handles API calls, error handling, and response parsing

import fetch from "cross-fetch"; // before it did have node-fetch

// Set your Universe API endpoint and auth token (replace with env variables later)
const UNIVERSE_API_URL = "https://api.universe.com/graphql";
const UNIVERSE_API_TOKEN = process.env.UNIVERSE_API_TOKEN || "YOUR_API_TOKEN_HERE";

/**
 * Generic function to call Universe GraphQL API
 * @param {string} query - GraphQL query or mutation
 * @param {object} variables - Variables for the query/mutation
 * @returns {Promise<object>} - Returns JSON response
 */
async function callUniverseAPI(query, variables = {}) {
    try {
        const response = await fetch(UNIVERSE_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${UNIVERSE_API_TOKEN}`,
            },
            body: JSON.stringify({ query, variables }),
        });

        const data = await response.json();

        if (data.errors) {
            console.error("Universe API returned errors:", data.errors);
            throw new Error("Universe API call failed");
        }

        return data.data;
    } catch (err) {
        console.error("Error calling Universe API:", err);
        throw err;
    }
}

/**
 * Phase 2: Create a draft event in Universe
 * @param {object} normalizedEvent - Normalized event object from normalizeEvent.js
 * @returns {Promise<object>} - Created event object from Universe
 */
export async function createDraftEvent(normalizedEvent) {
    const mutation = `
        mutation CreateDraftEvent($input: EventInput!) {
            createEvent(input: $input) {
                id
                slug
                title
            }
        }
    `;

    const variables = { input: normalizedEvent };

    return callUniverseAPI(mutation, variables);
}

//Export other functions later for fetching events, updating, etc.