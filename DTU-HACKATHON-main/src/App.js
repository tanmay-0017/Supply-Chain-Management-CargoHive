import React, { useState, useEffect } from 'react';
import './app.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/Sign-up';

function App() {

  return (

    <div className="App">

      <Router>

        <Navbar />

        <Routes>
          <Route exact
            path="/"
            element={<Home />}
          ></Route>
          <Route exact
            path="/services"
            element={<Services />}
          ></Route>
          <Route exact
            path="/Products"
            element={<Products />}
          ></Route>
          <Route exact
            path="/Sign-up"
            element={<SignUp />}
          ></Route>
        </Routes>

      </Router>

    </div>
  );
}

export default App;
