const env = process.env.APP_ENVIRONMENT; // localhost or master i.e. amplify
// const env = 'production' // sourcebae.com i.e. production

export const config = {
    production: {
        url: {
            API_URL: `https://api.sourcebae.com`
        }
    },
    development: {
        url: {
            API_URL: `https://api.onesourcing.in`
        }
    }
}[env || 'development'];
