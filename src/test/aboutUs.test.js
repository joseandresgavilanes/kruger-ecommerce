import React from 'react';
import { render } from '@testing-library/react';
import AboutUs from '../pages/customer/AboutUs/AboutUs';
import '@testing-library/jest-dom/extend-expect';
describe("AboutUs", () => {
test('renders AboutUs component', () => {
  const { getByText } = render(<AboutUs />);
  const titleElement = getByText(/José Andrés Gavilanes/i);
  expect(titleElement).toBeInTheDocument();
});

it('AboutUs component has the correct class', () => {
    const { container } = render(<AboutUs />);
    const element = container.firstChild;
    expect(element).toHaveClass('aboutus');
  });


  it("displays the developer's image", () => {
    const { getByAltText } = render(<AboutUs />);
    const image = getByAltText(/Developer image1/i);
    expect(image).toBeInTheDocument();
  });
});
  
   
 
 





