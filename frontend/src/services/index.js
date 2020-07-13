import axios from 'axios';

const endPoint = process.env.VUE_APP_API_END_POINT;
const service = axios.create({ baseURL: endPoint });

export default service;
