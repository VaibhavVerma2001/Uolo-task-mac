import React from 'react';
import img from '../../static/server_error.png'
import './serverError.css';

function ServerError() {
    const myStyle = {
        color: "grey",
        fontSize: "16px",
        marginTop: "-30px"
    }
    return (
        <div className='server-error'>
            <img className='vert-move' src={img} alt="server-error" />
            <span style={myStyle}>Internal Server Error!</span>
        </div>
    );
}

export default ServerError;
