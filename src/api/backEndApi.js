import axios from 'axios';

//connectar al customer-microservice
export const backEndApi = axios.create({
    baseURL: `${process.env.REACT_APP_URL}`
}) 
