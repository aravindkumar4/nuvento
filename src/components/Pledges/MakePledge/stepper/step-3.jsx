'use strict'
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { MDBBtn } from 'mdbreact';
import AddPaymentMethod from '../../PaymentMethods/AddPaymentMethod';
import fundingSource from './../../../../assets/images/funding-source.svg';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '75%',
  },
  TypoBox: {
    padding: '25px 0px 15px 0',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: '16px'
  },
  buttonnew: {
    float: 'right',
    marginTop: '10px'
  }
}));

export default function StepThree() {
  const [BankAccount, setBankAccount] = React.useState('');
  const [showMessage, setShowMessage] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  //
  const datas = JSON.parse(localStorage.getItem("customerM"));
  //console.log(datas, "step-3")

  const handleChange = event => {
    setBankAccount(event.target.value);
  };

  const handleClick = () => {
    setShowMessage(!showMessage);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const value =
  {
    1: "ACAA",
    2: "ACAA (HEAF)",
    3: "ACAA (URRD)",
    4: "CalWORKs",
    5: "CSBG",
    6: "HUD",
    7: "LIHEAP (EAP)",
    8: "LIHEAP (ECIP)",
    9: "LIHEAP (HEAP)",
    10: "LIHEAP - Low",
    11: "LIHEAP Supplemental",
    12: "SWG Energy Share",
    13: "SWG Low Income Bill Assistance",
    14: "TANF",
    15: "UEC",
    16: "Veterans",
    17: "Other"
  }
  const getAddedDate = () => {
    //
    var myNewDate = new Date(new Date());
    let date = myNewDate.setDate(myNewDate.getDate() + 60);
    return formatDate(date);
  }

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [month,day,year].join('/');
  }
  return (
    <div className='rows'>
      <div class="stepthree" style={{ width: '100%' }}>
        <div className='accountarea accountareastep2'>
          <div class="grouppay">
            <Typography component="em" color="primary">Pledge Details</Typography>
            <div className="expanddtls expanddtlsthree">
              <div className="pledgeIconGroup">
                <span className="material-icons"> account_circle </span>
                <div>
                  <Typography component="h4" className={classes.lbltxt}>Name</Typography>
                  <Typography component="label" className={classes.inpttxt}>{`${datas.firstName ? datas.firstName : ''} ${datas.lastName ? datas.lastName : ''}`}</Typography>
                </div>
              </div>

            </div>
            <div className="expanddtls expanddtlsthree">
              <div className="pledgeIconGroup">
                <span className="material-icons"> home </span>
                <div>
                  <Typography component="h4" className={classes.lbltxt}>Service Address</Typography>
                  <Typography component="label" className={classes.inpttxt}>{`${datas.houseNum ? datas.houseNum : ''} ${datas.street ? datas.street + "," : ''} ${datas.city ? datas.city + "," : ''} ${datas.region ? datas.region : ''} ${datas.postCode ? datas.postCode : ''}`}</Typography>
                </div>
              </div>
            </div>
            <div className="expanddtls expanddtlsthree">
              <div className="pledgeIconGroup">
                <span className="material-icons"> account_box </span>
                <div>
                  <Typography component="h4" className={classes.lbltxt}>Account Number</Typography>
                  <Typography component="label" className={classes.inpttxt}>{datas.contractAccount}</Typography>
                </div>
              </div>

            </div>
            <div className="expanddtls expanddtlsthree makepayamt" >
              <div className="pledgeIconGroup">
                <span className="material-icons"> attach_money </span>
                <div>
                  <Typography component="h4" className={classes.lbltxt}>Pledge Amount</Typography>
                  <Typography component="label" className={classes.inpttxt}>{localStorage.getItem("PledgeAmtM").CurrencyFormatWithoutCode()}
                    {/* <Button color="primary" onClick={handleClick} className="amtlinkright">
                  <i class="material-icons">monetization_on</i> <span style={{ textDecoration: 'underline' }}>Make a payment for this amount</span>
                </Button> */}
                  </Typography>
                </div>
              </div>

            <div className="expanddtls expanddtlsthree">
                <div className="pledgeIconGroup">
                    <span className="material-icons"> receipt </span>
                    <div>
                        <Typography component="h4" className={classes.lbltxt}>Apply To</Typography>
                        <Typography component="label" className={classes.inpttxt}>{localStorage.getItem("ApplyToM") =='DEPOSIT'? 'Security Deposit': 'Utility Bill'}</Typography>
                    </div>
                </div>
            </div>
            <div className="expanddtls expanddtlsthree">
              <div className="pledgeIconGroup">
                <span className="material-icons"><img src={fundingSource} alt="funcding source"/></span>
                <div>
                  <Typography component="h4" className={classes.lbltxt}>Funding Source</Typography>
                  <Typography component="label" className={classes.inpttxt}>{localStorage.getItem("FundingProgramM")}</Typography>
                </div>
              </div>

            </div>
            <div className="expanddtls expanddtlsthree">
              <div className="pledgeIconGroup">
                <span className="material-icons"> event </span>
                <div>
                  <Typography component="h4" className={classes.lbltxt}>Payment Due Date</Typography>
                  <Typography component="label" className={classes.inpttxt}>{getAddedDate()}</Typography>
                </div>
              </div>

            </div>
     

            </div>

          </div>
          {showMessage && (
            <div class="grouppay boxwithbg">
              <Typography component="em" color="primary">Payment Method</Typography>
              <div className="pmtmthd">
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="BankAccountSelect">Bank Account</InputLabel>
                  <Select classes={{ icon: 'DropIconStyle' }}
                    value={BankAccount}
                    onChange={handleChange}
                    input={<FilledInput name="BankAccount" id="BankAccountSelect" />}>
                    <MenuItem value="None">None</MenuItem>
                    <MenuItem value="8989">B0fa**************8989</MenuItem>
                    <MenuItem value="7979">B0fa**************7979</MenuItem>
                    <MenuItem value="6969">B0fa**************6969</MenuItem>
                    <MenuItem value="5959">B0fa**************5959</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="outlined" color="secondary" className={classes.buttonnew} onClick={handleClick}>
                  Cancel
                </Button>
                <MDBBtn type="button" class="btn btn-link addpaymentbtn" color="primary" variant="outlined" onClick={handleClickOpen}>Add new payment method</MDBBtn>
                <Dialog fullScreen
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Transition} classes={{ paperScrollPaper: 'dialogclass' }}
                >
                  <div className="gutterareapop">
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                      <CloseIcon />
                    </IconButton>
                  </div>
                  <Typography variant="h6" color="inherit" className="h6Heading">
                    Add new payment method
                  </Typography>
                  <AddPaymentMethod />
                </Dialog>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}