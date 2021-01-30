'use strict'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import fundingSource from './../../../../assets/images/funding-source.svg';


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
  closeButton: {
    position: 'absolute', right: '8px', top: '8px',
  }
}));

export default function StepTwo() {
  const _localEditData = JSON.parse(localStorage.getItem('EditData'));
  const amount = localStorage.getItem('EditAmount');
  const classes = useStyles();

  const result = () => {
    
    const findIndex = [
      'None',
      'ACAA - Arizona Community Action Association',
      'ACAA (HEAF) - Home Energy Assistance Fund',
      'ACAA (URRD) - Utility Repair Replacement and Deposit program',
      'CalWORKs - California Work Opportunity and Responsibility to Kids',
      'CSBG - Community Services Block Grant',
      'HUD - Dept. of Housing & Urban Development',
      'LIHEAP (EAP) - Energy Assistance Program',
      'LIHEAP (ECIP) - Energy Crisis Intervention Program',
      'LIHEAP (HEAP) - Home Energy Assistance Program',
      'LIHEAP - Low Income Home Energy Assistance Program',
      'LIHEAP Supplemental - Low Income Home Energy Assistance Program Supplemental',
      'STCS - Short Term Crisis Services',
      'SWG Energy Share',
      'SWG Low Income Bill Assistance',
      'TANF - Temporary Assistance for Needy Families',
      'UEC - Universal Energy Charge',
      'Veterans Affairs/Administration',
      'CARES ACT funding',
      'LIHEAP supplemental COVID 19',
      'SWG LIEC',
      'SWG Energyshare (ESHARE)',
      'Other'].filter(x => x.indexOf(localStorage.getItem('FundingSource')) > -1);
    if (findIndex && findIndex.length > 0) {
      return findIndex[0].toString();
    } else {
      return localStorage.getItem('FundingSource');
    }

  }

  return (
    <div className='rows'>
      <div class="steptwo">
        <div className='accountarea accountareastep2 editPledgeStep2'>
          <div class="grouppay">
            <Typography component="em" color="primary">Pledge Details</Typography>
            <div className="expanddtls expanddtlsthree">
              <div className="pledgeIconGroup">
                <span className="material-icons"> account_circle  </span>
                <div>
                  <Typography component="h4" className={classes.lbltxt}> Name </Typography>
                  <Typography component="label" className={classes.inpttxt}>{_localEditData.Customer}</Typography>
                </div>
              </div>

            </div>
            <div className="expanddtls expanddtlsthree">
              <div className="pledgeIconGroup">
                <span className="material-icons"> home </span>
                <div>
                  <Typography component="h4" className={classes.lbltxt}> Service  Address</Typography>
                  <Typography component="label" className={classes.inpttxt}>{_localEditData.Account}</Typography>
                </div>
              </div>
            </div>
            <div className="expanddtls expanddtlsthree">
              <div className="pledgeIconGroup">
                <span className="material-icons"> account_box  </span>
                <div>
                  <Typography component="h4" className={classes.lbltxt}>Account Number</Typography>
                  <Typography component="label" className={classes.inpttxt}>{_localEditData.AccountNumber}</Typography>
                </div>
              </div>

            </div>
            <div className="expanddtls expanddtlsthree">
              <div className="pledgeIconGroup">
                <span className="material-icons"><img src={fundingSource} alt="funcding source" /></span>
                <div>
                  <Typography component="h4" className={classes.lbltxt}>Funding Source</Typography>
                  <Typography component="label" className={classes.inpttxt}>{result()}</Typography>
                </div>
              </div>

            </div>
            <div className="expanddtls expanddtlsthree">
              <div className="pledgeIconGroup">
                <span className="material-icons"> receipt </span>
                <div>
                  <Typography component="h4" className={classes.lbltxt}>Apply To</Typography>
                  <Typography component="label" className={classes.inpttxt}>{localStorage.getItem("AppliedTo") =='DEPOSIT'? 'Security Deposit': 'Utility Bill' }</Typography>
                </div>
              </div>
            </div>

            <div className="expanddtls expanddtlsthree makepayamt" >
              <div className="pledgeIconGroup">
                <span className="material-icons"> attach_money </span>
                <div>
                  <Typography component="h4" className={classes.lbltxt}>Pledge Amount</Typography>
                  <Typography component="label" className={classes.inpttxt}>{amount.CurrencyFormatWithoutCode()}</Typography>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
}