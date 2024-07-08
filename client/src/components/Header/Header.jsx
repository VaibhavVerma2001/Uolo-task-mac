import React from 'react';
import './header.css';
import logo from '../../static/image1.png';
import Img2 from '../../static/image2.png';
import downArrow from '../../static/downArrow.png';
import { Link } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import SuccessModal from '../SuccessModal/SuccessModal';

function Header() {
    const [showModal, setShowModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div className='header'>
            <Link to={'/'} className='link'>
                <div className="left">
                    <img src={logo} alt="logo-img" />
                </div>
            </Link>


            <div className="right">
                <img src={Img2} alt="" />
                <div className="inner">
                    <span className='text'>Vaibhav</span>
                    <img className='arrow' src={downArrow} alt="arrow" aria-describedby={id} variant="contained" onClick={handleClick} />
                </div>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Typography sx={{ p: 1, cursor : "pointer", }} onClick = {()=> setShowModal(true)}>Logout</Typography>
                </Popover>

            </div>
            {showModal && <SuccessModal message={"You have been successfully logout"} setShowModal={setShowModal} />}
        </div>
    )
}

export default Header;
