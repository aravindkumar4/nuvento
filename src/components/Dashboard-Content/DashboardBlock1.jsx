import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { MDBCol, MDBRow, MDBNavLink } from 'mdbreact';
import PaymentHistoryChart from './PaymentHistoryChart';
import FormControl from '@material-ui/core/FormControl';
import { css } from 'glamor';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useContext } from 'react';

import Progressbar from './Progressbar';
import TextField from '@material-ui/core/TextField';

import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DashboardBlock2 from './DashboardBlock2';
//import UserContextModel from '../../store/UserContextModel';
import RequestHelper from "../../common/RequestHelper";
import { Pledge } from "../../core/URLConfig";
import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from "../../core/Enum";
import Loader from "../../shared/Views/Loader";
import DateOfBirth from "../../common/DateOfBirth";
import MessageBox from "../../shared/Views/MessageBox";
import { useHistory } from 'react-router-dom';
import AutoSearch from "./AutoSearch";

const MakePledgeDashboard = (props) => <Link aria-label="Click here to Make Pledge Dashboard" to="/MakePledgeDashboard" {...props} />;

const currencies = [
  {
    value: 1,
    text: 'By Account Number and Last Name',
  },
  {
    value: 2,
    text: 'By Account Number and DOB',
  }
];

const useStyles = makeStyles(theme => ({
  ThemeGrid: {
    background: '#27A088',
  }
}));

export default function DashboardBlock1() {
  //console.log("UserContextModel",useContext(UserContextModel));
  const validationMessage = (name, value,type="change") => {
    let message = "";
    switch (name) {
      case "accountNumber":
        if (value.length < 12) {
          message = "Please enter a valid account number";
        }
        if (value.length == 0) {
          message = "Enter the account number";
        }
        if (value.length > 12) {
          if(type=="change"){
            setError(false);
          }
        }
        break;
      case "lastName":
        message = "Enter the last name";
        if (value.length > 0) {
          if(type=="change"){
            setErrorLastName(false);
          }
        }
        break;
      default:
        break;
    }
    return message;
  };

  const handleValidataionChange = (event) => {
    let _error = event.target.value.length == 0;
    if (event.target.name == "accountNumber") {
      let error = event.target.value.length == 0 ? true : (event.target.value.length >= 12 ? false : true);
      if (event.target.value.IsNumber() || event.target.value == "") {
        setAccountNumber({
          accountNumber: {
            value: event.target.value,
            error: error,
          }
        })
      }
      setError(error);
    }
    if (event.target.name == "lastName") {
      setLastName({
        lastName: {
          value: event.target.value,
          error: _error,
        }
      })
      setErrorLastName(_error);
    }
  };

  const [BankAccount, setBankAccount] = useState(1);
  const [Month, setMonth] = useState('');
  const [Day, setDay] = useState('');
  const [Year, setYear] = useState('');
  const [error, setError] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorMonth, setErrorMonth] = useState(false);
  const [errorDay, setErrorDay] = useState(false);
  const [errorYear, setErrorYear] = useState(false);
  const messageRef = React.useRef(null);

  const [LastName, setLastName] = useState({
    lastName: {
      value: "",
      error: false,
    }
  });
  const [AccountNumber, setAccountNumber] = useState({
    accountNumber: {
      value: "",
      error: false,
    }
  });

  const [isDisabled, setDisabled] = useState(true);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchData, setSearchDataData] = useState({});
  // called first time when page load
  useEffect(() => {

    RequestHelper.POST(
      Pledge.GetAgencyPledgeHistory,
      APIURLTypeEnum.Default,
      {
        agency: localStorage.getItem("AgencyNumber"),// "1100003905",
        contractAccountNumber: "",
        dateFrom: "",
        dateTo: ""
      },
      (res) => {
        if (res && res.status == StatusCodeEnum.OK) {
          if (res.data) {
            if (res.data.data) {
              setLoading(false);
              const result = res.data.data.filter(x => x.status == "PENDING").reduce(function (accumulator, currentValue) {
                return parseFloat(accumulator) + parseFloat(currentValue.amount)
              }, 0);
              setData((result).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              }))
            } else {
              setLoading(false);
              setData(res.data.data);
            }
          } else {
            setLoading(false);
          }
        } else {
          // messageRef.current.showMessage(
          //   res.response.data.status.message,
          //   NotificationMessageTypeEnum.Error
          // );
          setLoading(false);
        }
      }
    );
  }, []);
  
  const history = useHistory();
  const getDataOnSearch = (contractAccountNumber, searchBy, searchType) => {
    setLoading(true);
    RequestHelper.POST(
      Pledge.GetAgencyAccountLookup,
      APIURLTypeEnum.Default,
      {
        contractAccountNumber: contractAccountNumber,
        searchBy: searchBy,
        searchType: searchType
      },
      (res) => {
        
        if (res && res.status == StatusCodeEnum.OK) {
          if (res.data) {
          
            if (res.data.data) {
              setLoading(false);
              setSearchDataData(res.data.data);
              localStorage.setItem("customerDetailsD", JSON.stringify(res.data.data));
              localStorage.setItem("AccountNumber", contractAccountNumber);
              history.push("/MakePledgeDashboard");
            } else {
              setLoading(false);
              setSearchDataData(res.data.data);
              localStorage.setItem("customerDetailsD", JSON.stringify(res.data.data));
            }
          } else {
            setLoading(false);
          }
        } else {
          if(res.response.data.status.message ==="No Relevent Record found")
          {
            messageRef.current.showMessage(
              "Customer not found. Please confirm all fields completed accurately according to the information on file with Southwest Gas.",
              NotificationMessageTypeEnum.Error
            );
          } else 
          {
          messageRef.current.showMessage(
            res.response.data.status.message,
            NotificationMessageTypeEnum.Error
          );
          }
          setLoading(false);
        }
      }
    );
  }

  const dayChange = (day) => {
    setDay(day)
    if(day=="")setErrorDay(true);else setErrorDay(false);
  }
  const monthChange = (month) => {
    if (month == 2 && Day > 29) {
      setDay("")
    }
    if (month == 4 && Day > 30) {
      setDay("")
    }
    if (month == 6 && Day > 30) {
      setDay("")
    }
    if (month == 9 && Day > 30) {
      setDay("")
    }
    if (month == 11 && Day > 30) {
      setDay("")
    }
    if (month == "") {
      setDay("")
    }
    setMonth(month)
    if(month=="")setErrorMonth(true);else setErrorMonth(false);
  }
  const yearChange = (year) => {
    setYear(year)
    if(year=="")setErrorYear(true);else setErrorYear(false);
  }

  useEffect(() => {
    if (BankAccount === 1) {
      if (AccountNumber.accountNumber.value.trim() !== "" && LastName.lastName.value.trim() !== "" && state.gilad) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    } else {
      if (AccountNumber.accountNumber.value.trim() !== "" && Month !== "" && Day !== "" && Year !== "" && state.gilad) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }
  });

  let monthValue = "", dayValue = "";
    const searchClick = () => {
    if (BankAccount === 2) {
      monthValue = Month.length == 1 ? "0" + Month : Month;
      dayValue = Day.length == 1 ? "0" + Day : Day;
      const date = Year + monthValue + dayValue;
      if(!(!!AccountNumber.accountNumber.value) &&  !(!!date))
      {
          messageRef.current.showMessage(
              "Please enter all manadatory information.",
              NotificationMessageTypeEnum.Error
          );
          return true;
      } else if(!(!!AccountNumber.accountNumber.value))
      {
          // messageRef.current.showMessage(
          //     "Please enter account number.",
          //     NotificationMessageTypeEnum.Error
          // );
          validationMessage("accountNumber", AccountNumber.accountNumber.value,"click")
          setError(true);
          return true;
      } else if(AccountNumber.accountNumber.value.length<12) 
      {
          // messageRef.current.showMessage(
          //     "Please enter a valid account number.",
          //     NotificationMessageTypeEnum.Error
          // );
          validationMessage("accountNumber", AccountNumber.accountNumber.value,"click")
          setError(true);
          return true;
      }
      
      // else if(!(!!date))
      // {
      //     messageRef.current.showMessage(
      //         "Please enter date of birth.",
      //         NotificationMessageTypeEnum.Error
      //     );
      //     return true;
      // }

      //else if( !(!!Year) ||  !(!!monthValue)  || !(!!dayValue))
      //{
          // messageRef.current.showMessage(
          //     "Please enter date of birth.",
          //     NotificationMessageTypeEnum.Error
          // );
          // return true;
      //}

      else if(monthValue==""){
        setErrorMonth(true); 
        return true;
      } 
      else if(monthValue !=="") setErrorMonth(false);
      if(dayValue==""){
        setErrorDay(true);
        return true;
      } 
      else if(dayValue !=="") setErrorDay(false);
      if(Year==""){
        setErrorYear(true);
        return true;
      } 
      else if(Year== !"") setErrorYear(false);

      else if(!(state.gilad))
      {
          messageRef.current.showMessage(
              "You must confirm you have written and signed authorization from the customer before proceeding.",
              NotificationMessageTypeEnum.Error
          );
          return true;
      }

      getDataOnSearch(AccountNumber.accountNumber.value, Year + monthValue + dayValue, 2);
    } else {

      if(!(!!AccountNumber.accountNumber.value) &&  !(!!LastName.lastName.value))
      {
          messageRef.current.showMessage(
              "Please enter all manadatory information.",
              NotificationMessageTypeEnum.Error
          );
          return true;
      } else if(!(!!AccountNumber.accountNumber.value))
      {
          // messageRef.current.showMessage(
          //     "Please enter account number.",
          //     NotificationMessageTypeEnum.Error
          // );
          validationMessage("accountNumber", AccountNumber.accountNumber.value,"click")
          setError(true);
          return true;
      }else if(AccountNumber.accountNumber.value.length<12) 
      {
          // messageRef.current.showMessage(
          //     "Please enter a valid account number.",
          //     NotificationMessageTypeEnum.Error
          // );
          validationMessage("accountNumber", AccountNumber.accountNumber.value,"click")
          setError(true);
          return true;
      } 
      else if(!(!!LastName.lastName.value))
      {
          // messageRef.current.showMessage(
          //     "Please enter last name.",
          //     NotificationMessageTypeEnum.Error
          // );
          validationMessage("lastName", "","click")
          setErrorLastName(true);
          return true;
      }
      else if(!(state.gilad))
      {
          messageRef.current.showMessage(
              "You must confirm you have written and signed authorization from the customer before proceeding.",
              NotificationMessageTypeEnum.Error
          );
          return true;
      }

      getDataOnSearch(AccountNumber.accountNumber.value, LastName.lastName.value, 1);
    }
    // localStorage.setItem("searchParam", JSON.stringify({
    //   contractAccountNumber: AccountNumber.accountNumber.value,
    //   searchBy: BankAccount === 1 ? LastName.lastName.value : Year + monthValue + dayValue,
    //   searchType: BankAccount === 1 ? 1 : 2
    // }));
  }

  const [state, setState] = useState({
    gilad: false
  });
  const classes = useStyles();
  const handleChange = event => {
    switch (event.target.name) {
      case "BankAccount": 
            setBankAccount(event.target.value);
            if(event.target.value===1){
              setMonth("");
              setDay("");
              setYear("");
            }
        break;
      // case "Month": setMonth(event.target.value);
      //   break;
      // case "Day": setDay(event.target.value);
      //   break;
      // case "Year": setYear(event.target.value);
      //   break;
      default:
        break;
    }
  };
  const handleChangeCheck = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { gilad } = state;
  return (
    <React.Fragment>
      {loading &&
        <Loader />}
      <MDBRow>
        <MDBCol lg="8" sm="12" size="12" role="region" aria-label="Home left sidebar">
          <Grid component="div" className={clsx(classes.ThemeGrid, 'Billing_ModuleBox JumboBox')}>
            {/* <p className="title_txt_dash">Your Pledges</p> */}
            <MDBRow>

              <MDBCol lg="12" sm="12" size="12">
                <div className="billingcentrebox">
                  <p className="lead">
                    Total Pledge Dollars Unpaid
              </p>

                  <h2 className="h1 display-3"><span>{data && data.length !== 0 ? `${data}` : ''}</span></h2>
                  <MDBNavLink aria-label="click here to view pledge" to="/Pledges" className="viewBillsButton"><span>View Pledges</span></MDBNavLink>
                </div>
              </MDBCol>
              <MDBCol lg="6" sm="6" size="12">
                {/* <Progressbar /> */}
              </MDBCol>
            </MDBRow>
          </Grid>

          <div className="Quick_LinkBox MiniBox_Right signUpNotification addressVerify">
            <h3> Address Verification</h3>
            <p className="verifyPara">Addresses serviced by Southwest Gas will be displayed in the dropdown results.</p>
            {/* <TextField className="TextFieldWrapper"
            required
            id="Email"
            label="Enter Address"
            variant="filled"
            inputProps={{
              'aria-label':'address feild'
            }}
          /> */}
            <AutoSearch />
            <p>* If no match is found, check spelling or address variations.</p>
            <p>* An address not displayed is not serviced by Southwest Gas.</p>
          </div>

        </MDBCol>
      {((localStorage.getItem("RoleType") === "Admin") || (localStorage.getItem("RoleType") === "Manager"))   && <MDBCol lg="4" size="12" role="region" aria-label="Home right sidebar">
        <div className="Quick_LinkBox MiniBox_Right">
          <Typography component="h3" color="primary">Create New Pledge</Typography>
          <FormControl className="formControl">
            <InputLabel shrink htmlFor="year-label-placeholder"></InputLabel>
            <Select
              inputProps={{
                'aria-label': 'Account Details Dropdown'
              }}
              className="commonselectfield newpldge"
              value={BankAccount}
              onChange={handleChange}
              name="BankAccount"
              input={<OutlinedInput disableUnderline name="BankAccount" id="year-label-placeholder" />}
              displayEmpty
              iconStyle={{ color: "#fff" }}
            >
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <TextField required id="filled-required" label="Account Number" InputProps={{ disableUnderline: true }} className={'commontextfield'} margin="normal" variant="filled" /> */}
          <TextField
            helperText={
              error
                ? validationMessage("accountNumber", AccountNumber.accountNumber.value)
                : ""
            }
            error={error}
            id="accountNumber"
            label="Account Number "
            autoComplete="off"
            className={"TextFieldWrapper"}
            value={AccountNumber.accountNumber.value}
            name="accountNumber"
            onChange={(e) =>
              handleValidataionChange(e)
            }
            margin="normal"
            variant="filled"
            inputProps={{
              validatemessage: "Please enter account number.",
              mandatory: "1",
              maxLength: 13,
              'aria-label': 'Enter account number'
            }}
          />
          {/* <TextField required id="filled-required" label="Last Name" InputProps={{ disableUnderline: true }} className={'commontextfield'} margin="normal" variant="filled" /> */}
          {BankAccount === 1 &&
            <TextField
              error={errorLastName}
              helperText={
                errorLastName
                  ? validationMessage("lastName",LastName.lastName.value)
                  : ""
              }
              id="lastName"
              label="Last Name "
              autoComplete="off"
              className={"TextFieldWrapper"}
              value={LastName.lastName.value}
              name="lastName"
              onChange={(e) =>
                handleValidataionChange(e)
              }
              margin="normal"
              variant="filled"
              inputProps={{
                maxLength: 40,
                'aria-label': 'Enter last name'
              }}
            />
          }
          {BankAccount === 2 &&
          <>
             <InputLabel className="dob-label text-left" htmlFor="filled-age-simple">Customer Date of Birth</InputLabel>
            <DateOfBirth isLabelVisible={false}
              dayChange={dayChange} monthChange={monthChange} yearChange={yearChange}
              errorMonth={errorMonth} errorDay={errorDay} errorYear={errorYear}
            />
            </>
          }
          <div className="dashboardPerform">
            <FormControlLabel
              control={<Checkbox checked={gilad} onChange={handleChangeCheck} name="gilad" />}
              label="By performing a search, I confirm written and signed authorization from the customer is on file."
            />
          </div>
          <Button aria-label="click here to search"  onClick={searchClick}
            // component={Object.keys(searchData).length == 0 ? 'div': MakePledgeDashboard}
            variant="contained" color="secondary" className="srchbuttonhome">Search</Button>
        </div>
        {/* {localStorage.getItem("RoleType") && localStorage.getItem("RoleType").toLocaleLowerCase()=="admin" && */}
        <Typography component="div" className={'quite-letter'}>
          <Typography component="h4">Request a Service Establishment Quote Letter</Typography>
          <Link to="/RequestforStartServiceQuote" aria-label="click to open request form" variant="contained" color="primary">GO TO REQUEST FORM</Link>
        </Typography>
        {/* } */}
        {/* <div className="Quick_LinkBox MiniBox_Right">
        <MDBNavLink to="/RequestforStartServiceQuote" className="viewBillsButton customBtn"><span>Request for Start Service Quote</span></MDBNavLink>
      </div> */}

        {/* <DashboardBlock2 /> */}
        <MessageBox ref={messageRef} />

      </MDBCol>}
      </MDBRow>
    </React.Fragment>
  );
}
