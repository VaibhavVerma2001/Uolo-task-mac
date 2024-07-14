import React from 'react';
import img from '../../../static/success.gif';
import session from '../../../static/session-expired.png'
import './successmodal.css';

function SuccessModal({setShowModal,message}) {
    
    return (
        <div className= 'success-modal' onClick={() => setShowModal(false)}>
            <div className="modal-content">

                {message === "Token Expired, Login again to continue." ? (
                    <img className='session-img' src={session} alt="session-expired" />
                ):(
                    <img className='success-img' src={img} alt="Success" />
                )}

                
                <span>{message}</span>
            </div>
        </div>
    )
}

export default SuccessModal;
