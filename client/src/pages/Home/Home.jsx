import React from 'react';
import './home.css';
import Navbar from '../../components/Navbar/Navbar';
import Main from '../../components/Main/Main';

function Home() {
  return (
    <div>
      <div className='home'>
        <Navbar />
        <Main />
      </div>
    </div>

  )
}

export default Home
