import React from 'react';
import img from '../../../static/success.gif';
import './successmodal.css';

function SuccessModal({setShowModal,message}) {
    
    return (
        <div className= 'success-modal' onClick={() => setShowModal(false)}>
            <div className="modal-content">
                <img src={img} alt="Success" />
                <span>{message}</span>
            </div>
        </div>
    )
}

export default SuccessModal;
