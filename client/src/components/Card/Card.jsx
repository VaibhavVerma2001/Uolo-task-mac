import React from 'react';
import './card.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Card(props) {

    const { user,handleDelete } = props;
    return (
        <div className='card'>
            <DeleteForeverIcon className='icon' onClick = {() => handleDelete(user.id)}/>

            <img src={user.img} alt="user-pic" />

            <p>{user.name}</p>
            <p className="email">{user.email}</p>
        </div>
    )
}

export default Card;
