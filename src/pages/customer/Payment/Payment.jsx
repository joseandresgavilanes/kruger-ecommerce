import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../Cart/CartItem/CartItem";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Coupon from "./Coupon/Coupon";
import Paypal from "./Paypal/Paypal";

import "./Payment.scss";
import { startCreateOrder } from "../../../store/cart/thunks";
import { useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import {
  setTotalPriceWithIva,
  updateTotalPrice,
} from "../../../store/cart/cartSlice";

const Payment = () => {
  const { cart } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.users);
  const toast = useRef(null);
  const dispatch = useDispatch();

  const navigation = useNavigate();

  const [coupon, setCoupon] = useState(null);
  const [chosenAddress, setChosenAddress] = useState();

  const [cartaFinalPrice, setCartaFinalPrice] = useState(0);
  const [cartaSubtotal, setCartaSubtotal] = useState(0);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
  const [cardNumber, setCardNumber] = useState();
  const [cardDate, setCardDate] = useState();
  const [cardCode, setCardCode] = useState();
  const [cardHolder, setCardHolder] = useState();

  useEffect(() => {
    //este es el precio total que esta en la carta antes de agregar la iva
    setCartaSubtotal(cart?.totalPrice.toFixed(2));
    //agregar la iva al totlaPrice
    const priceWithIva =
      Math.round((cart?.totalPrice + cart?.totalPrice * 0.12) * 100) / 100;
    setCartaFinalPrice(priceWithIva);
  }, []);

  const showWarn = () => {
    toast.current.show({
      severity: "warn",
      summary: "Dirección de envío",
      detail: "No se ha especificado una dirección de envío",
      life: 3000,
    });
  };

  const accept = async () => {
    //si hay un cupon validado, el precio final de la carta sera el precio despues del descuento
    //caso contrario seria el precio final
    if (!coupon) {
      dispatch(setTotalPriceWithIva({ price: cartaFinalPrice }));
    } else {
      dispatch(setTotalPriceWithIva({ price: priceAfterDiscount }));
    }
    dispatch(
      startCreateOrder(chosenAddress, coupon ? coupon : null, cartaSubtotal)
    );
    //resetear todos los campos y enviar el usuario al home page
    resetStates();
    toast.current.show({
      severity: "success",
      summary: "Compra realizada",
      detail: "Tu compra se ha efectuado correctamente",
      life: 3000,
    });
    setTimeout(() => {
      navigation("/orders");
    }, 1000);
  };

  /**
   * llama este metodo cuando se termina de reializar una compra
   * para resetear los campos y mandar al cliente al home page
   */
  const resetStates = () => {
    setCartaFinalPrice(0);
    setCartaSubtotal(0);
    document.getElementById("discount-container").style.display = "none";
    document.getElementById("totalPrice").style.textDecorationLine = "none";
    document.getElementById("totalPrice").style.color = "#A1FF69";
    setPriceAfterDiscount(0);
  };

  /**
   * this is a callback method to recive the valid coupone once the customer use it
   * @param {the coupon that the user has activated} coupon
   */
  function onCouponActivated(activeCoupon) {
    setCoupon(activeCoupon);
    showCouponResults(activeCoupon);
  }

  /**
   * this method will call applyCoupon method to calculate the price
   * and will show the price after applying the discount
   * @param {the coupon that the user entered} activeCoupon
   */
  function showCouponResults(activeCoupon) {
    if (activeCoupon) {
      applyCoupon(activeCoupon);
      document.getElementById("totalPrice").style.textDecorationLine =
        "line-through";
      document.getElementById("totalPrice").style.textDecorationColor = "red";
      document.getElementById("totalPrice").style.color = "grey";
      document.getElementById("discount-container").style.display = "block";
    }
  }
  /**
   * llama este metodo para actualizar el precio segun el coupon validado
   * @param {es el coupon que el usuario ha validado} activeCoupon
   */
  function applyCoupon(activeCoupon) {
    if (activeCoupon?.type == "PERCENTAGE") {
      const percentage = cartaFinalPrice * (activeCoupon.quantity / 100);
      setPriceAfterDiscount(cartaFinalPrice - percentage);
    } else {
      setPriceAfterDiscount(cartaFinalPrice - activeCoupon.quantity);
    }
  }
  /**
   * al selecionar una opcion del dropdown se pasara esa opcion
   * como parametro en este metodo
   * @param {el dropdown de ubicaciones } e
   */
  const onUbiacitonSelected = (e) => {
    setChosenAddress(e.value);
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Cancelado",
      detail: "Cancelaste la compra",
      life: 3000,
    });
  };

  const confirmOrder = () => {
    if (chosenAddress) {
      confirmDialog({
        message:
          "Estas seguro de realizar estac compra con los datos proporcionados?",
        header: "Confirma tu compra",
        icon: "pi pi-exclamation-triangle",
        accept,
        reject,
      });
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Dirección de envío",
        detail: "No se ha especificado una dirección de envío",
        life: 3000,
      });
    }
  };

  const createOrder = () => {
    //TODO CREAR VALIDACIONES PARA EL FORMULARIO DE LA TARJETA
    //DROPDOWN DE DIRECCIONES DE ENVÍO DEL CLIENTE
    // if(shipmentAddress==''){
    //     showWarn()
    // }
    // else{
    confirmOrder();
    // }
  };
  /**
   * enviar el usuario al profile page para que agrega una dierccion nueva
   */
  const addDirectionClick = () => {
    navigation("/profile");
  };

  //update card details
  const onChangeCardNumber = (event) => {
    //asegurar que solo se esta ingresando numeros
    const cleanedValue = event.target.value.replace(/\D/g, "");
    //agregar un espacio despues de cada 4 digitos y borrar el resto de espacios si existen
    //y la parte del substr es para coger solo los primeros 16 digitos
    const formattedValue = cleanedValue
      .substr(0, 16)
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    setCardNumber(formattedValue);
  };
  const onChangeCardDate = (event) => {
    const onlyNumbers = event.target.value.replace(/\D/g, "");
    //despues de cada 2 nueros agregar
    let formatedDate = onlyNumbers.replace(/(\d{2})/g, "$1/").trim();
    //solo coger hasta el index 5
    formatedDate = formatedDate.substr(0, 5);
    setCardDate(formatedDate);
  };
  const onChangeCardCode = (event) => {
    const onlyNumbers = event.target.value.replace(/\D/g, "");
    setCardCode(onlyNumbers.trim().substr(0, 4));
  };

  const onChangeCardHolder = (event) => {
    const onlyLetters = event.target.value.replace(/\d/g, "").toUpperCase();
    setCardHolder(onlyLetters);
  };

  //try to create paypal order

  const PayPalCreateOrder = () => {
    dispatch(
      startCreateOrder(
        "Dirección default",
        coupon ? coupon : null,
        cartaSubtotal
      )
    );
  };

  return (
    <section className="cart__checkout">
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="cart__order">
        <h2>Verificar</h2>
        <h5>Order #0101</h5>
        <ul className="cart__order-list">
          {cart.items.map((item, index) => (
            <CartItem item={item} key={index} index={index} />
          ))}
        </ul>
        <Coupon onCouponActivated={onCouponActivated} />
        <h5>Subtotal</h5>
        <h4>{cartaSubtotal} $</h4>
        <h5 className="cart__total">Total + IVA</h5>
        <h2 id="totalPrice" className="cart__total-value">
          {cartaFinalPrice} $
        </h2>
        <div id="discount-container" className="discount-container">
          <h3>
            {coupon?.type == "PERCENTAGE"
              ? `- ${coupon?.quantity}%`
              : `-$${coupon?.quantity}`}
          </h3>
          <hr />
          <h2
            id="priceAfterDiscount"
            className="cart__total-value-wiith-discount"
          >
            {Math.round(priceAfterDiscount * 100) / 100} $
          </h2>
        </div>
      </div>
      <div id="payment" className="cart__payment">
        <h2>Pagar</h2>
        <div className="cart__card">
          <div className="cart__card-content">
            <h5>Número de la tarjeta</h5>
            <h6 id="label-cardnumber">
              {cardNumber ? cardNumber : "1234 5678 9123 4567"}
            </h6>
            <h5>
              Expiración<span>CVC</span>
            </h5>
            <h6 id="label-cardexpiration">
              {cardDate ? cardDate : "03/08"}
              <span>{cardCode ? cardCode : "1234"}</span>
            </h6>
            <br />
            <p>{cardHolder ? cardHolder : "Nombre del titular"}</p>
          </div>
          <div className="cart__wave"></div>
        </div>
        <div className="cart__card-form">
          <p className="cart__field">
            <input
              type="text"
              id="cardnumber"
              name="cardnumber"
              placeholder="1234 5678 9123 4567"
              pattern="\d*"
              title="Card Number"
              onChange={onChangeCardNumber}
              value={cardNumber}
            />
          </p>

          <div className="cart__card-form__bottom">
            <p className="cart__field cart__space">
              <input
                type="text"
                id="cardexpiration"
                name="cardexpiration"
                placeholder="03/08"
                pattern="\d*"
                title="Card Expiration Date"
                onChange={onChangeCardDate}
                value={cardDate}
              />
            </p>
            <p className="field">
              <input
                type="text"
                id="cardcvc"
                name="cardcvc"
                placeholder="123"
                pattern="\d*"
                title="CVC Code"
                onChange={onChangeCardCode}
                value={cardCode}
              />
            </p>
          </div>
          <p className="cart__field">
            <input
              type="text"
              id="cardnumber"
              name="cardnumber"
              placeholder="Nombre de la tarjeta"
              title="Card holder name"
              value={cardHolder}
              onChange={onChangeCardHolder}
            />
          </p>
          <p className="cart__field">
            <input
              type="text"
              id="cardnumber"
              name="cardnumber"
              placeholder="Email"
              pattern="\d*"
              title="Card Number"
            />
          </p>

          {currentUser?.addresses.length > 0 ? (
            <Dropdown
              value={chosenAddress}
              options={currentUser?.addresses}
              onChange={(e) => {
                onUbiacitonSelected(e);
              }}
              optionLabel="address"
              placeholder="Elige ubicacion"
            />
          ) : (
            <div className="no-direcciones-cont">
              <h4>No tienes direcciones agregados!</h4>
              <button className="add-direction" onClick={addDirectionClick}>
                <span>Agrega un nuevo direccion</span>
              </button>
            </div>
          )}

          <div className="cart__card-form__bottom">
            <p className="cart__field cart__space">
              <input
                type="text"
                id="cardexpiration"
                name="cardexpiration"
                placeholder="Telefono"
                pattern="\d*"
                title="Card Expiration Date"
              />
            </p>
            <p className="field">
              <input
                type="text"
                id="cardcvc"
                name="cardcvc"
                placeholder="Código ZIP"
                pattern="\d*"
                title="CVC Code"
              />
            </p>
          </div>
          <button
            onClick={createOrder}
            className="cart__button-cta"
            title="Confirm your purchase"
          >
            <span>COMPRAR</span>
          </button>
          <Paypal
            cartaFinalPrice={cartaFinalPrice}
            PayPalCreateOrder={PayPalCreateOrder}
          />
        </div>
      </div>
    </section>
  );
};

export default Payment;
