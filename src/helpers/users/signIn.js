import { backEndApi } from "../../api/backEndApi";

export const signIn = async (loginRequest) => {
    try {
        let resp;
  
        //llamando el endpoint de user para loggear un user
        resp = await backEndApi.post("/users/login", loginRequest);
        
        
        return resp.data;

    } catch (error) {
    
        return null;
    }
}