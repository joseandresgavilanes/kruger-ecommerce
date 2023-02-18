import React from "react";
import "./NoCard.scss";

const NoCard = () => {
  return (
    <div className="nocard">
      <div className="nocard_main">
        <h2>
          <span>¿Recuerdas? </span>
          ¡Aquí no hay límites!
        </h2>
        <p className="nocard_main_text">
          Si no posees una tarjeta de crédito o débito para realizar tu compra
          en nuestro commerce, ¡no te preocupes! También puedes realizar el pago
          a través de una transferencia bancaria o depósito bancario en nuestra
          cuenta. Incluye tu nombre completo y número de orden al hacer la
          transferencia o depósito. Ten en cuenta que el tiempo de procesamiento
          puede ser más largo debido a la espera del reflejo del pago en nuestra
          cuenta bancaria. ¡Gracias por escoger
          <span> Kruger Cell!</span>
        </p>
        <div className="nocard_img">
          <img src="./images/credit-card.svg" alt="credit card image" />
        </div>

        <h3 className="card_data_title">Has tu depósito o tranferencia a:</h3>
        <div className="card_data">
          <p>
            <span>Nombre completo: </span>
            Ernesto Kruger
          </p>
          <p>
            <span>Numero de cedula: </span>
            1805156912
          </p>
          <p>
            <span>Banco: </span>
            Pichincha
          </p>
          <p>
            <span>Tipo de cuenta: </span>
            Ahorro
          </p>
          <p>
            <span>Numero de cuenta: </span>
            1234567890
          </p>
          <p>
            <span>Correo opcional: </span>
            krugercellmag@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoCard;
