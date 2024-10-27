import axios  from "axios";
//TODO update the base url here so that it works in deployment as well
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:2001/api" : "/api";
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})