export const spotifyConfig = {
    clientId: import.meta.env.VITE_YOUR_CLIENT_ID,
    clientSecret: import.meta.env.VITE_YOUR_CLIENT_SECRET,
    redirectUri: import.meta.env.VITE_YOUR_REDIRECT_URI,
    authEndpoint: 'https://accounts.spotify.com/authorize',
    apiEndpoint: 'https://api.spotify.com/v1',
}
