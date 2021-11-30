const prod = {
    url: {
        API_URL: `https://api.sourcebae.in`
    }
}

const dev = {
    url: {
        API_URL: `https://api.onesourcing.in`
    }
    // url: {
    //     API_URL: `https://api.sourcebae.com`
    // }
}

export const config = process.env.NODE_ENV === `development` ? dev : prod;