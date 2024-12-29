import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../src/pages/Login';
import { ShopContext } from '../src/context/ShopContext';


const mockContext = {
  token: null,
  setToken: jest.fn(),
  navigate: jest.fn(),
  backendUrl: '', 
};

const renderWithContext = (ui) =>
  render(
    <ShopContext.Provider value={mockContext}>{ui}</ShopContext.Provider>
  );

describe('Login Component Display Tests', () => {
    it('renders the Login form with email and password fields', () => {
        renderWithContext(<Login />);
      
       
        const loginHeader = screen.getByRole('heading', { name: /login/i });
        expect(loginHeader).toBeInTheDocument();
      
        
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      
        
        const loginButton = screen.getByRole('button', { name: /login/i });
        expect(loginButton).toBeInTheDocument();
      });
  it('renders the Sign Up form when toggled', () => {
    renderWithContext(<Login />);
  
    
    fireEvent.click(screen.getByText(/create account/i));
  
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  
    
    const signUpHeader = screen.getByRole('heading', { name: /sign up/i });
    expect(signUpHeader).toBeInTheDocument();
  
    
    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    expect(signUpButton).toBeInTheDocument();
  });

  it('toggles between Login and Sign Up forms', () => {
    renderWithContext(<Login />);
  
    
    const loginHeader = screen.getByRole('heading', { name: /login/i });
    expect(loginHeader).toBeInTheDocument();
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
  
    
    fireEvent.click(screen.getByText(/create account/i));
  
    const signUpHeader = screen.getByRole('heading', { name: /sign up/i });
    expect(signUpHeader).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  
    
    fireEvent.click(screen.getByText(/login/i));
    expect(loginHeader).toBeInTheDocument();
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
  });
  

  it('displays the "Forgot Password?" link', () => {
    renderWithContext(<Login />);

    
    expect(screen.getByText(/forgot password\?/i)).toBeInTheDocument();
  });

  it('renders the form button with the correct label', () => {
    renderWithContext(<Login />);

    
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

    
    fireEvent.click(screen.getByText(/create account/i));
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });
});

