import React from 'react';
import EmptyImg from '../../static/empty_box.png';

function Empty() {
    return (
        <div className="empty">
            <img src={EmptyImg} alt="empty-img" />
            <span>No Team Members Found!</span>
            <span>Please Add Few Members To Display Records!</span>
        </div>
    )
}

export default Empty
