// this is the step I added on Jan 27 2026 to teach myself how to validate date input
// we can use this to build validations outside the CLI input folder
// hope is to keep things clean
// right now this doesn't account for time zones....


// export function

export function isValidDate(datesString) {
    const regex = /^\d{4}-\d{2}$/; //regular expression for checking date format (not validity)

    
// ^        → start of string
// \d{4}    → exactly 4 digits (year)
// -        → literal hyphen
// \d{2}    → exactly 2 digits (month)
// -        → literal hyphen
// \d{2}    → exactly 2 digits (day)
// $        → end of string
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    if(Number.isNaN(date.getTime())) return false; // check real date

    // future date enforcer.... remove if we wanted to back date I guess? 

const today = new Date();
today.setHours(0, 0, 0, 0);
if (date < today) return false;
return true;
}