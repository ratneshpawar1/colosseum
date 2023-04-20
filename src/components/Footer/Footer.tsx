import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <div
    style={{
      margin: '1em',
      paddingBottom: '1em',
      fontSize: '18px',
      color: 'white',
    }}
  >
    <Link style={{ color: 'white' }} to="/terms"></Link>

    <Link style={{ color: 'white' }} to="/privacy"></Link>

    <Link style={{ color: 'white' }} to="/faq"></Link>
  </div>
);
