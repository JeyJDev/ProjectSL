import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({
    baseURL: `https://backend-api-pfp9.onrender.com/api`,
    withCredentials: true
})

export default instance
