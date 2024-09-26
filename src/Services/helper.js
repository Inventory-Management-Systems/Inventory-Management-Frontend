import axios from "axios";

// export const BASE_URL = "http://localhost:8080";

const baseUrl = process.env.REACT_APP_HOST || "http://localhost";
const port = process.env.REACT_APP_PORT || "8080";

const constructFullUrl = () => `${baseUrl}:${port}`;
const fullUrl = constructFullUrl();

export const myAxios = axios.create({
    baseURL: fullUrl
});
