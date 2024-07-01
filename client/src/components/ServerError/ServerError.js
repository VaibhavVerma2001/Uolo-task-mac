import React from 'react';
import img from '../../static/server_error.png'

function ServerError() {
    return (
        <div className='error'>
            <img className='vert-move' src={img} alt="server-error" />
        </div>
    )
}

export default ServerError;
