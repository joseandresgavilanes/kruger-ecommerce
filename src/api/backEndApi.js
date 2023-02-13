import axios from 'axios';

//connectar al customer-microservice
export const backEndApi = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`
}) 
