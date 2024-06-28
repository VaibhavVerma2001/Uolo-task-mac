import React from 'react';
import './header.css';
import logo from '../../static/image1.png';
import Img2 from '../../static/image2.png';
import downArrow from '../../static/downArrow.png';
import { Link } from 'react-router-dom';

function Header() {
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
                    <img className='arrow' src={downArrow} alt="" />

                </div>

            </div>
        </div>
    )
}

export default Header;
