import React, {useState} from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Popover } from '@material-ui/core';
import getUser from '../../APIService/GetUser';
function CardComment(props) {
    const user=getUser();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const idPopover = open ? 'simple-popover' : undefined;
    const {data: {ownerId, ownerName, message, id, ownerAvatar}} = props;
    return (
        <CardHeader
            avatar={
                <Avatar aria-label="recipe" src={ownerAvatar}/>
            }
            action={
                ownerId===user.id&&
                <IconButton aria-label="settings">
                    <Popover
                        id={idPopover}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <button className='btn-nor' onClick={props.deleteComment}>Delete</button>
                    </Popover>
                    <MoreVertIcon onClick={handleClick} />
                </IconButton>
            }
            className='h-c-c'
            title={ownerName}
            subheader={message}
        />
    );
}

export default CardComment;