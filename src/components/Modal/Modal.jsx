import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Modal.scss";

const Modal = () => {
  const [isFormOpen, setIsFormOpen] = useState(true);

  const handleClose = () => {
    setIsFormOpen(false);
  };
  return (
    <div
      className={
        isFormOpen ? "modal__main__container" : "modal__main__container__close"
      }
    >
      <div className="modal__main">
        <div className="notification">
          <div className="notification__body">
            <div className="notification__img">
              <img
                src="https://media.wired.com/photos/62d75d34ddaaa99a1df8e61d/master/pass/Phone-Camera-Webcam-Gear-GettyImages-1241495650.jpg"
                alt="iphone 13 picture"
              />
            </div>
            <div className="notification__main">
              <h2>¡Aprovecha por tiempo limitado!</h2>
              <p>
                ¡Obtén %15 de descuento en tu primera compra! Encuentra las
                últimas ofertas en smartphones y servicios de telefonía móvil.
                ¡Aprovecha ahora nuestras ofertas!
              </p>
              <NavLink to="/search">
                <button>Explora</button>
              </NavLink>
            </div>
          </div>

          <button onClick={handleClose} className="notification__close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
