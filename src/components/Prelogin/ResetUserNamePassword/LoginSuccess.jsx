import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { MDBListGroup, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Link , useParams} from 'react-router-dom';
import { css } from 'glamor';
import { makeStyles } from '@material-ui/core/styles';

const billingpayarea = {
  marginTop: '20',
  color: '#696969',
};
const removebgcommon = {
  verticalAlign: 'top',
  alignSelf: 'baseline',
};
const donebtnright = {
  float: 'right',
}

const useStyles = makeStyles(theme => ({
  ButtonContained: {
    padding: '8px 35px',
    color: '#ffffff',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    lineHeight: '1.75',
    textDecoration: 'none',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 4,
    "&:hover": {
      color: '#ffffff',
      backgroundColor: theme.palette.secondary.main,
    }
  },
  ButtonOutlined: {
    padding: '8px 35px',
    textTransform: 'uppercase',
    fontSize: '0.875rem',
    lineHeight: '1.75',
    borderRadius: 4,
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.main,
    }
  }
}));
export default function RegisterSuccess() {
  let { isSuccess } = useParams();
  
  var data = isSuccess;
  const classes = useStyles();
  const handleOnClick = () => {
    console.log('handleOnClick');
    localStorage.setItem('model', { UserModel: "fdfdfd" })
    window.location.href = '/';
  }
  return (
    <MDBContainer className="loginSucessec">
      <MDBRow>
        <MDBCol lg="7" sm="12" xs="12" className="successarea">
          <MDBCol size="12" className="ml-auto mr-auto">

            {localStorage.getItem('ActivationMessage') == 'success' ? (
              <Paper className={'wrapper-box registerSucess  ShortPaper'}>
                <div {...css(billingpayarea)} class="billingpayarea">
                  <h2 className="successHead"><i class="material-icons iconsuccess">done</i>
                    <Typography className="successtext" color="primary">Successfully Registered! </Typography></h2>
                  {/* <div class="successview">
                    An activation link has been sent to your email address. Click the link in the email to activate your account.
          </div>
                  <div className="emailBg">
                    example@emailaddress.com
          </div> */}

                  <div class="buttonareasuccess justify-content-center mt30">
                    {/* <a aria-label="naviate to home page" href="/" {...css(donebtnright)} 
                    className={classes.ButtonContained}>Login</a> */}
                    <Link to="/" aria-label="naviate to home page" {...css(donebtnright)} 
                    className={classes.ButtonContained}>Login</Link>


                    {/* <button onClick={handleOnClick}>click</button>
                     */}
                  </div>
                </div>
              </Paper>
            ) : (
                <Paper className="weRSorryPaper">
                  <div class="billingpayarea  accountarea unable-schedule weRSorry">
                    <h2 className="successHead"><i class="material-icons iconsuccess">block</i>
                      <Typography color="primary" className="successtext">We’re sorry.</Typography></h2>
                    <div class="success">
                      <p>
                      <h2> {localStorage.getItem('ActivationMessage')} </h2>
                      {console.log(localStorage.getItem('ActivationMessage'))}
            </p>
                    </div>
                  </div>
                </Paper>
              )}



          </MDBCol>
        </MDBCol>
      </MDBRow>
      {/* <MDBListGroup className="returnlinks activationLink">
        <Link aria-label="navigate to login page" to="/login">Resend activation link</Link>
      </MDBListGroup> */}
    </MDBContainer>
  );
}