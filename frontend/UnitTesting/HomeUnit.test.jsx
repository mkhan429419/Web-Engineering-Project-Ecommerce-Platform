import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../src/pages/Home'; // Adjust the import for the `Home` component

// Mock child components to isolate tests
jest.mock('../src/Components/Hero', () => {
  const MockHero = () => <div data-testid="hero">Hero Component</div>;
  MockHero.displayName = 'Hero';
  return MockHero;
});

jest.mock('../src/Components/LatestCollection', () => {
  const MockLatestCollection = () => <div data-testid="latest-collection">Latest Collection Component</div>;
  MockLatestCollection.displayName = 'LatestCollection';
  return MockLatestCollection;
});

jest.mock('../src/Components/BestSelling', () => {
  const MockBestSelling = () => <div data-testid="best-selling">Best Selling Component</div>;
  MockBestSelling.displayName = 'BestSelling';
  return MockBestSelling;
});

jest.mock('../src/Components/NewsLetter', () => {
  const MockNewsLetter = () => <div data-testid="newsletter">NewsLetter Component</div>;
  MockNewsLetter.displayName = 'NewsLetter';
  return MockNewsLetter;
});

describe('Home Page', () => {
  test('renders the Home page with all components', () => {
    render(<Home />);

    // Check if all components are rendered
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('latest-collection')).toBeInTheDocument();
    expect(screen.getByTestId('best-selling')).toBeInTheDocument();
    expect(screen.getByTestId('newsletter')).toBeInTheDocument();
  });
});
