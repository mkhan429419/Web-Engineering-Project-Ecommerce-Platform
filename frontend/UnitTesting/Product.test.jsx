import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ShopContext } from '../src/context/ShopContext'; 
import Product from '../src/pages/Product'; 

// Mock useParams to simulate a URL parameter
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ ProductId: '1' }),
}));

describe('Product Page', () => {
  const mockContextValue = {
    products: [
      {
        _id: '1',
        title: 'Test Product',
        description: 'This is a test product description.',
        price: '99.99',
        sizes: ['S', 'M', 'L'],
        category: 'Category1',
        image: '/test-image.jpg',
      },
    ],
    curr: 'Rs',
    addingAnItemToTheCart: jest.fn(),
  };

  test('renders product details correctly', () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <Product />
        </BrowserRouter>
      </ShopContext.Provider>
    );

    // Check if product title is rendered
    expect(screen.getByTestId('product-title')).toHaveTextContent('Test Product');

    // Check if product description is rendered
    expect(screen.getByTestId('product-description')).toHaveTextContent('This is a test product description.');

    // Check if similar products section is rendered
    expect(screen.getByTestId('similar-products')).toBeInTheDocument();
  });

  test('renders all available sizes as buttons', () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <Product />
        </BrowserRouter>
      </ShopContext.Provider>
    );

    // Check if all sizes are rendered as buttons
    mockContextValue.products[0].sizes.forEach((size) => {
      const sizeButton = screen.getByTestId(`size-button-${size}`);
      expect(sizeButton).toBeInTheDocument();
      expect(sizeButton).toHaveTextContent(size);
    });
  });

  test('renders loading state correctly', () => {
    const mockContextWithEmptyProducts = { ...mockContextValue, products: [] };

    render(
      <ShopContext.Provider value={mockContextWithEmptyProducts}>
        <BrowserRouter>
          <Product />
        </BrowserRouter>
      </ShopContext.Provider>
    );

    // Check if the loading message is displayed
    expect(screen.getByText('Loading product details...')).toBeInTheDocument();
  });
});
