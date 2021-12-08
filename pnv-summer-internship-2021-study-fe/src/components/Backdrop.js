import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
}));
function BackdropEffect(props) {
    const classes = useStyles();
    const {openBackdrop}=props;
    return (
        <Backdrop className={classes.backdrop} open={openBackdrop}>
            <CircularProgress color="secondary" />
        </Backdrop>
    );
}

export default BackdropEffect;