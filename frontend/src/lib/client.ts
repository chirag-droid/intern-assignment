import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
   throw new Error("Please define REACT_APP_BACKEND_URL environment variable");
}

const client = axios.create({
   baseURL: backendUrl,
});

export default client;
