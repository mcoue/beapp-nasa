// Function to transform a Date object to a string in the format "YYYY-MM-DD".
export function transformDate(date) {
    const year = date.getFullYear();
    const day = date.getDate();

    let month = date.getMonth() + 1;
    if (month.toString().length < 2) {
        month = `0${month}`;
    }

    return `${year}-${month}-${day}`;
}

// Function to get the date corresponding to the last month from the given date.
export function getLastMonth(date) {
    // Create a new Date object based on the input date to avoid modifying the original date.
    const newDate = new Date(date);
    // Subtract one month from the new date
    newDate.setMonth(newDate.getMonth() -1);
    // Subtract one day from the new date to avoid fetching 2 times the same picture
    newDate.setDate(newDate.getDate() - 1);

    return newDate;
}