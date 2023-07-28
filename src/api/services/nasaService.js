// Import axios for making HTTP requests.
import axios from "axios";

// Import the baseUrl from the settings file. This is the base URL for the NASA API.
// The settings file contains the API key in the baseUrl for accessing the API.
import {baseUrl} from "../settings";

// Function to fetch the picture of the day from the NASA API with optional parameters.
export async function getTodayPicture(params) {
    try {
        // Use axios to make a GET request to the baseUrl with the provided params.
        const response = await axios.get(baseUrl, {params});
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        return {};
    }
}

// Function to fetch a list of pictures from the NASA API with optional parameters.
export async function getLastPictures(params) {
    try {
        // Use axios to make a GET request to the baseUrl with the provided params.
        const response = await axios.get(baseUrl, {params});
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        return [];
    }
}