import React, { useState, useEffect } from 'react';
import './card.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';
import imgLoader from '../../static/image_loader2.gif';

function Card(props) {
    const { user, handleDelete } = props;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = user.imgUrl;
        img.onload = () => setIsLoading(false);
    }, [user.imgUrl]);

    return (
        <div className='my-card'>
            <Tooltip title="Delete" placement="left" slotProps={{
                popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, -10],
                            },
                        },
                    ],
                },
            }}>
                <DeleteForeverIcon className='icon' onClick={() => handleDelete(user._id)} />
            </Tooltip>

            {isLoading ? (
                <img src= {imgLoader} style={{objectFit:"contain"}} alt="user-pic" />
            ) : (
                <img src={user.imgUrl} alt="user-pic" />
            )}

            <p>{user.name}</p>
            <p className="email">{user.email}</p>
        </div>
    );
}

export default Card;
