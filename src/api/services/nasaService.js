// Import axios for making HTTP requests.
import axios from "axios";

// Import the baseUrl from the settings file. This is the base URL for the NASA API.
// The settings file contains the API key in the baseUrl for accessing the API.
import {baseUrl} from "../settings";

// Function to fetch today's picture data from the NASA API.
export async function getTodayPicture() {
    let data = {}; // Create an empty object to store the fetched data.

    // Use axios to make a GET request to the NASA API using the baseUrl.
    // Await the response and store the data in the 'data' variable.
    // If there's an error, log it to the console.
    await axios.get(baseUrl).then(res => {
        data = res.data;
    }).catch(err => console.log(err));

    return data;
}