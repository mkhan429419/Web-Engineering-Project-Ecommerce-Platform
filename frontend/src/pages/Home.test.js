import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home'; // Adjust the path as needed

// Mock child components to isolate testing
jest.mock('../Components/Hero', () => () => <div>Hero Component</div>);
jest.mock('../Components/LatestCollection', () => () => <div>Latest Collection Component</div>);
jest.mock('../Components/BestSelling', () => () => <div>Best Selling Component</div>);
jest.mock('../Components/NewsLetter', () => () => <div>NewsLetter Component</div>);

describe('Home Component', () => {
  test('renders all child components', () => {
    render(<Home />);

    // Assert that each child component is rendered
    expect(screen.getByText('Hero Component')).toBeInTheDocument();
    expect(screen.getByText('Latest Collection Component')).toBeInTheDocument();
    expect(screen.getByText('Best Selling Component')).toBeInTheDocument();
    expect(screen.getByText('NewsLetter Component')).toBeInTheDocument();
  });
});
