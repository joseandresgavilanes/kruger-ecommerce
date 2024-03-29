import React from "react";
import "./MainPage.scss";
import Banner from "./Banner/Banner";
import Products from "./Products/Products";
import HomeExtras from "./HomeExtras/HomeExtras";
import WhyUs from "./WhyUs/WhyUs";
import Services from "./Services/Services";
import MainInfoHome from "./MainInfo/MainInfo";
import EncourageUser from "./EncourageUser/EncourageUser";
import ExtraCards from "./ExtraCards/ExtraCards";
import PixelArt from "./PixelArt/PixelArt";
import NewArrivals from "./NewArrivals/NewArrivals";
import { useTranslation } from "react-i18next";
import TranslationChanger from "./TranslationChanger/TranslationChanger";
import Modal from "../../../components/Modal/Modal";
import { useEffect } from "react";
import { useState } from "react";
import Partners from "./Partners/Partners";

const MainPage = () => {
  const [isModal, setIsModal] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModal(<Modal />);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const { t, i18n } = useTranslation("global");
  return (
    <div className="mainpage">
      {isModal}
      <TranslationChanger t={t} i18n={i18n} />
      <Banner t={t} />
      <MainInfoHome t={t} />
      <Products t={t} />
      <HomeExtras t={t} />
      <Services t={t} />
      <NewArrivals t={t} />
      <Partners />
      <WhyUs t={t} />
      <ExtraCards t={t} />
      <PixelArt />
      <EncourageUser t={t} />
    </div>
  );
};

export default MainPage;
