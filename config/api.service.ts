import axios from "axios";
import { getToken } from "./methods";

const LOCAL_BASE_URL = "http://localhost:8080";
const BASE_URL = "https://iinact-be.vercel.app";

const API_SERVICE = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? LOCAL_BASE_URL : BASE_URL,
});

const AUTH_API_SERVICE = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? LOCAL_BASE_URL : BASE_URL,
  headers: {
    Authorization: "Bearer " + getToken(),
  },
});

export { API_SERVICE, AUTH_API_SERVICE };
