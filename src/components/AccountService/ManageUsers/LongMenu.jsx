import 'date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import EditUserPopup from '../ManageUsers/EditUserPopup';
import MessageBox from "../../../shared/Views/MessageBox";
import Loader from "../../../shared/Views/Loader";
import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from "../../../core/Enum";
import RequestHelper from "../../../common/RequestHelper";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 400,
    },
    Nopad: {
        padding: 0
    }
}));

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default function LongMenu(props) {
    const { roleName, guestId, name, email, expiryDate, status } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [popupprop, setPopupprop] = React.useState(false);

    const [popupCancel, setPopupCancel] = React.useState(false);

    const messageRef = React.useRef(null);
    const [loading, setLoading] = React.useState(false);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //const handleResendActivationLink = (guestId) => {
    //    setPopupprop(false);
    //    setAnchorEl(null);
    //};

    const handleOpenCancelPopUp = () => {
        setPopupCancel(true);
        setAnchorEl(null);
    };

    const handleCloseCancelPopUp = () => {
        setPopupCancel(false);
    };

    const handleSubmitCancelPopUp = () => {
        setPopupCancel(false);
        // props.refresh();
        handleMenuClick(guestId, "EndUserAccess");
    };

    const handleMenuClick = (guestId, type) => {
        
        setLoading(true);
        let url = type == "ActivationLink"
            ? "GuestUser/resendGuestActivation"
            : "GuestUser/revokeGuestUser";
        RequestHelper.POST(
            url,
            APIURLTypeEnum.Agency,
            {
                guestId: parseInt(guestId),
            },
            (res) => {
                setLoading(false);
               
                if (res && res.status == StatusCodeEnum.OK) {
                    if (res.data) {
                        if (res.data.data) {
                            if (type != "ActivationLink") {
                                props.refresh();
                                messageRef.current.showMessage(
                                    'Guest User has been successfully Inactive.',
                                    NotificationMessageTypeEnum.Success
                                );
                            } else {
                                messageRef.current.showMessage(
                                    'Guest User activation link has been successfully sent.',
                                    NotificationMessageTypeEnum.Success
                                );
                            }
                            setAnchorEl(null);
                        } else {
                            setLoading(false);
                        }
                    } else {
                        setLoading(false);
                    }
                } else {
                    messageRef.current.showMessage(
                        "We're sorry, we are unable to process your request at this time. Please try again or for immediate assistance, contact Southwest Gas Agency Assistance at 877-967-9427. Hearing impaired, use 711.",
                        NotificationMessageTypeEnum.Error
                    );
                    setAnchorEl(null);
                    setLoading(false);
                }
            }
        );
    };

    const handleOnCloseProp = () => {
        setPopupprop(false);
    };

    const handleOnClickOpenEnduser = () => {
        setPopupprop(true);
        setAnchorEl(null);
    };

    const handleEditPopUpClose = (row, mesg, mesgType) => {
        if (mesg && mesgType) {
            props.showMessage(row, mesg, mesgType);
        }
        props.refresh();
        setPopupprop(false);
    };

    const classes = useStyles();
    return (
        <React.Fragment>

            {loading && (
                <Loader />
            )}
            <IconButton
                aria-label="More"
                aria-owns={open ? 'long-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick} className={classes.Nopad}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu classes={{ paper: 'LongMenuWrapper' }}
                id="long-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {status == 'Request Send' && <MenuItem onClick={() => handleMenuClick(guestId, "ActivationLink")}>Resend Activation Link</MenuItem>}
                {status == 'Active' && <MenuItem onClick={() => handleOpenCancelPopUp()}>End User Access</MenuItem>}
                {(status == 'Active' || status == 'InActive') && <MenuItem onClick={handleOnClickOpenEnduser}>View or Edit Access</MenuItem>}
            </Menu>
            <Dialog fullScreen
                open={popupprop}
                onClose={handleOnCloseProp}
                classes={{ paperScrollPaper: 'dialogclass' }}
            >
                <div className="gutterareapop Resgutterareapop">
                    <IconButton edge="start" color="inherit" onClick={handleOnCloseProp} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                </div>
                <Typography variant="h6" color="inherit" className="h6Heading">
                    Edit Guest User
            </Typography>
                <EditUserPopup popupprop={popupprop} roleName={roleName} guestId={guestId} name={name} email={email} expiryDate={expiryDate} triggerClose={handleEditPopUpClose} />
            </Dialog>

            <Dialog maxWidth={'xs'}
                open={popupCancel}
                onClose={handleCloseCancelPopUp}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Removal"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to remove this user?
						</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button aria-label="click here to ok" onClick={handleCloseCancelPopUp} color="secondary" autoFocus>
                        Cancel
						</Button>
                    <Button aria-label="click here to ok" onClick={handleSubmitCancelPopUp} color="secondary" autoFocus>
                        Okay
						</Button>
                </DialogActions>
            </Dialog>


            <MessageBox ref={messageRef} />

        </React.Fragment>
    );
}