import "./Support.scss";

const Support = () => {
  return (
    <div className="support">
      <h2 className="heading">¿Necesitas Ayuda?</h2>
      <div className="support_img">
        <img src="./images/support.svg" alt="IT support" className="floating" />
      </div>

      <div className="support_cards">
        <div className="card floating">
          <div className="card-top-part">
            <div className="left-part">
              <div className="user-name">
                <p className="name">José Andrés Gavilanes</p>
                <p className="role"> manager </p>
              </div>
              <div className="user-position">
                <p className="position">Delivery Manager</p>
              </div>
            </div>
            <div className="right-part">
              <div className="user-photo">
                <img
                  src="https://avatars.githubusercontent.com/u/76002851?v=4"
                  className="photo"
                  alt="IT supporter img"
                />
              </div>
            </div>
          </div>
          <div className="card-bottom-part">
            <div className="bottom-part">
              <a href="mailto: krugercell@example.com" className="link">
                <span className="icon">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                Email
              </a>
            </div>
            <div className="bottom-part">
              <a
                href="https://wa.me/+593995426348?text=Hola%20quisiera%20obtener%20ayuda%20con%20respecto%20a%20la%20entrega%20de%20mi%orden... "
                target="_blank"
                className="link"
              >
                <span className="icon">
                  <i className="fa-solid fa-phone-flip"></i>
                </span>
                Whatsapp
              </a>
            </div>
          </div>
        </div>
        <div className="card floating">
          <div className="card-top-part">
            <div className="left-part">
              <div className="user-name">
                <p className="name">Kenan Al-jaber</p>
                <p className="role"> manager </p>
              </div>
              <div className="user-position">
                <p className="position">Payment Manager</p>
              </div>
            </div>
            <div className="right-part">
              <div className="user-photo">
                <img
                  src="https://avatars.githubusercontent.com/u/52118245?v=4"
                  className="photo"
                  alt="IT supporter img 2"
                />
              </div>
            </div>
          </div>
          <div className="card-bottom-part">
            <div className="bottom-part">
              <a href="mailto: krugercell@example.com" className="link">
                <span className="icon">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                Email
              </a>
            </div>
            <div className="bottom-part">
              <a
                href="https://wa.me/+593999723294?text=Hola%20quisiera%20obtener%20ayuda%20con%20respecto%20al%20pago%20de%20mi%20orden... "
                target="_blank"
                className="link"
              >
                <span className="icon">
                  <i className="fa-solid fa-phone-flip"></i>
                </span>
                Whatsapp
              </a>
            </div>
          </div>
        </div>
        <div className="card floating">
          <div className="card-top-part">
            <div className="left-part">
              <div className="user-name">
                <p className="name">Kevin Mantilla G</p>
                <p className="role"> manager </p>
              </div>
              <div className="user-position">
                <p className="position">IT supporter</p>
              </div>
            </div>
            <div className="right-part">
              <div className="user-photo">
                <img
                  src="https://avatars.githubusercontent.com/u/33032880?v=4"
                  className="photo"
                  alt="IT supporter img 3"
                />
              </div>
            </div>
          </div>
          <div className="card-bottom-part">
            <div className="bottom-part">
              <a href="mailto: krugercell@example.com" className="link">
                <span className="icon">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                Email
              </a>
            </div>
            <div className="bottom-part">
              <a
                href="https://wa.me/+593986261197?text=Hola%20quisiera%20obtener%20ayuda%20con%20respecto%20a%20%un%20problema%20tecnico "
                target="_blank"
                className="link"
              >
                <span className="icon">
                  <i className="fa-solid fa-phone-flip"></i>
                </span>
                Whatsapp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
