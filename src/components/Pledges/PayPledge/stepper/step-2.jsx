'use strict'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SelectedAccountData from '../DialogueContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
    color: '#005984',
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
  titletmid: { color: '#696969', fontSize: 15, },
  successView: { display: 'flex', flexWrap: 'wrap', width: '100%', margin: '20px 0' },
  closeButton:{
    position:'absolute',right:'8px',top:'8px',
  }
}));

export default function StepTwo() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <div className='rows'>
      <div class="steptwo">
        <div className='accountarea accountareastep2'>
        <div class="grouppay">
          
            <div className="expanddtls expanddtlsthree">
              <div className="pledgeIconGroup">
                <span className="material-icons"> account_circle </span>
                <div>
                <Typography component="h4" className={classes.lbltxt}>Selected Accounts</Typography>
                <Typography component="label" className={classes.inpttxt}>3 Accounts</Typography>
                </div>
              </div>
              
            </div>
            <div className="expanddtls expanddtlsthree">
            <div className="pledgeIconGroup">
            <span class="material-icons home_ico">attach_money</span>
                <div>
                <Typography component="h4" className={classes.lbltxt}>Total Amount</Typography>
                <Typography component="label" className={classes.inpttxt}>$2,40.999</Typography>
                </div>
              </div>
            </div>
            <div className="expanddtls expanddtlsthree">
            <div className="pledgeIconGroup">
                <span className="material-icons">today </span>
                <div>
                <Typography component="h4" className={classes.lbltxt}>Payment Date</Typography>
                <Typography component="label" className={classes.inpttxt}>August 14, 2019</Typography>
                </div>
              </div>
              
            </div>
            <div className="expanddtls expanddtlsthree makepayamt" >
            <div className="pledgeIconGroup">
                <span className="material-icons"> credit_card </span> 
                <div>
                <Typography component="h4" className={classes.lbltxt}>Bank Account</Typography>
                <Typography component="label" className={classes.inpttxt}>BofA**********8888
                    {/* <Button color="primary" onClick={handleClick} className="amtlinkright">
                  <i class="material-icons">monetization_on</i> <span style={{ textDecoration: 'underline' }}>Make a payment for this amount</span>
                </Button> */}
              </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}