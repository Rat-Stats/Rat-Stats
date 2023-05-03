import { render, screen } from '@testing-library/react';
import App from './App.jsx';
const expect = require('chai').expect;
const chai = require('chai');

test('renders react app', () => {
  render(<App />);
  const linkEle = screen.getByText(/I rendered/i);
  expect(linkEle).to.exist;
})