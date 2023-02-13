import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_details">
        <div className="footer_img">
          <img src="./images/logo.png" alt="company logo" />
        </div>
        <div className="footer_text">
          Descubre el poder de la tecnología con nuestra amplia selección de
          dispositivos de última generación
        </div>
      </div>

      <ul className="footer_container">
        <li className="footer_container_list">
          <h3>Principal</h3>
          <NavLink to={"/"}>Inicio</NavLink>
          <NavLink to="/about">Sobre Nosotros</NavLink>
          <NavLink to={"/contact"}>Contáctanos</NavLink>
          <NavLink to="/faq">Preguntas</NavLink>
        </li>
        <li className="footer_container_list">
          <h3>Explora</h3>
          <NavLink to={"/products"}>Productos</NavLink>
          <NavLink to={"/search"}>Buscar</NavLink>
          <NavLink to={"/services"}>Servicios</NavLink>
          <NavLink to={"/cart"}>Carrito</NavLink>
        </li>
        <li className="footer_container_list">
          <h3>Social</h3>
          <div className="footer_container_list_social">
            <NavLink>
              <i className="fa-brands fa-twitter"></i>
            </NavLink>
            <NavLink>
              <i className="fa-brands fa-facebook"></i>
            </NavLink>
            <NavLink>
              <i className="fa-brands fa-linkedin"></i>
            </NavLink>
            <NavLink>
              <i className="fa-solid fa-envelope"></i>
            </NavLink>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
