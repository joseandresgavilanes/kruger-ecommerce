import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "../components/Loading";
import '@testing-library/jest-dom/extend-expect';



//Prueba si el componente Loading se renderiza sin errores
describe("Loading component", () => {
  test("renders without crashing", () => {
    const { container } = render(<Loading />);
    expect(container).toBeInTheDocument();
  });

  //Prueba si el componente Loading renderiza el texto 'Loading'
  test("renders the loading text", () => {
    const { getByText } = render(<Loading />);
    expect(getByText(/Loading/)).toBeInTheDocument();
  });
//Prueba si el componente renderiza 7 circulos
  test("renders the correct number of circles", () => {
    const { container } = render(<Loading />);
    expect(container.querySelectorAll("circle").length).toBe(7);
  });
});