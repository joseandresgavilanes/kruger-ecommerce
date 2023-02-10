import axios from 'axios';

//connectar al customer-microservice
export const backEndApi = axios.create({
    baseURL: `https://localhost:8082/api/`,
}) 
