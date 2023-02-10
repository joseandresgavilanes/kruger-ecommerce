import React, { useRef, useState } from "react";
import "./AdminNavBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../store/user/userSlice";
import { Badge } from "primereact/badge";
import AdminCircle from "./AdminCircle/AdminCircle"
import { useEffect } from "react";
import { resetCart } from "../../store/cart/cartSlice";

const AdminNavBar = () => {

  const navbar = useRef();
  const [loginTxt, setLoginTxt] = useState("");
  const navigation = useNavigate();
  const user = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  
  useEffect(() => {
    user ? setLoginTxt(<AdminCircle user={user} />) : setLoginTxt("Login");
  }, [user]);

  const handleHamClick = () => {
    navbar.current.classList.toggle("header__nav--close");
  };
  const handleLoginClick = () => {
    if (user) {
      setLoginTxt("Login");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("cart");
      dispatch(setCurrentUser(null));
      dispatch(resetCart());
      navigation("/");
    } else {
      navigation("/login");
    }
  };

  return (
    <header className="header">
      <div className="header_logo_username_container">
        {" "}
        <NavLink className="header__logo-navlink" to="/">
          <h1 className="header__logo">
            <img src="./images/logo.png" alt="main logo" />
          </h1>
        </NavLink>
      </div>
      <i
        onClick={handleHamClick}
        className="fa-solid fa-bars header__menu-ham"
      ></i>
      <nav ref={navbar} className="header__nav header__nav--close">
        <ul className="header__list">
          <div className="header__item mega-menu header__navlink">
            <div className="mega-menu__item mega-menu__trigger">
              <div>
                <p>Explorar</p>
              </div>

              <div className="mega-menu__content">
                <li className="header__item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "header__navlink active-link"
                        : "header__navlink"
                    }
                    to="/"
                  >
                    <p>Inicio</p>
                  </NavLink>
                </li>
                <li className="header__item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "header__navlink active-link"
                        : "header__navlink"
                    }
                    to="/search"
                  >
                    <p>Buscar</p>
                  </NavLink>
                </li>
                <li className="header__item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "header__navlink active-link"
                        : "header__navlink"
                    }
                    to="/products"
                  >
                    <p>Todos los productos</p>
                  </NavLink>
                </li>

                <li className="header__item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "header__navlink active-link"
                        : "header__navlink"
                    }
                    to="/services"
                  >
                    <p>Todos los servicios</p>
                  </NavLink>
                </li>
              </div>
            </div>
          </div>

          <div className="header__item mega-menu header__navlink">
            <div className="mega-menu__item mega-menu__trigger">
              <div>
                <p>Acerca</p>
              </div>

              <div className="mega-menu__content">
                <li className="header__item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "header__navlink active-link"
                        : "header__navlink"
                    }
                    to="/contact"
                  >
                    <p>Contactanos</p>
                  </NavLink>
                </li>
                <li className="header__item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "header__navlink active-link"
                        : "header__navlink"
                    }
                    to="/about"
                  >
                    <p>Acerca de nosotros</p>
                  </NavLink>
                </li>
                <li className="header__item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "header__navlink active-link"
                        : "header__navlink"
                    }
                    to="/faq"
                  >
                    <p>Preguntas frecuentes</p>
                  </NavLink>
                </li>
              </div>
            </div>
          </div>

          <div className="header__item mega-menu header__navlink">
            <div className="mega-menu__item mega-menu__trigger">
              <div>
                <li className="header__item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "header__navlink active-link"
                        : "header__navlink"
                    }
                  >
                    <p>{loginTxt}</p>
                  </NavLink>
                </li>
              </div>

              <div className="mega-menu__content">
                {user != null && (
                  <>

                    <li className="header__item">
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "header__navlink active-link"
                            : "header__navlink"
                        }
                        to="/admin/analitycs"
                      >
                        <p>Panel</p>
                      </NavLink>
                    </li>
                    <li className="header__item">
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "header__navlink active-link"
                            : "header__navlink"
                        }
                        to="/profile"
                      >
                        <p>Editar perfil</p>
                      </NavLink>
                    </li>
                    <li className="header__item">
                      <NavLink
                        className={"header__navlink"}
                        onClick={handleLoginClick}
                      >
                        <p>Cerrar sesión</p>
                      </NavLink>
                    </li>
                  </>
                )}
              </div>
            </div>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default AdminNavBar;
