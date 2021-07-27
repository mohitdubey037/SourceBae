const prod = {
    url:{
        API_URL:`https://api.onesourcing.in`
    }
}

const dev = {
    url:{
        API_URL:`http://13.235.79.27:8000`
    }
    
}

export const config = process.env.NODE_ENV === `development` ? dev : prod;