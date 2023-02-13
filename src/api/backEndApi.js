import axios from 'axios';

//connectar al customer-microservice
export const backEndApi = axios.create({
    baseURL: process.env.BACK_URL
}) 
