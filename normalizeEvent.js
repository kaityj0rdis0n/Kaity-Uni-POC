//This function takes raw user input and transforms it into a consistent, API-ready, normalized format
//AKA it scrubs input data into formats we want
//It keeps data mapping logic isolated
//Allows real API calls to be added in and
// Follows the collect -> normalize -> send principle

export function normalizeEvent(raw) { //export makes this function available to other files via import, raw is an object with the user's answers from the CLI
    return { //gives back (returns) a new object with sanitized or normalized data
        title: raw.name, //maps user input 'name' to API field 'title'
        kind: raw.type.toLowerCase().includes("single")
            ? "SINGLE_EVENT" //ternary operator, works the same as if-else
            : "RECURRING_EVENT",
        startDate: new Date(raw.date).toISOString(), //converts to usable date in a Javascript date object with ISO 8601 format
        capacity: Number(raw.capacity), //ensures numeric value

        // Venue & location information
        venueName: raw.venueName || null, //optional, can be null if user leaves blank
        address: raw.address, //required, comes straight from user input

        // Optional age restriction
        ageLimit: raw.ageLimit || null,

        // Latitude & longitude: handle empty input gracefully
        // If the user leaves it blank, store as null instead of 0
        latitude: raw.latitude ? Number(raw.latitude) : null,
        longitude: raw.longitude ? Number(raw.longitude) : null,
    }
}