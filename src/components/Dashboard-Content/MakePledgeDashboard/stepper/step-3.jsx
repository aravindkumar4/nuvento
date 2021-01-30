'use strict'
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
    localStorage.setItem("step2", "false");
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
    //localStorage.getItem("FundingProgramD"); 
    const classes = useStyles();
    const customerDetails = JSON.parse(localStorage.getItem("customerDetailsD"));
    return (
        <div className='rows'>
            <div class="stepthree" style={{ width: '100%' }}>
                <div className='accountarea accountareastep2'>
                    <div class="grouppay">
                        <Typography component="em" color="primary">Pledge Details</Typography>
                        <div className="expanddtls expanddtlsthree">
                            <Typography component="label" className={classes.lbltxt}>Name</Typography>
                            <Typography component="h4" className={classes.inpttxt}>{`${customerDetails.firstName ? customerDetails.firstName : ''} ${customerDetails.lastName ? customerDetails.lastName : ''}`}</Typography>
                        </div>
                        <div className="expanddtls expanddtlsthree">
                            <Typography component="label" className={classes.lbltxt}>Service Address</Typography>
                            <Typography component="h4" className={classes.inpttxt}>{`${customerDetails.houseNum ? customerDetails.houseNum : ''} ${customerDetails.street ? customerDetails.street + "," : ''} ${customerDetails.city ? customerDetails.city + "," : ''} ${customerDetails.region ? customerDetails.region : ''} ${customerDetails.postCode ? customerDetails.postCode : ''}`}</Typography>
                        </div>
                        <div className="expanddtls expanddtlsthree">
                            <Typography component="label" className={classes.lbltxt}>Account Number</Typography>
                            <Typography component="h4" className={classes.inpttxt}>{customerDetails.contractAccount}</Typography>
                        </div>
                        <div className="expanddtls expanddtlsthree" >
                            <Typography component="label" className={classes.lbltxt}>Pledge Amount</Typography>
                            <Typography component="h4" className={classes.inpttxt}>{"$" + localStorage.getItem("PledgeAmtD").CurrencyFormatWithoutCode()}
                            </Typography>
                        </div>
                        <div className="expanddtls expanddtlsthree" >
                            <Typography component="label" className={classes.lbltxt}>Funding Source</Typography>
                            <Typography component="h4" className={classes.inpttxt}>{localStorage.getItem("FundingProgramD")}
                            </Typography>
                        </div>
                        <div className="expanddtls expanddtlsthree" >
                            <Typography component="label" className={classes.lbltxt}>Payment Due Date</Typography>
                            <Typography component="h4" className={classes.inpttxt}>{getAddedDate()}
                            </Typography>
                        </div>
                        <div className="expanddtls expanddtlsthree" >
                            <Typography component="label" className={classes.lbltxt}>Apply To</Typography>
                            <Typography component="h4" className={classes.inpttxt}>{localStorage.getItem("ApplyToD") =='DEPOSIT'? 'Security Deposit': 'Utility Bill'}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}