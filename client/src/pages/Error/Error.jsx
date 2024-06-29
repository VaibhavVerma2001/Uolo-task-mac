import React from 'react';
import './error.css';
import img from '../../static/error404.png';

function Error() {
  return (
    <div className='error'>
      <img className='vert-move' src={img} alt="404-not-found" />
    </div>
  )
}

export default Error;
