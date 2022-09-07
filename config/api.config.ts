import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8081'
    : 'https://iinact-be.vercel.app';

const API = axios.create({
  baseURL: BASE_URL,
});

export default API;
