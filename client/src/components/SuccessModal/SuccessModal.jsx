import React from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../../static/success.gif';
import './successmodal.css';

function SuccessModal(props) {
    return (
        <Modal className='success-modal'
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className="img-con">
                <img src={img} />
                <span>User has been created successfully.</span>
            </div>

        </Modal>
    )
}

export default SuccessModal;
