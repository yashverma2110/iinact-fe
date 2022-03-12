import axios from "axios";

const LOCAL_BASE_URL = "http://localhost:8080";

const API_SERVICE = axios.create({
  baseURL: LOCAL_BASE_URL,
});

export { API_SERVICE };
