import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ModelPopUpSizeEnum } from "../../core/Enum";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const ConfirmModelPopUp = (props) => {
    console.log(props.children)
    const { showControl, open, size, header, message, onClose, btnCloseText, onConfirm, btnSuccessText, cssClass,customerDetail } = props;
    return <Dialog className={size == ModelPopUpSizeEnum.Small ? "smallpopup " + cssClass : cssClass}
        open={open}
        fullScreen={size == ModelPopUpSizeEnum.Large}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        aria-describedby="customized-dialog-title-description">
        {showControl &&
            <React.Fragment>
          <IconButton style={{position:'absolute',right:'0'}} edge="start" color="inherit" onClick={onClose} >
            <CloseIcon />
          </IconButton>
                <DialogTitle id="customized-dialog-title" classes={{ root: 'smpopuphead' }}>
                    {header}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions classes={{ root: 'actionbuttonarea', action: 'actionbutton' }}>
                    <Button aria-label="click here to close" onClick={onClose} color="secondary">
                        {btnCloseText}
                    </Button>
                    <Button aria-label="click here to success" onClick={() => onConfirm(customerDetail)} color="secondary">{btnSuccessText}</Button>
                </DialogActions>
            </React.Fragment>
        }
        {props.children}
    </Dialog>
}

export default ConfirmModelPopUp;