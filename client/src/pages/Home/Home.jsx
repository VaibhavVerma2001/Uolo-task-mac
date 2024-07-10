import React from 'react';
import './home.css';
import Navbar from '../../components/Navbar/Navbar';
import Main from '../../components/Main/Main';
import Header from '../../components/Header/Header';

function Home() {
  return (
    <div>
      <Header />
      <div className='home'>
        <Navbar />
        <Main />
      </div>
    </div>

  )
}

export default Home
