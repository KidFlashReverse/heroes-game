import Axios from "axios";

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_HEROES_API,
    headers: {
        "Access-Control-Allow-Origin": '*',
        "Content-Type": 'application/json',
    }
}); 

export { axios }