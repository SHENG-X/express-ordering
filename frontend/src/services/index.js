import axios from 'axios';

const endPoint = process.env.API_END_POINT || 'http://localhost:8081';
const service = axios.create({ baseURL: endPoint });

export default service;
