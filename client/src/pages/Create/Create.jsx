import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Profile from '../../components/CreateProfile/CreateProfile';
import './create.css';

function Create() {
  return (
    <div>
      <div className='create'>
        <Navbar />
        <Profile />
      </div>
    </div>

  )
}

export default Create;
