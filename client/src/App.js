import React, { useContext } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import Create from './pages/Create/Create';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Error from './pages/Error/Error';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import UserContext from './context/UserContext';

function App() {
  const context = useContext(UserContext);
  const { user } = context;


  return (
    <div className='app'>
      <Router>
        {user && <Header />}
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path="/create" element={user ? <Create /> : <Navigate to='/login' />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path="*" element={<Error />} />
        </Routes>

      </Router>
    </div>
  )
}

export default App;
