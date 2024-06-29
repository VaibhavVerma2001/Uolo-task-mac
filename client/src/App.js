import React, { useContext } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Create from './pages/Create/Create';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from './pages/Error/Error';
import UserContext from './context/UserContext';
import Loading from './components/Loading/Loading';

function App() {
  const context = useContext(UserContext);
  const { loading } = context;

  return (
    <div className='app'>
      <Router>

        <Header />

        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="*" element={<Error />} />
          </Routes>
        )}




      </Router>
    </div>
  )
}

export default App;
