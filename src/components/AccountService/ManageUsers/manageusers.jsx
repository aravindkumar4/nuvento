import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { makeStyles } from '@material-ui/core/styles';
import ProfileData from './ProfileData';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddUsers from './AddUsers';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import HeaderSwitch from '../../../HeaderSwitch';
import MessageBox from "../../../shared/Views/MessageBox";
import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from "../../../core/Enum";
const useStyles = makeStyles(theme => ({
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function HeadingSectionArea(props) {
  const messageRef = React.useRef(null);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (mesg) => {
    if (mesg === "save") {
      messageRef.current.showMessage(
        "Guest User has been successfully invited",
        NotificationMessageTypeEnum.Success
      );
      props.pageRefresh();
    }


    setOpen(false);


  };

  return (
    <Grid component="div" className="pageheading-wrapper">

      <MessageBox ref={messageRef} />
      <MDBContainer>
        <MDBRow>
          <MDBCol lg="6" sm="6" xs="12">
            <Grid component="div" className="pageheading-box">
              <Typography component="h1">Manage Users</Typography>
            </Grid>
          </MDBCol>
          {(localStorage.getItem("RoleType") === "Agency Owner" || localStorage.getItem("RoleType") === "Admin") &&
            <MDBCol lg="6" sm="6" xs="12" className="accountboxContainer flexRight">
              <div class="AddPortolioButton">
                <Button aria-label="click here to add user" color="secondary" variant="contained" onClick={handleClickOpen}>Add User</Button>
              </div>
            </MDBCol>
          }
        </MDBRow>
      </MDBContainer>
      <Dialog fullScreen
        open={open}
        onClose={handleClose}
        classes={{ paperScrollPaper: 'dialogclass' }}
      >
        <div className="gutterareapop Resgutterareapop">
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </div>
        <Typography variant="h6" color="inherit" className="h6Heading">
          Invite A Guest User
            </Typography>
        <AddUsers triggerClose={handleClose} />
      </Dialog>
    </Grid>
  );
}

export default function ProfilePage(props) {
  const [closedForm, setClosedForm] = React.useState(0);
  const pageRefresh = () => {
    setClosedForm({ closedForm: 1 });
  };


  return (
    <React.Suspense fallback="">
      <section class="page-wrapper responsiveTbl">
        <HeadingSectionArea pageRefresh={pageRefresh} />
        <MDBContainer>
          <MDBRow>
            <MDBCol size="12">
              <Grid component="div" className="Profilesection">
                <ProfileData closedForm={closedForm} pageRefresh={pageRefresh} />
              </Grid>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </React.Suspense>
  );
}