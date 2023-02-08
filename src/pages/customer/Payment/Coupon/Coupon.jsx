import { useRef } from "react";
import { useState } from "react";
import { validarCupones } from "../../../../helpers/coupons/validarCupones";
import "./coupon.scss";
import InformativeMessage from "./informativeMessage/InformativeMessage";

const Coupon = ({onCouponActivated}) => {

    const [cuponStr,setCuponStr]=useState("");
    const[showCupon,setShow]=useState(false);

    const [messageState,setMessageState]=useState(false);
    const[message,setMessage]=useState("");

    const btnRef=useRef(null);
    const inputRef=useRef(null);
       

    function handleOnchange(e){
        setCuponStr(e.target.value);
        
    }
    /**
     * este metod se invoka la presionar validar coupon
     * para poder determinar si el coupon esta reservado o usado
     */
async function validarCupon(){
    
    const resp=await validarCupones(cuponStr); 

        if(resp && resp.status !== "USED" ){
            
            //caso el coupon es valido y no esta usado
            setMessageState(true);
            setMessage("Cupon has been activated!");
            onCouponActivated(resp);
            btnRef.current.style.display="none";
            inputRef.current.disabled=true;
            inputRef.current.style.color="#A1FF69";

            setShow(true);  
        }else{
            setMessageState(false);
            setMessage(!resp? "Cupon is not valid!": `Cupon is already ${resp.status.toLowerCase()}!`);
            setShow(true);  
            inputRef.current.style.color="#ef5353";
            setTimeout(()=>{
                inputRef.current.style.color="white";
                
                setShow(false);  
            },1500)
        }
}

    return ( 
        <div>
        <div className="coupon-container">
            <h4>Tienes cupon? ingresalo aqui!</h4>
            <input type="text"  placeholder="Ingresa un coupon" value={cuponStr} onChange={handleOnchange} ref={inputRef}/>
            <button onClick={validarCupon} ref={btnRef} className="validar-btn">Validar</button>
            
            
        </div>
        <div className="mesasge-container">
            <InformativeMessage message={message} state={messageState} show={showCupon}/>
        </div>
        </div>
     );
}
 
export default  Coupon ;