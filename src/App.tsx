import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from './components/nav-bar/NavBar';
import Layout from './components/layout/Layout';

import { getCurrentTheme } from './store/themeSlice';

import './App.css';

const App = () => {
  const theme = useSelector(getCurrentTheme);

  return (
    <div data-theme={theme}>
      <NavBar />
      <Layout />
    </div>
  );
}

export default App;
