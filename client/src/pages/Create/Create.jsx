import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Profile from '../../components/CreateProfile/CreateProfile';
import './create.css';
import Header from '../../components/Header/Header';

function Create() {
  return (
    <div>
      <Header />
      <div className='create'>
        <Navbar />
        <Profile />
      </div>
    </div>

  )
}

export default Create;
