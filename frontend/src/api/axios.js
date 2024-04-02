import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({
    baseURL: `${URL}/api`,
    withCredentials: true
})

export default instance
