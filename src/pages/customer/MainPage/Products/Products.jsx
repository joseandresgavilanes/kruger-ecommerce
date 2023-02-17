import React, { useEffect, useState } from "react";
import Product from "./Product/Product";
import "./Products.scss";
import { productsData } from "./dummy";
import { getAllProducts } from "../../../../helpers/products/getAllProducts";
import Loading from "../../../../components/Loading";
import { NavLink } from "react-router-dom";
const Products = ({ t }) => {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const responseProducts = await Promise.resolve(getAllProducts());
    setProducts(
      responseProducts.filter(
        (product) => product.type === "PRODUCT" && product.status === true
      )
    );
    setIsLoading(false);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <section className="products_container">
      <h2 className="heading">{t("phones-main.title")}</h2>
      <p className="products_container_text">
        Aquí encontrarás una selección de los dispositivos más populares y
        avanzados del mercado, para que puedas elegir el que mejor se adapte a
        tus necesidades.
      </p>
      <section className="products_main">
        {products.map((item, i) => (
          <Product item={item} i={i} key={i} />
        ))}
      </section>
      <NavLink className={"view_more"} to="/products">
        Ver más <i class="fa-solid fa-arrow-right"></i>{" "}
      </NavLink>
    </section>
  );
};

export default Products;
