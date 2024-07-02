import React from 'react';
import img from '../../static/server_error.png'

function ServerError() {
    const myStyle = {
        color: "grey",
        fontSize: "14px",
        marginTop: "-30px"
    }
    return (
        <div className='error'>
            <img className='vert-move' src={img} alt="server-error" />
            <span style={myStyle}>Internal Server Error!</span>
        </div>
    );
}

export default ServerError;
