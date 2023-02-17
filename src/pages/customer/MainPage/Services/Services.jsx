import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Service from "./Service/Service";
import { getAllProducts } from "../../../../helpers/products/getAllProducts";
import "./Services.scss";

import { motion } from "framer-motion";

import Loading from "../../../../components/Loading";
import { NavLink } from "react-router-dom";

const Services = ({ t }) => {
  const elementAnimate = {
    offscreen: { y: 30, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.6, duration: 3 },
    },
  };

  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const responseProducts = await Promise.resolve(getAllProducts());
    setProducts(
      responseProducts.filter(
        (product) => product.type === "SERVICE" && product.status === true
      )
    );
    setIsLoading(false);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <motion.section
      className="services_container"
      initial={"offscreen"}
      whileInView={"onscreen"}
      viewport={{ once: false, amount: 0.3 }}
      variants={elementAnimate}
    >
      <h2 className="services_container_title heading">
        {t("service-main.title")}
      </h2>
      <p className="products_container_text">
        Aquí encontrarás una selección de los servicios más populares y de alta
        calidad en el mercado de la telefonía móvil, puedes elegir el que mejor
        se adapte a tus necesidades.
      </p>
      <div className="services_main">
        {products.map((item, index) => (
          <Service item={item} key={index} />
        ))}
      </div>
      <NavLink className={"view_more"} to="/services">
        Ver más <i class="fa-solid fa-arrow-right"></i>{" "}
      </NavLink>
      <div className="spacer layer10"></div>
    </motion.section>
  );
};

export default Services;
