import axios from "axios";
import "./comparacion.scss";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../../helpers/products/getAllProducts";
import { Dropdown } from "primereact/dropdown";
import { phones } from "../../../api/mobileApi/mobileApi";
import { func } from "prop-types";

const Comparacion = () => {
  const [list, setList] = useState([]);
  const [cel1, setCel1] = useState();
  const [cel2, setCel2] = useState();
  const [searchedItems1, setSErachedItems1] = useState();
  const [searchedItems2, setSErachedItems2] = useState();
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const test = phones();
    console.log(test);
    setList(test);
  };
  function onPhone1Selected(e) {
    setCel1(e.target.value);
  }
  function onPhone2Selected(e) {
    setCel2(e.target.value);
  }
  function handleOnChange(e) {
    console.log(e.target.name);
    switch (e.target.name) {
      case "phone1":
        searchItemsPhone(e.target.value, setSErachedItems1);
        break;
      case "phone2":
        searchItemsPhone(e.target.value, setSErachedItems2);
        break;
    }
  }
  const searchItemsPhone = (value, setArr) => {
    if (value == "") {
      setArr(null);
      return;
    }
    const results = list.filter((it) =>
      it.Model.toLowerCase().includes(value.toLowerCase())
    );

    setArr(results);
  };

  return (
    <div className="comparison">
      <h2>
        <span>Comparación </span>
        de Teléfonos
      </h2>
      <div className="choose-phone-cont">
        <div className="phone1-cont">
          <p>Elige un teléfono:</p>
          <Dropdown
            options={list ? list : []}
            optionLabel="Model"
            placeholder="Elige teléfono"
            onChange={(e) => {
              onPhone1Selected(e);
            }}
            value={cel1}
          />
          <div className="input-search-result-cont">
            <input
              name="phone1"
              placeholder="Busca un modelo de telefono"
              type="text"
              onChange={handleOnChange}
              className="input"
            />

            {searchedItems1 != null ? (
              <div className="searchResults-cont">
                {searchedItems1.map((item) => (
                  <div
                    key={item.id}
                    className="search-result-item"
                    onClick={() => {
                      setCel1(item);
                      setSErachedItems1(null);
                    }}
                  >
                    {item?.Model}
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="phone2-cont">
          <p>Elige un teléfono:</p>
          <Dropdown
            options={list ? list : []}
            optionLabel="Model"
            placeholder="Elige teléfono"
            onChange={(e) => {
              onPhone2Selected(e);
            }}
            value={cel2}
          />
          <div className="input-search-result-cont">
            <input
              name="phone2"
              placeholder="Busca un modelo de telefono"
              type="text"
              onChange={handleOnChange}
              className="input"
            />
            {searchedItems2 != null ? (
              <div className="searchResults-cont">
                {searchedItems2.map((item) => (
                  <div
                    key={item.id}
                    className="search-result-item"
                    onClick={() => {
                      setCel2(item);
                      setSErachedItems2(null);
                    }}
                  >
                    {item?.Model}
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="container-general">
        <div>
          <h6>Primer teléfono</h6>

          <table>
            <tr>
              <th>Modelo</th>
              <td>{cel1?.Model ? cel1.Model : ""}</td>
            </tr>
            <tr>
              <th>Sistema operativo</th>
              <td>{cel1?.OS ? cel1.OS : ""}</td>
            </tr>
            <tr>
              <th>Memoria RAM</th>
              <td>{cel1?.RAM ? cel1.RAM : ""}</td>
            </tr>
            <tr>
              <th>Almacenamiento interno</th>
              <td>
                {cel1?.["Storage capacity"] ? cel1["Storage capacity"] : ""}
              </td>
            </tr>
            <tr>
              <th>CPU</th>
              <td>{cel1?.CPU ? cel1.CPU : ""}</td>
            </tr>
          </table>
        </div>
        <div>
          <h6>Segundo teléfono</h6>
          <table>
            <tr>
              <th>Modelo</th>
              <td>{cel2?.Model ? cel2.Model : ""}</td>
            </tr>
            <tr>
              <th>Sistema operativo</th>
              <td>{cel2?.OS ? cel2.OS : ""}</td>
            </tr>
            <tr>
              <th>Memoria RAM</th>
              <td>{cel2?.RAM ? cel2.RAM : ""}</td>
            </tr>
            <tr>
              <th>Almacenamiento interno</th>
              <td>
                {cel2?.["Storage capacity"] ? cel2["Storage capacity"] : ""}
              </td>
            </tr>
            <tr>
              <th>CPU</th>
              <td>{cel2?.CPU ? cel2.CPU : ""}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Comparacion;
