import React from "react";
import { NavLink, MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "../ui/Footer/Footer";
import '@testing-library/jest-dom/extend-expect';

describe("Footer component", () => {



//Prueba si ek component Footer se renderiza correctamente y muestra los textos 
  test("renders Footer component", () => {
    const { getByText } = render(<MemoryRouter>
        <Footer />
      </MemoryRouter>);
    expect(getByText("Inicio")).toBeInTheDocument();
    expect(getByText("Productos")).toBeInTheDocument();
    expect(getByText("Descubre el poder de la tecnología con nuestra amplia selección de dispositivos de última generación"))
    .toBeInTheDocument();
  });

//Prueba si el componente Footer se renderiza 12 links
  it("renders the correct number of navigation links", () => {
    render(<MemoryRouter>
        <Footer />
      </MemoryRouter>);
    const navLinks = screen.getAllByRole("link");
    expect(navLinks).toHaveLength(12);
  });
//Prueba si el componente Footer se dirige al path /about un segundo despues de presionar Sobre Nosotros
  test("clicking on a NavLink triggers the expected action", () => {
    const { getByText } = render(<MemoryRouter>
        <Footer />
      </MemoryRouter>);
    fireEvent.click(getByText("Sobre Nosotros"));
    setTimeout(()=>{
        expect(window.location.pathname).toBe("/about");
    },1000)
    
  });
});
