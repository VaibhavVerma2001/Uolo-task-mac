import React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import Create from './pages/Create/Create';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from './pages/Error/Error';
import Login from './pages/Login/Login';

function App() {

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
        
      </Router>
    </div>
  )
}

export default App;
