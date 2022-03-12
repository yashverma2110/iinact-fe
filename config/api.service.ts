import axios from "axios";

const LOCAL_BASE_URL = "http://localhost:8080";
const BASE_URL = "https://iinact-be.vercel.app";

const API_SERVICE = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? LOCAL_BASE_URL : BASE_URL,
});

export { API_SERVICE };
