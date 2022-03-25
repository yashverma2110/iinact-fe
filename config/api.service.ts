import axios from "axios";
import { getToken } from "./methods";

const LOCAL_BASE_URL = "http://localhost:8080";
const BASE_URL = "https://iinact-be.vercel.app";

const getBaseURL = () => {
  return process.env.NODE_ENV === "development" ? LOCAL_BASE_URL : BASE_URL;
};

const API_SERVICE = axios.create({
  baseURL: getBaseURL(),
});

const AUTH_API_SERVICE = axios.create({
  baseURL: getBaseURL(),
  headers: {
    Authorization: "Bearer " + getToken(),
  },
});

export { API_SERVICE, AUTH_API_SERVICE };
