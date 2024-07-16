import React from 'react';
import './error.css';
import img from '../../static/error404.png';

function Error() {
  return (
    <div className='error-container'>
      <img className='vert-move' src={img} alt="404-not-found" />
      <span className='err-text'>404 Page Not Found!</span>
    </div>
  )
}

export default Error;
