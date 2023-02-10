import { backEndApi } from "../../api/backEndApi"

export const getAllCarts= async ()=>{

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const config = {
        headers: { Authorization: `Bearer ${currentUser.token}` }
    };

    try{
        const resp = await backEndApi.get(`/carts/`,config)
        return resp.data

    }catch(error){
        throw new Error(error.message)
    }
}