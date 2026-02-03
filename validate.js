// Updated Feb 2 2026 to add additional validation logic
// we can use this to build validations outside the CLI input folder
// right now this doesn't account for time zones....
// checks that input is not empty
export function isRequired(input) {
    return input.trim().length > 0;
}

// Checks date format and timeliness (aka today or future)
export function isValidDate(input) {
    const regex = /^\d{4}-\d{2}-\d{2}$/; //regular expression for checking date format and validity

    // ^        → start of string
    // \d{4}    → exactly 4 digits (year)
    // -        → literal hyphen
    // \d{2}    → exactly 2 digits (month)
    // -        → literal hyphen
    // \d{2}    → exactly 2 digits (day)
    // $        → end of string
    if (!regex.test(input)) return false;

    // Convert input string into UTC date (avoids timezone issues)
    const [year, month, day] = input.split("-").map(Number);
    const dateUTC = Date.UTC(year, month - 1, day); // JS months are 0-indexed

    // Future date enforcer.... remove if we wanted to allow backdates
    const today = new Date();
    const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

    return dateUTC >= todayUTC;
}

// Check capacity is positive integer
export function isPositiveNumber(input) {
    const num = Number(input);
    return !isNaN(num) && Number.isInteger(num) && num > 0;
}
