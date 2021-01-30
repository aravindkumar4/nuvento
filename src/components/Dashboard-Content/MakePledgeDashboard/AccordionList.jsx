import React, { useEffect, useState, useRef } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UsageButtonsPills from "./UsagePills";
import Help from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { css } from 'glamor';
import RequestHelper from "../../../common/RequestHelper";
import { Pledge } from "../../../core/URLConfig";
import { StatusCodeEnum, NotificationMessageTypeEnum, APIURLTypeEnum } from "../../../core/Enum";
import Loader from "../../../shared/Views/Loader";
import MessageBox from "../../../shared/Views/MessageBox";
import moment from 'moment';
const removebrdr = {
  border: '0px',
  paddingLeft: '0'

};
const bottomspc = {
  marginTop: '-10px',
  marginBottom: '20px'
}
const bordertop = {
  borderTop: '1px solid #d8d8d8 !important',
  borderTopLeftRadius: '5px !important',
  borderTopRightRadius: '5px !important',
}
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    flexBasis: '100%',
    flexShrink: 0,
    color: '#222221',
    fontSize: '20px',
    lineHeight: '35px',
    fontFamily: 'adelle'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.primary.main,
  },
  titleaccordion: {
    fontWeight: 'bold',
    color: '#222221',
    marginBottom: '25px',
  },
  bgcolorexpnd: {
    background: '#f5f5f5',
    padding: '0px',
    display: 'block',
  },
  formControl: {
    flex: '1',
  },
  linkright: {
    color: '#27A088',
    fontSize: '14px',
    textDecoration: 'underline'
  },
  spaceremove: {
    margin: '0',
    boxShadow: '0 0 0 0',
    border: '1px solid #d8d8d8',
    borderTop: '0px',
  },
  DynamicLists: {
    textAlign: 'center'
  },
  signup: {
    display: 'inline-flex',
    justifyContent: 'flex-end',
    flex: '1',
    alignxtAlign: 'center'
  },
  DownloadButton:
  {
    padding: '0 30px'
  },
  lnkdetails: {
    color: '#005984',
    fontSize: '13px',
  },
  expandhead: {
    margin: '15px 0',
  },
  twocoltxt: {
    display: 'inline-flex',
  },
  icoaligntop: { marginTop: '-12px' }
}));

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: 0,
  },
}))(MuiExpansionPanelDetails);

export default function AccordionList() {
  localStorage.setItem("PledgeAmtD", "");
  localStorage.setItem("FundingProgramD", "");
  const data = JSON.parse(localStorage.getItem("customerDetailsD"))
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const messageRef = useRef(null);

  const [billingInfo, setBillingInfo] = useState({});
  const [billHistory, setBillHistory] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [pledgeHistory, setPledgeHistory] = useState([]);
  const [PaymentArrangementAndBillingPrograms, setPaymentArrangementAndBillingPrograms] = useState({});



  const getData = (url, param, type) => {

    if (type != "PaymentHistory") {
      RequestHelper.POST(
        url,
        type == "PledgeHistory" ? APIURLTypeEnum.Default : APIURLTypeEnum.CIS,
        param,
        (res) => {
          if (res && res.status == StatusCodeEnum.OK) {
            if (res.data) {
              if (res.data.data) {
                // setLoading(false);
                if (type == "BillingInfo") {
                  setBillingInfo(res.data.data);
                  getPaymentArrangementAndBillingPrograms("account/GetAccountStatus");
                  setLoading(false);
                } else if (type == "BillHistory") {
                  setBillHistory(res.data.data);
                  setLoading(false);
                } else if (type == "PledgeHistory") {
                  setPledgeHistory(res.data.data);
                  setLoading(false);
                }
              } else {
                // setLoading(false);
                if (type == "BillingInfo") {
                  setBillingInfo(res.data.data);
                  setLoading(false);
                } else if (type == "BillHistory") {
                  setBillHistory(res.data.data);
                } else if (type == "PledgeHistory") {
                  setLoading(false);
                  setPledgeHistory(res.data.data);
                }
              }
            } else {
              setLoading(false);
            }
          } else {
            // messageRef.current.showMessage(
            //   "No records found. Please verify and try again.",
            //   NotificationMessageTypeEnum.Error
            // );
            setLoading(false);
            setShowMessage(true);
          }
        }
      );
    } else {
      RequestHelper.GET(
        url, APIURLTypeEnum.CIS, "?AccountNumber=910000005222&StartDate=20180807&EndDate=20200807",
        (res) => {
          if (res && res.status == StatusCodeEnum.OK) {
            if (res.data) {
              if (res.data.data) {
                setLoading(false);
                setPaymentHistory(res.data.data);
              } else {
                setLoading(false);
                setPaymentHistory(res.data.data);
              }
            } else {
              setLoading(false);
            }
          } else {
            messageRef.current.showMessage(
              res.response.data.status.message,
              NotificationMessageTypeEnum.Error
            );
            setLoading(false);
          }
        }
      );
    }
  }

  const getPaymentArrangementAndBillingPrograms = (url) => {
    RequestHelper.GET(
      url, APIURLTypeEnum.CIS, "?ContractAccount=" + localStorage.getItem("AccountNumber"),
      (res) => {
        if (res && res.status == StatusCodeEnum.OK) {
          if (res.data) {
            if (res.data.data) {
              const obj = { CareStatus: "", LiraStatus: "", PaymentExtn: "" };
              const CareStatus = res.data.data.filter(word => word.fieldValue == "Y" && word.fieldName.indexOf("CARE_Status") != -1);
              const LiraStatus = res.data.data.filter(word => word.fieldValue == "Y" && word.fieldName.indexOf("LIRA_Status") != -1);
              const PaymentExtn = res.data.data.filter(word => word.fieldValue == "Y" && word.fieldName.indexOf("PaymentExtn") != -1);
              if (CareStatus.length > 0) {
                obj.CareStatus = "CARE (CA): Enroll";
              } else {
                obj.CareStatus = "CARE (CA): Not Enrolled";
              }
              if (LiraStatus.length > 0) {
                obj.LiraStatus = CareStatus.length > 0 ? " , LIRA (AZ):" : "Enroll";
              }
              else {
                obj.LiraStatus = "LIRA (AZ): Not Enrolled";
              }
              if (PaymentExtn.length > 0) {
                obj.PaymentExtn = "PaymentExtn ENROLL";
              } else {
                obj.PaymentExtn = "Payment Extension - Not Enrolled";
              }
              setPaymentArrangementAndBillingPrograms(obj);
            } else {
              // setLoading(false);
              // setPaymentHistory(res.data.data);
            }
          } else {
            setLoading(false);
          }
        } else {
          messageRef.current.showMessage(
            res.response.data.status.message,
            NotificationMessageTypeEnum.Error
          );
          setLoading(false);
        }
      }
    );
  }


  const base64ToArrayBuffer = (base64) => {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  const saveByteArray = (reportName, byte) => {
    var blob = new Blob([byte], { type: "application/pdf" });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
  };

  const monthDifference = () => {

    var date = moment().subtract(24, 'months').format("YYYYMMDD");
    return date;
  }

  const handleAnchorClick = (invoiceNumber, event) => {
    event.preventDefault();
    
    const param = {
      "accountNumber": data.contractAccount,
      "invoiceNumber": invoiceNumber
    };
    // const param = {
    //     "accountNumber": "910000000106",
    //     "invoiceNumber": "800000002174"
    // };
    setLoading(true);
    RequestHelper.POST(
      Pledge.BillPDF,
      APIURLTypeEnum.BillPDF,
      param,
      (res) => {
        setLoading(false);
        if (res && res.status == StatusCodeEnum.OK) {
          if (res.data && res.data.data && res.data.data.contentArray) {
            const result = res.data.data.contentArray;
            
            var sampleArr = base64ToArrayBuffer(result);
            saveByteArray(param.invoiceNumber, sampleArr);
          } else {
            messageRef.current.showMessage(
              'We’re sorry the bill is not available.',
              NotificationMessageTypeEnum.Error
            );
          }
        } else {
          messageRef.current.showMessage(
            'We’re sorry the bill is not available.',
            NotificationMessageTypeEnum.Error
          );
        }
      }
    );
  };

  const isValidPrgram = (value) => {
    if (value) {
        const localInfo = JSON.parse(localStorage.getItem('customerDetailsD')).region_Service;
        return value && value.indexOf(localInfo) > -1 ? true : false;
    } else {
        return false;
    }
}


  const getURL = panel => {
    
    
    let uri = "";
    let params = {};
    switch (panel) {
      case "BillingInfo":
        uri = Pledge.GetCurrentBillDetail;
        params.accountNumber = localStorage.getItem("AccountNumber");
        break;
      case "BillHistory":
        uri = Pledge.GetBillingHistory;
        params.accountNumber = localStorage.getItem("AccountNumber");
        params.startDate = monthDifference();
        params.endDate = moment().format("YYYYMMDD");
        break;
      case "PaymentHistory":
        uri = Pledge.GetBillPaymentHistory;
        params.AccountNumber = localStorage.getItem("AccountNumber");
        params.StartDate = monthDifference();
        params.EndDate = moment().format("YYYYMMDD");
        break;
      case "PledgeHistory":
        uri = Pledge.GetAgencyPledgeHistory;
        params.agency = localStorage.getItem("AgencyNumber");
        params.contractAccountNumber = "";
        params.dateFrom = "";
        params.dateTo = "";
        break;
      default:
        break;
    }
    return {
      uri: uri,
      params: params
    }
  }

  const [expanded, setExpanded] = React.useState(false);
  const [accountChanged, setAccountChanged] = React.useState(false);
  const classes = useStyles();

  const accountNum = localStorage.getItem("AccountNumber");

  const handleChange = panel => (event, isExpanded) => {
    if (isExpanded) {
      if (panel == "BillingInfo" || panel == "BillHistory" || panel == "PaymentHistory" || panel == "PledgeHistory") {
        setBillingInfo({});
        setBillHistory([]);
        setPaymentHistory([]);
        setLoading(true);
        const value = getURL(panel);
        getData(value.uri, value.params, panel);
      }
    }
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="AccordionList foundmatchbox make-pledge">
      {loading && <Loader />}
      <p className={classes.titleaccordion}>{`${data && data.firstName ? data.firstName : ""
        } ${data && data.lastName ? data.lastName : ""}`}</p>
      <div {...css(bottomspc)}>
        <div {...css(removebrdr)} className="expanddtls">
          <Typography component="label" className={classes.lbltxt}>
            Account Number
          </Typography>
          <Typography component="label" className={classes.inpttxt}>
            {data && data.contractAccount}
          </Typography>
        </div>
        <div {...css(removebrdr)} className="expanddtls">
          <Typography component="label" className={classes.lbltxt}>
            Service Address
          </Typography>
          <Typography component="label" className={classes.inpttxt}>{`${data && data.houseNum ? data.houseNum : ""
            } ${data && data.street ? data.street + "," : ""} ${data && data.city ? data.city + "," : ""
            } ${data && data.region ? data.region : ""} ${data && data.postCode ? data.postCode : ""
            }`}</Typography>
        </div>
      </div>
      <ExpansionPanel
        {...css(bordertop)}
        className={classes.spaceremove}
        expanded={expanded === "BillingInfo"}
        onChange={handleChange("BillingInfo")}
      >
        <ExpansionPanelSummary
          classes={{ content: classes.expandhead }}
          aria-describedby="panel1Details"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>
            Billing Information
          </Typography>
        </ExpansionPanelSummary>
        {Object.keys(billingInfo).length > 0 && (
          <ExpansionPanelDetails id="panel1Details" className={classes.bgcolorexpnd}>
            <div className="expanddtls">
            {/* <Typography component="h4" className={classes.lbltxt}>Account Number</Typography> Defect #5835 so i changed color*/}
              <Typography component="label" className={classes.lbltxt}>
                Total Balance
              </Typography>
              <Typography component="label" className={classes.twocoltxt}>
                {billingInfo.totalAmountDue.CurrencyFormat()}

                {/* <Tooltip className={classes.icoaligntop} title="Deposit amounts due may be included in balances. Please see bills for more details." placement="right">
                  <IconButton aria-label="Help">
                    <Help />
                  </IconButton>
                </Tooltip> */}
              </Typography>
            </div>
            <div className="expanddtls">
              <Typography component="label" className={classes.lbltxt}>
                Current Bill
              </Typography>
              <Typography component="label" className={classes.inpttxt}>
                {billingInfo.currentCharges.CurrencyFormat()}
              </Typography>
            </div>
            <div className="expanddtls">
              <Typography component="label" className={classes.lbltxt}>
                Past Due
              </Typography>
              <Typography component="label" className={classes.inpttxt}>
                {billingInfo.previousBalance.CurrencyFormat()}
              </Typography>
            </div>
            <div className="expanddtls">
              <Typography component="label" className={classes.lbltxt}>
                Payment(s) Since Last Bill
              </Typography>
              <Typography component="label" className={classes.inpttxt}>
                {billingInfo.paymentReceived.CurrencyFormat()}
              </Typography>
            </div>
            {/* <div className="expanddtls">
              <Typography component="h4" className={classes.lbltxt}>30/60/90 Day Balance</Typography>
              <Typography component="label" className={classes.inpttxt}>30 day: $139.00, 60 day: $150.00, 90 day: $34.11</Typography>
            </div> */}
            <div className="expanddtls">
              <Typography component="label" className={classes.lbltxt}>
                Payment Arrangements
              </Typography>
              <Typography component="label" className={classes.inpttxt}>
                {PaymentArrangementAndBillingPrograms.PaymentExtn}
                {/* <a href="" className={classes.lnkdetails}>View Details</a> */}
              </Typography>
            </div>
            <div className="expanddtls">
              <Typography component="label" className={classes.lbltxt}>
                Billing Programs
              </Typography>
              {isValidPrgram(PaymentArrangementAndBillingPrograms.CareStatus) &&  <Typography
                component="label"
                className={classes.inpttxt}
              >{`${PaymentArrangementAndBillingPrograms.CareStatus}`}</Typography> }
            {isValidPrgram(PaymentArrangementAndBillingPrograms.LiraStatus) &&  <Typography
                component="label"
                className={classes.inpttxt}
              >{`${PaymentArrangementAndBillingPrograms.LiraStatus}`}</Typography> }
            </div>
            {/* <div className="expanddtls">
              <Typography component="h4" className={classes.lbltxt}>Other Pledges</Typography>
              <Typography component="label" className={classes.inpttxt}>ABC Agency: $152.11 on 01/01/19</Typography>
            </div> */}
          </ExpansionPanelDetails>
        )}
      </ExpansionPanel>
      <ExpansionPanel
        className={classes.spaceremove}
        expanded={expanded === "BillHistory"}
        onChange={handleChange("BillHistory")}
      >
        <ExpansionPanelSummary
          classes={{ content: classes.expandhead }}
          aria-describedby="panel2Details"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>Bill History</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails id="panel2Details" className={classes.bgcolorexpnd}>

          {billHistory.length > 0 &&
            <div className="expanddtls billhistoryaccor">
              <Typography component="h3" style={{width:'33%'}}>Amount</Typography>
              <Typography component="h3" style={{width:'33%'}}>Date</Typography>
              <Typography component="h3" style={{width:'33%'}} className={classes.lblright}></Typography>
            </div>
          }

          {billHistory.length > 0 && (
            billHistory.map((n) => {
              return (
                <div key={n.invoiceId} className="expanddtls billhistoryaccor">
                  <Typography style={{ fontSize: '16px',width:'33%' }} component="label" className={classes.lblright}>
                    {n.amountDue ? n.amountDue.CurrencyFormat() : '0.00'.CurrencyFormat()}
                  </Typography>
                  <Typography style={{ fontSize: '16px',width:'33%' }} component="label" >{n.billDate.YYYYDDMMFormatTOMMDDYYYY()}</Typography>
                  <Typography component="label" style={{width:'33%'}} >
                    <a style={{ fontFamily: 'proxima-nova' }} aria-label="Click here to check bill pdf" href="" onClick={(event) => handleAnchorClick(n.invoiceId, event)} className={classes.linkright}>
                      BILL PDF
                    </a>
                  </Typography>
                </div>
              );
            })
          )}
          {showMessage && (
            <div key={"n.invoiceId"} className="expanddtls billhistoryaccor">
              <Typography component="label" className={classes.lblright}>
                {"No Data Found"}
              </Typography>
            </div>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        className={classes.spaceremove}
        expanded={expanded === "PaymentHistory"}
        onChange={handleChange("PaymentHistory")}
      >
        <ExpansionPanelSummary
          aria-describedby="panel3Details"
          classes={{ content: classes.expandhead }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>Payment History</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails id="panel3Details" className={classes.bgcolorexpnd}>
          {paymentHistory.length > 0 && (
            <div className="expanddtls billhistoryaccor">
              <Typography style={{width:'50%'}} component="h3">Date</Typography>
              <Typography style={{width:'50%'}} component="h3" className={classes.lblright}>
                Amount
              </Typography>
            </div>
          )}
          {paymentHistory.length > 0 &&
            paymentHistory.map((n, i) => {
              return (
                <div key={i + 1} className="expanddtls billhistoryaccor">
                  <Typography style={{ fontSize: '16px',width:'50%' }} component="label">
                    {n.paymentDate.YYYYDDMMFormatTOMMDDYYYY()}
                  </Typography>
                  <Typography style={{ fontSize: '16px',width:'50%' }} component="label" className={classes.lblright}>
                    {n.amount.CurrencyFormat()}
                  </Typography>
                </div>
              );
            })}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        className={`accord-pledge-history ${classes.spaceremove}`}
        expanded={expanded === "PledgeHistory"}
        onChange={handleChange("PledgeHistory")}
      >
        <ExpansionPanelSummary
          aria-describedby="panel4Details"
          classes={{ content: classes.expandhead }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>Pledge History</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails id="panel4Details" className={`table-responsive ${classes.bgcolorexpnd}`}>
          {pledgeHistory.length > 0 &&
            <div className="expanddtls billhistoryaccor">
              <Typography style={{width:"30%"}} component="h3">
                Agency Name
                        </Typography>
              <Typography style={{width:"25%"}} component="h3">Amount</Typography>
              <Typography style={{width:"25%"}} component="h3">
                Pledge Date
                        </Typography>
              <Typography style={{width:"20%"}} component="h3">Status</Typography>
            </div>}


          {pledgeHistory.length > 0 &&
            pledgeHistory.map((n, i) => {
              return (
                <div className="expanddtls billhistoryaccor">
                  <Typography style={{width:"30%"}} component="label" className={classes.lblright}>
                    {n.agencyName}
                  </Typography>
                  <Typography style={{width:"25%"}} component="label">{n.amount.CurrencyFormat()}</Typography>
                  <Typography style={{width:"25%"}} component="label">
                    {n.createdOn.YYYYDDMMFormatTOMMDDYYYY()}
                  </Typography>
                  <Typography style={{width:"20%"}} component="label">{n.status}</Typography>
                </div>
              );
            })}
          {/* <div className="expanddtls billhistoryaccor">
            <Typography component="label" className={classes.lblright}>Agency Name </Typography>
            <Typography component="label" >$117.88</Typography>
            <Typography component="label" >12/12/19</Typography>
            <Typography component="label" >Fulfilled</Typography>
          </div>
          <div className="expanddtls billhistoryaccor">
            <Typography component="label" className={classes.lblright}>Agency Name </Typography>
            <Typography component="label" >$120.60</Typography>
            <Typography component="label" >12/12/19</Typography>
            <Typography component="label" >Cancelled</Typography>
          </div> */}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        className={classes.spaceremove}
        expanded={expanded === "Usage"}
        onChange={handleChange("Usage")}
      >
        <ExpansionPanelSummary
          aria-describedby="panel5Details"
          classes={{ content: classes.expandhead }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>Usage</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          id="panel5Details"
          className={classes.bgcolorexpnd}
          style={{ background: "#fff" }}
        >
          <div className="UsagesTopBoxpledges ">
            <UsageButtonsPills accountChanged={accountNum} />
          </div>
          {/* <div className="DownloadSection">
            <Typography
              className={classes.DynamicLists}
              component="p"
              color="textPrimary"
            >
              <a href="" role="button" className={classes.DownloadButton}>
                <i class="material-icons icoaccor">get_app</i>Download Excel
              </a>
              <a href="" role="button" className={classes.DownloadButton}>
                <i class="material-icons icoaccor">get_app</i>Download Usage
                Details
              </a>
            </Typography>
          </div> */}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <MessageBox ref={messageRef} />

    </div>
  );
}
