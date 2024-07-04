import React from 'react';
import './card.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';

function Card(props) {

    const { user, handleDelete } = props;
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


            <img src={user.imgUrl} alt="user-pic" />

            <p>{user.name}</p>
            <p className="email">{user.email}</p>
        </div>
    )
}

export default Card;
