import React from 'react';
import './error.css';
import img from '../../static/error404.png';

function Error() {
  const myStyle = {
    color: "grey",
    fontSize: "16px",
    marginTop: "-50px"
  }
  return (
    <div className='error-container'>
      <img className='vert-move' src={img} alt="404-not-found" />
      <span style={myStyle}>404 Not Found!</span>
    </div>
  )
}

export default Error;
