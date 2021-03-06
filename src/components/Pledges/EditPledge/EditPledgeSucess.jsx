import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SelectedAccountData from './DialogueContent';

const useStyles = makeStyles(theme => ({
  TypoBox: {
    padding: '0px 0px 8px 0',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
  },
  headingfive: {
    margin: 0,
    fontSize: 15,
    color: theme.palette.secondary.main,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  AddressLine: {
    fontSize: 15,
    paddingBottom: '10px',
    paddingTop: '2px',
    width: '100%'
  },
  AccountSpanContainer: { display: 'flex' },
  AccountSpan: { flex: 1, alignSelf: 'center', },
  CustomBodyDialog: { padding: 0 },
  dialogPaper: {
    width: '100%',
  },
  titletmid: { fontFamily: 'Opensans-Bold', color: '#696969', fontSize: 15, fontWeight: 'normal' },
  successView: { display: 'flex', flexWrap: 'wrap', width: '100%', margin: '20px 0' },
  closeButton: { position: 'absolute', right: '8px', top: '8px' },
  ButtonContained: {
    padding: '6px 35px',
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor: theme.palette.secondary.main,
    fontSize: '.875rem',
    display: 'flex',
    alignItems: 'center',
    lineHeight: 1.75,
    marginLeft: '10px',
    borderRadius: 4,
    "&:hover": {
      color: '#ffffff',
      backgroundColor: theme.palette.secondary.main,
    }
  },
}));

export default function PayBillSuccess() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol lg="12" sm="12" xs="12" className="successarea">
          <div className={'wrapper-box paybilltopspace'}>
            <MDBCol lg="7" sm="12" xs="12" className="ml-auto mr-auto">
              <Paper elevation={1} className="ShortPaper">
                <div class="billingpayarea">
                  <h2 className="successHead"><i class="material-icons iconsuccess">done</i>
                    <Typography color="primary" className="successtext">Success!</Typography></h2>
                  <div class="success">Thank you! Your payment is being processed within 24 hours.</div>
                  <div class="successmsag">
                    

                          
                  <div className='accountarea accountareastep2 editPledgeStep2'>
                     <div class="grouppay edirSucessPay">
            <div className="expanddtls expanddtlsthree">
              <div className="pledgeIconGroup">
                <span className="material-icons">  account_box </span>
                <div>
                <Typography component="h4" className={classes.lbltxt}> Customer Name </Typography>
                <Typography component="label" className={classes.inpttxt}>John Doe</Typography>
                </div>
              </div>
              
            </div>
            <div className="expanddtls expanddtlsthree">
            <div className="pledgeIconGroup">
                <span className="material-icons"> home </span>
                <div>
                <Typography component="h4" className={classes.lbltxt}> Address</Typography>
                <Typography component="label" className={classes.inpttxt}>1122 Water Drive, Clear City, NC 77171</Typography>
                </div>
              </div>
            </div>
            <div className="expanddtls expanddtlsthree">
            <div className="pledgeIconGroup">
                <span className="material-icons"> account_circle </span>
                <div>
                <Typography component="h4" className={classes.lbltxt}>Account Number</Typography>
                <Typography component="label" className={classes.inpttxt}>000000123456</Typography>
                </div>
              </div>
              
            </div>
            <div className="expanddtls expanddtlsthree makepayamt" >
            <div className="pledgeIconGroup">
                <span className="material-icons"> monetization_on </span>
                <div>
                <Typography component="h4" className={classes.lbltxt}>Pledge Amount</Typography>
                <Typography component="label" className={classes.inpttxt}>$569.11</Typography>
                </div>
              </div>
            </div>
          </div>
                  </div>








                  <div class="buttonareasuccess justify-content-center">
                      <Link aria-label="Click here to submit" to="./Pledges" className={classes.ButtonContained}>Done</Link>
                    </div>
                  </div>
                </div>
              </Paper>
            </MDBCol>
            {/* <MDBCol lg="5" sm="4" xs="12" className="float-left bluearea d-none d-sm-block">
              <div class="enrollboxarea">
                <b>Pay with Credit or Debit Card?</b>
                <p>Use your 13-digit account number from your Account Summary to pay by card.</p>
                <Link to="/Pledges" className="enrolllink">Pay with Credit or Debit Card</Link>
              </div>
            </MDBCol> */}
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}