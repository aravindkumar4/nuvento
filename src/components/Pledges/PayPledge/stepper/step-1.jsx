'use strict'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SelectedAccountData from '../DialogueContent';
import Slide from '@material-ui/core/Slide';
import AddPaymentMethod from '../../PaymentMethods/AddPaymentMethod';
import Divider from '@material-ui/core/Divider';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
  },
  AccountSpanContainer: { display: 'flex' },
  AccountSpan: { flex: 1, alignSelf: 'center', },
  CustomBodyDialog: { padding: 0 },
  dialogPaper: {
    width: '100%',
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  TypoBox: { padding: '0px 0', borderBottom: '0px solid #ccc', width: '100%' },
  headingfive: { margin: '5px 0', fontSize: 15, color: '#005984' },
  AddressLine: { fontSize: 15 },
  AccountSpan: { flex: 1, alignSelf: 'center' },
  successView: { display: 'flex', flexWrap: 'wrap', width: '100%', margin: '20px 0' },
  closeButton: { position: 'absolute', right: '8px', top: '8px' }
}));

export default function StepOne() {
  const [BankAccount, setBankAccount] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleChange = event => {
    setBankAccount(event.target.value);
  };
  const handleOpen = () => {
    setShow(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setShow(false);
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <div className='rows'>
      <div class="stepone">
        <div className='accountarea'>
          <div class="grouppay boxwithbg">
            <Typography component="em" color="primary">Selected Accounts</Typography>
            <u className={classes.AccountSpanContainer}><span className={classes.AccountSpan}>3 Accounts </span>
              <Button color="primary" className={classes.button} onClick={handleOpen}>View</Button>
            </u>
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={show}
              onClose={handleClose}
              classes={{ paper: classes.dialogPaper }}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <DialogTitle id="customized-dialog-title">
                Selected Accounts
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent className={classes.CustomBodyDialog} dividers={scroll === 'paper'}>
                <SelectedAccountData />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  OK
            </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="grouppay">
            <div style={{ marginTop: '0' }} className={classes.successView}>
              <Typography component="em" color="primary">Payment Amount</Typography>
              <Typography className={classes.TypoBox}><h5 className={classes.headingfive}>$2,400.99</h5>
              </Typography>
            </div>
            <div className={classes.successView}>
              <Typography component="em" color="primary">Payment Date</Typography>
              <Typography className={classes.TypoBox}><address className={classes.AddressLine}>Today</address></Typography>
            </div>
            <div className={classes.successView}>
              <Typography component="em" color="primary">Payment Method</Typography>
              <form className={classes.root} autoComplete="off">
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="BankAccountSelect">Bank Account</InputLabel>
                  <Select classes={{ icon: 'DropIconStyle' }}
                    value={BankAccount}
                    onChange={handleChange}
                    input={<FilledInput name="BankAccount" id="BankAccountSelect" />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>B0fa**************8989</MenuItem>
                    <MenuItem value={20}>B0fa**************7979</MenuItem>
                    <MenuItem value={30}>B0fa**************6969</MenuItem>
                    <MenuItem value={30}>B0fa**************5959</MenuItem>
                  </Select>
                </FormControl>
              </form>
            </div>
            <Button color="primary" className="AddPaymentNew" onClick={handleClickOpen}>Add new payment method</Button>
            <Dialog fullScreen
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition} classes={{ paperScrollPaper: 'dialogclass' }} >
              <div className="gutterareapop">
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
              </div>
              <Typography variant="h6" color="inherit" className="h6Heading">
                Add new payment method </Typography>
              <AddPaymentMethod />
            </Dialog>
            {/* <Divider style={{ marginTop: '25px' }} /> */} 
          </div>
        </div>
      </div>
    </div>
  );
}
