import { useEffect } from "react";
import { useLocation } from "react-router";

const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
};

export const AuthVerify = (props) => {
    
    let location = useLocation();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
        if (currentUser) {
          const decodedJwt = parseJwt(currentUser.token);
    
          if (decodedJwt.exp * 1000 < Date.now()) {
            props.logOut();
          }
        }
      }, [location, props]);
    
    return ;
}
