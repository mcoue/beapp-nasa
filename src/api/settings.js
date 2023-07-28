// This is the base URL for the NASA API's Astronomy Picture of the Day (APOD) endpoint.
// The "process.env.EXPO_PUBLIC_API_KEY" is an environment variable that holds the API key for accessing the API.
// In Expo, environment variables starting with "EXPO_PUBLIC_" are automatically available in the app.
// Make sure you have defined the "EXPO_PUBLIC_API_KEY" in your app's .env file.
const baseUrl = `https://api.nasa.gov/planetary/apod`;

// Export the baseUrl variable so that other parts of the app can use it to make API requests.
module.exports = {
    baseUrl
};