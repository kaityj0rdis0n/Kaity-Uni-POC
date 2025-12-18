//This function takes raw user input and transforms it into a consistent, API-ready, normalized format
//AKA it scrubs input data into formats we want
//It keeps data mapping logic isolated
//Allows real API calls to be added in and
// Follows the collect -> normalize -> send principle

export function normalizeEvent(raw) { //export makes this function available to other files via import, raw is an object with the user's answers from the CLI
    return { //gives back (returns) a new object with sanitized or normalized data
        name: raw.name,
        kind: raw.type.toLowerCase().includes("single")
        ? "SINGLE_EVENT" //ternary operator, works the same as if-else
        : "RECURRING_EVENT",
        startDate: new Date(raw.date).toISOString(), //converts to usable date in a Javascript date object wiwth ISO 8601 format
        capacity: Number(raw.capacity)

    }
}