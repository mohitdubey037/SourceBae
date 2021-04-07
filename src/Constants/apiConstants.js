const prod = {
    url:{
        API_URL:`https://api.onesourcing.in`
    }
}

const dev = {
    url:{
        API_URL:`https://api.onesourcing.in`
    }
}

export const config = process.env.NODE_ENV === `development` ? dev : prod;