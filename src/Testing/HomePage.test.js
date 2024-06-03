import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';  // Import jest-dom for assertions
import App from '../App';
import { MemoryRouter } from 'react-router-dom';


describe('App', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: MemoryRouter });
  };

  test('renders Homepage component at root path', () => {
    renderWithRouter(<App />, { route: '/' });
    expect(screen.getByText(/FitForm/i)).toBeInTheDocument();
  });
});
