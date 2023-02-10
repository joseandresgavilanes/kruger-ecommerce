import React from "react";
import "./TranslationChanger.scss";

const TranslationChanger = ({ i18n, t }) => {
  return (
    <div className="translate_main">
      <div className="translate_main_text">{t("welcome-main.text1")}</div>{" "}
      <div className="translate_main_btns">
        <div
          className="translate_main_item"
          onClick={() => i18n.changeLanguage("es")}
        >
          <img
            className="translate_main_img"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1200px-Bandera_de_Espa%C3%B1a.svg.png"
            alt="spanish flag"
          />
        </div>
        <div
          className="translate_main_item"
          onClick={() => i18n.changeLanguage("en")}
        >
          <img
            className="translate_main_img"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"
            alt="usa glad"
          />
        </div>
        <div
          className="translate_main_item"
          onClick={() => i18n.changeLanguage("de")}
        >
          <img
            className="translate_main_img"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png"
            alt="germany flag"
          />
        </div>

        <div
          className="translate_main_item"
          onClick={() => i18n.changeLanguage("fr")}
        >
          <img
            className="translate_main_img"
            src="https://preview.redd.it/uwh91lynuuz31.png?auto=webp&s=0a5c44ba47d471690cad5039d5bc2f409d979ac0"
            alt="france flag"
          />
        </div>
      </div>
      <div className="translate_main_text">{t("welcome-main.text2")}</div>
    </div>
  );
};

export default TranslationChanger;
