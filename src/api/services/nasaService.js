// Import axios for making HTTP requests.
import axios from "axios";

// Import the baseUrl from the settings file. This is the base URL for the NASA API.
// The settings file contains the API key in the baseUrl for accessing the API.
import {baseUrl} from "../settings";

// Function to fetch today's picture data from the NASA API.
export async function getTodayPicture(params) {
    try {
        const response = await axios.get(baseUrl, {params});

        return response.data;
    } catch (error) {
        console.log('Error:', error);
        return {};
    }
}

export async function getLastPictures(params) {
    try {
        const response = await axios.get(baseUrl, {params});

        return response.data;
    } catch (error) {
        console.log('Error:', error);
        return [];
    }
}