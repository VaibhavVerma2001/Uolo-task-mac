import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Create from './pages/Create/Create';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function App() {
  return (
    <div className='app'>
      <Router>

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>


      </Router>
    </div>
  )
}

export default App;
