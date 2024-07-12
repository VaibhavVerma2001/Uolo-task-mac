import React, {useContext} from 'react';
import './header.css';
import logo from '../../static/image1.png';
import Img2 from '../../static/image2.png';
import downArrow from '../../static/downArrow.png';
import { Link } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import SuccessModal from '../shared/SuccessModal/SuccessModal';
import UserContext from '../../context/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
    const [showModal, setShowModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const context = useContext(UserContext);
    const {setUser} = context;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        setAnchorEl(null);
        setShowModal(true);
        // after 2.5 seconds delete use from local storage and navigate to login
        setTimeout(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            setUser(null);
            setShowModal(false);
        }, 2500);

    }

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
                    <Typography sx={{ p: 1, cursor: "pointer", }} onClick={() => handleLogOut()}> <LogoutIcon/> Logout</Typography>
                </Popover>

            </div>
            {showModal && <SuccessModal message={"You have been successfully logout"} setShowModal={setShowModal} />}
        </div>
    )
}

export default Header;
