import { backEndApi } from "../../api/backEndApi";


export const updateVerified = async (user) => {
    try {
        let resp;

        //llamando el endpoint de user para loggear un user
        resp = await backEndApi.put(`/users/update/verified/${user.id}`, user);
        
        
        return resp.data;

    } catch (error) {

        return null;
    }
}