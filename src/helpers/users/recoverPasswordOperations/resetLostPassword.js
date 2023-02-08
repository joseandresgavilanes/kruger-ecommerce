
import { backEndApi } from "../../../api/backEndApi";


export const resetLostPassword = async (request) => {
    try {
        let resp;
  
        //llamando el endpoint de user para cambiar la contraseña del usuario en caso de perderla o olviidarla
        resp = await backEndApi.post(`/users/recovery-code/reset-password`, request);
        
        
        return resp.data;

    } catch (error) {

        return null;
    }
}