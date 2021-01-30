import React from 'react';
import Paper from '@material-ui/core/Paper';
import { MDBContainer, MDBRow, MDBCol, MDBListGroup } from 'mdbreact';
import { Link } from 'react-router-dom';
import { css } from 'glamor';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const billingpayarea = {
  marginTop: '20',
  color: '#696969',
};
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  ButtonContained: {
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor:'#27A088',
    borderRadius: 4,
    textDecoration:'none',
    fontSize: '18px',
    fontFamily: 'ff-good-headline-web-pro-con',
    fontWeight: 'bold',
    minHeight: '40px',
    display: 'inline-block',
    padding: '0 12px',
    minWidth: '135px',
    lineHeight: '36px',
    "&:hover": {
      color: '#ffffff',
      backgroundColor:'#27A088',
    }
  },
}));

export default function ResetPasswordFormSucess() {
  const classes = useStyles();
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol lg="7" sm="12" xs="12" className="successarea">
          <MDBCol size="12" className="float-left">
            <Paper elevation={0} className={'wrapper-box registerSucess ShortPaper reset-password-success'}>
              <div  {...css(billingpayarea)} class="billingpayarea">
                <h2 className="successHead mt-0">
                  <i class="material-icons iconsuccess">done</i>
                
                </h2>
                <h2 color="primary" className="successHead proxima-nova" style={{color:'#222221'}}>Success</h2>
                <div class="successview mt-3">
                  <span className="proxima-nova" style={{color:'#222221'}}>Your have successfully reset your password.</span>
                </div>

               
                <div className="text-center w-100">
                   <Link aria-label="Click here to login" to="/" className={classes.ButtonContained}>LOG IN</Link>
                </div>
              </div>
            </Paper>
          </MDBCol>
        </MDBCol>
      </MDBRow>
      {/* <MDBListGroup className="returnlinks">
      <li> <Link to="/login" title="Navigate to Login">Return to login</Link></li>
      </MDBListGroup> */}
    </MDBContainer>
  );
}