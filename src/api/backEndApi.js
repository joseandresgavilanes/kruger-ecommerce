import axios from 'axios';

//connectar al customer-microservice
export const backEndApi = axios.create({
    baseURL: `https://krugercell-service.sistemaagil.net:8082/api/`,
}) 
