import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../../components/Loading";
import { getCompany } from "../../../helpers/company/getCompany";
import "./AboutCompany.scss";

const AboutCompany = () => {
  const [company, setCompany] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0)
    getCompanny();
  }, []);

  const getCompanny = async () => {
    const responseCompany = await Promise.resolve(getCompany());
    setCompany(responseCompany);
    console.log(responseCompany);
    setIsLoading(false);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="company">
      <h2 className="heading">Acerca de {company.companyName}</h2>
      <p className="company_description">{company.description}</p>
      <div className="company_objective">
        <div className="company_objective_info">
          <h3>
            Nuestra <span>empresa</span>
          </h3>
          <p>{company.objective}</p>
        </div>
        <div className="company_objective_container ">
          <img
            src="./images/company1.svg"
            className="floating"
            alt="image about the company"
          />
        </div>
      </div>

      <div className="company_history">
        <div className="company_history_container">
          <img
            src="./images/company2.svg"
            className="floating"
            alt="image about the company"
          />
        </div>
        <div className="company_history_info">
          <h3>
            <span>Nuestra</span> historia
          </h3>
          <p>{company.history}</p>
        </div>
      </div>

      <div className="company_socials">
        <div className="company_socials_card floating">
          <i className="fa-brands fa-facebook"></i>
          <p>Facebook</p>
        </div>
        <div className="company_socials_card floating">
          <i className="fa-brands fa-instagram"></i>
          <p>Instagram</p>
        </div>
        <div className="company_socials_card floating">
          <i className="fa-brands fa-linkedin"></i>
          <p>Linkedin</p>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
