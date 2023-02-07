import axios from 'axios';

//connectar al customer-microservice
export const backEndApi = axios.create({
    baseURL: `http://gateway-microservice:8082/api/`,
}) 
