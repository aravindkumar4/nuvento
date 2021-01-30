import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
//import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import ViewCustomerStatus from '../PaymentMethods/CustomerStatusDetails';
import fundingSource from './../../../assets/images/funding-source.svg';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    TypoBox: {
        padding: '0px 0 10px',
        marginBottom: '10px',
    },
    headingfive: {
        margin: '12px 0 0px',
        fontSize: '17px',
        color: '#4c4c4c',
    },
    AddressLine: {
        fontSize: '16px',
    },
    headingfivetop: {
        margin: '12px 0 -10px',
        fontSize: '17px',
        color: '#4c4c4c',
    },
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
            backgroundColor: '#098169',
        }
    },
}));

export default function AddNewPropertySuccess(props) {
    const [open, setOpen] = React.useState(false);
    const data = props.location.state ? props.location.state.data : {};
    const [datas, setDatas] = React.useState(data);//TODO: remove other local variables and use this data 

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

    //useEffect(() => {
    //    ////
    //    //const d = JSON.parse(localStorage.getItem("customerM"));

    //    //if (d) {
    //    //    setDatas(d);
    //    //    //localStorage.setItem("customerM", null);
    //    //}
    //}, []);

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

        return [month,day, year].join('/');
    }

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
                                    <div class="success">Thank you for your pledge. Payment is due within 60 days from the pledge date. If payment is not received, this pledge will expire and the customer will be responsible for the full balance owing and their gas service may be subject for disconnect.</div>
                                    <div class="successmsag">
                                        <div className='accountarea accountareastep2'>
                                            <div class="grouppay">
                                                {/* <Typography component="em" color="primary">Payment Details</Typography>*/}
                                                <div className="expanddtls expanddtlssuccess">
                                                    <div className="pledgeIconGroup">
                                                        <span className="material-icons"> account_circle </span>
                                                        <div>
                                                            <Typography component="h4" className={classes.lbltxt}>Name</Typography>
                                                            <Typography component="label" className={classes.inpttxt}>{`${datas.firstName ? datas.firstName : ''} ${datas.lastName ? datas.lastName : ''}`}</Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="expanddtls expanddtlssuccess">
                                                    <div className="pledgeIconGroup">
                                                        <span className="material-icons"> home </span>
                                                        <div>
                                                            <Typography component="h4" className={classes.lbltxt}>Service Address</Typography>
                                                            <Typography component="label" className={classes.inpttxt}>{`${datas.houseNum ? datas.houseNum : ''} ${datas.street ? datas.street + "," : ''} ${datas.city ? datas.city + "," : ''} ${datas.region ? datas.region : ''} ${datas.postCode ? datas.postCode : ''}`}</Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="expanddtls expanddtlssuccess">

                                                    <div className="pledgeIconGroup">
                                                        <span className="material-icons"> account_box </span>
                                                        <div>
                                                            <Typography component="h4" className={classes.lbltxt}>Account Number</Typography>
                                                            <Typography component="label" className={classes.inpttxt}>{datas.contractAccount}</Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="expanddtls expanddtlssuccess" >
                                                    <div className="pledgeIconGroup">
                                                        <span className="material-icons"> attach_money </span>
                                                        <div>
                                                            <Typography component="h4" className={classes.lbltxt}>Pledge Amount</Typography>
                                                            <Typography component="label" className={classes.inpttxt}>{localStorage.getItem("PledgeAmtM").CurrencyFormatWithoutCode()}</Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="expanddtls expanddtlssuccess" >
                                                    <div className="pledgeIconGroup">
                                                        <span className="material-icons"> receipt </span>
                                                        <div>
                                                            <Typography component="h4" className={classes.lbltxt}>Apply To</Typography>
                                                            <Typography component="label" className={classes.inpttxt}>{localStorage.getItem("ApplyToM")  =='DEPOSIT'? 'Security Deposit': 'Utility Bill'}</Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="expanddtls expanddtlssuccess" >
                                                    <div className="pledgeIconGroup">
                                                        <span className="material-icons"> <img src={fundingSource} alt="funcding source"/> </span>
                                                        <div>
                                                            <Typography component="h4" className={classes.lbltxt}>Funding Source</Typography>
                                                            <Typography component="label" className={classes.inpttxt}>{localStorage.getItem("FundingProgramM")}</Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="expanddtls expanddtlssuccess" >
                                                    <div className="pledgeIconGroup">
                                                        <span className="material-icons"> event </span>
                                                        <div>
                                                            <Typography component="h4" className={classes.lbltxt}>Payment Due Date</Typography>
                                                            <Typography component="label" className={classes.inpttxt}>{getAddedDate()}</Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="expanddtls expanddtlssuccess" >
                          
                          <div className="pledgeIconGroup">
                            <span className="material-icons"> date_range </span>
                            <div>
                            <Typography component="h4" className={classes.lbltxt}>Payment Date</Typography>
                            <Typography component="label" className={classes.inpttxt}>Today, March 8, 2018 </Typography>
                            </div>
                          </div>
                        </div> */}
                                                {/* <div className="expanddtls expanddtlssuccess" >
                        

                          <div className="pledgeIconGroup">
                            <span className="material-icons"> payment </span>
                            <div>
                            <Typography component="h4" className={classes.lbltxt}>Payment Method</Typography>
                            <Typography component="strong" className={classes.inpttxt}>Bank Account </Typography>
                            <Typography component="label" className={classes.inpttxt}>BofA*********0089  </Typography>
                            </div>
                          </div>

                        </div> */}
                                            </div>
                                        </div>
                                        <div class="buttonareasuccess justifyBtns justifyBtnsCol">
                                            {/* <Button color="secondary" onClick={handleClickOpen} variant="contained">VIEW CUSTOMER STATUS</Button> */}
                                            <Link aria-label="navigate to pledge" to="./Pledges" className={classes.ButtonContained}>Done</Link>
                                        </div>
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
                                                John Doe
                            </Typography>
                                            <ViewCustomerStatus />
                                        </Dialog>
                                    </div>
                                </div>
                            </Paper>
                        </MDBCol>
                        {/* <MDBCol lg="5" sm="4" xs="12" className="float-left rightArea d-none d-sm-block">
              <div class="enrollboxarea">
                <b>Pay with Credit or Debit Card?</b>
                <p>Use your 13-digit account number from your Account Summary to pay by card.</p>
                <Link to="./Pledges" className="enrolllink">Pay with Credit or Debit Card</Link>
              </div>
            </MDBCol> */}
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}