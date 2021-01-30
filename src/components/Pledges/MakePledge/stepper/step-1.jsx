'use strict'
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { MDBContainer, MDBRow, MDBCol, MDBNavLink } from 'mdbreact';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import SelectedAccountData from '../DialogueContent';
import AccordionList from '../AccordionList';
import { handleCustomerInfo } from '../AccordionList';
import { css } from 'glamor';
import RequestHelper from "../../../../common/RequestHelper";
import { Pledge } from "../../../../core/URLConfig";
import { createContext, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import {
    StatusCodeEnum, NotificationMessageTypeEnum, APIURLTypeEnum
} from "../../../../core/Enum";
import DateOfBirth from "../../../../common/DateOfBirth";
import Loader from "../../../../shared/Views/Loader";
import MessageBox from "../../../../shared/Views/MessageBox";
import Checkbox from '@material-ui/core/Checkbox';

const MakePledgeDashboard = (props) => <Link aria-label="Click here Make Pledge Dashboard" to="/MakePledgeDashboard" {...props} />;

const txttbl = {
    fontSize: '15px',
    paddingTop: '8px',
    display: 'inline-flex',
}

const commfiled = {
    marginTop: '20px !important',
    maxWidth: '50%',
    paddingRight: '4% !important',
    marginBottom: '22px !important',
}
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    flex: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 400,
        textTransform: 'uppercase',
    },
    formControl: {
        margin: theme.spacing.unit,
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
    },
    CustomBodyDialog: { padding: 0 },
    AccountSpanContainer: { display: 'flex' },
    AccountSpan: { flex: 1, alignSelf: 'center', },
    Fcontainer: {
        marginTop: 50,
    },
    optionlabel: {
        float: 'left',
        width: 'auto',
        marginRight: '60px !important',
        marginBottom: '0',
    },
    formgroup: {
        flexDirection: 'column',
        display: 'inline-block',
    },
    AccountSpanContainer: { display: 'flex' },
    AccountSpan: { flex: 1, alignSelf: 'center', },
    CustomBodyDialog: { padding: 0 },
    positionStatic: {
        width: '100%',
        marginBottom: '20px',
        boxShadow: 'none'
    }
}));

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const UserContext = createContext();

export default function StepOne() {
    localStorage.setItem("PledgeAmtM", "");
    localStorage.setItem("FundingProgramM", "");
    localStorage.setItem("ApplyToM", "");
    const [value, setValue] = React.useState('Yes');
    const [name, setName] = React.useState('Yes');
    const [open, setOpen] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [showdiv, setShowdiv] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [BankAccount, setBankAccount] = React.useState('Yes');
    const [loading, setLoading] = useState(false);
    const [Month, setMonth] = useState("");
    const [Day, setDay] = useState("");
    const [Year, setYear] = useState("");
    const [isDisabled, setDisabled] = useState(true);
    const [data, setData] = useState({});
    const messageRef = React.useRef(null);
    const [error, setError] = useState(false);
    const [errorLastName, setErrorLastName] = useState(false);
    const [errorMonth, setErrorMonth] = useState(false);
    const [errorDay, setErrorDay] = useState(false);
    const [errorYear, setErrorYear] = useState(false);

    React.useEffect(() => {
        if (BankAccount === "Yes") {
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

    const [state, setState] = useState({
        gilad: false
    });

    const handleChangeCheck = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    const handleClick = event => {
        //  this.setState({  showdiv: false  });
    };
    const handleOnClick = event => {
        // this.setState({  showdiv: false  });
        setMonth("");
        setDay("");
        setYear("");
    };
    const clearOnClick = event => {
        setDay("");
        setMonth("");
        setYear("");
        setData({});
        setAccountNumber({
            accountNumber: {
                value: "",
                error: "",
            }
        })
        setLastName({
            lastName: {
                value: "",
                error: "",
            }
        })
        setState({ ...state, ['gilad']: event.target.checked });
    };

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
    const handleChangeradio = event => {
        //setValue(event.target.value);
        switch (event.target.name) {
            case "BankAccount":
                setBankAccount(event.target.value);
                localStorage.setItem("customerM", null);
                setData({});
                break;
            case "Month": setMonth(event.target.value);
                break;
            case "Day": setDay(event.target.value);
                break;
            case "Year": setYear(event.target.value);
                break;
            default:
                break;
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setShow(false);
        setShowdiv(true);
    };




    //  const handleClicksOpen = () => {
    // //     setShow(true)
    // //         //setLoading(true);
    // //     let ContractAccountNumber = AccountNumber.accountNumber.value;
    // //     let Name = LastName.lastName.value;
    // //     let Days = (Day < 10) ? ("0" + Day) : Day
    // //     let Months = (Month < 10) ? ("0" + Month) : Month
    // //     let dob = Year + "" + Months + "" + Days;
    // //var basedSearch = {};
    // //     if (Name !== "") {
    // //          basedSearch = {
    // //              contractAccountNumber: ContractAccountNumber,
    // //              searchBy: Name,
    // //             searchType: 1,
    // //         };
    // //     } else {
    // //         basedSearch=  {
    // //             contractAccountNumber: ContractAccountNumber,
    // //             searchBy: dob,
    // //                 searchType: 2,
    // //                     };
    // //     }
    // //     let dob = AccountNumber.dateOfBirth.value;

    // //       RequestHelper.POST(
    // //           Pledge.GetAgencyAccountLookup,
    // //           basedSearch,
    // //           (res) => {
    // //               if (res && res.status == StatusCodeEnum.OK) {
    // //                   if (res.data && res.data.status.code == StatusCodeEnum.OK) {
    // //                       let result = [];
    // //                       if (res.data.data.length == 0) {
    // //                           setLoading(false);
    // //                       } else {
    // //                           const _res = res.data.data;
    // //                           result = _res.map((m) => {
    // //                               return {
    // //                                   "contractAccount": m.contractAccount,
    // //                                   "zipCode": m.zipCode,
    // //                                   "businessPartner": m.businessPartner,
    // //                                   "meterNo": m.meterNo,
    // //                                   "nc_Col_Flag": m.nc_Col_Flag,
    // //                                   "firstName": m.firstName,
    // //                                   "middleName": m.middleName,
    // //                                   "lastName": "MARTIN",
    // //                                   "houseNum": m.houseNum,
    // //                                   "street": m.street,
    // //                                   "city": m.city,
    // //                                   "region": m.region,
    // //                                   "country": m.country,
    // //                                   "postCode": m.postCode,
    // //                                   "primary": m.primary,
    // //                                   "secondary":m.secondary,
    // //                                   "primary_Email":m.primary_Email,
    // //                                   "secondary_Email": m.secondary_Email,
    // //                                   "message": m.message,
    // //                                   "paperless": m.paperless,
    // //                                   "sendControl_gp": m.sendControl_gp,
    // //                                   "houseNo_Service": m.houseNo_Service,
    // //                                   "street_Service": m.street,
    // //                                   "apartment_Service": m.apartment_Service,
    // //                                   "city_Service":m.city,
    // //                                   "region_Service": m.region_Service,
    // //                                   "country_Service": m.country_Service,
    // //                                   "postCode_Service": m.postCode_Service,
    // //                                   "dateOfBirth": m.dateOfBirth,
    // //                                   "contractAccountExt": m.contractAccountExt,
    // //                                   "enterprise": m.enterprise,
    // //                               };
    // //                           });
    // //                           setLoading(false);
    // //                           setSearchData(result);
    // //                           setData(result);
    // //                       }
    // //                   } else {
    // //                       setLoading(false);
    // //                   }
    // //               } else {
    // //                    messageRef.current.showMessage(
    // //                      res.response.data.status.message,
    // //                      NotificationMessageTypeEnum.Error
    // //                    );
    // //                   setLoading(false);
    // //               }
    // //           }
    // //   );
    //      localStorage.setItem("searchParam", JSON.stringify({
    //          contractAccountNumber: AccountNumber.accountNumber.value,
    //          searchBy: BankAccount === "Yes" ? LastName.lastName.value : Year + Month + Day,
    //          searchType: BankAccount === "Yes" ? 1 : 2
    //      }));
    //      setLoading(false);
    //      handleCustomerInfo();
    //      //AccordionList();
    //      setLoading(true);
    //     // setTimeout(setShowdiv(true), 150000);
    //};
    // const validationMessage = (name, value) => {
    //     let message = "";
    //     switch (name) {
    //         case "accountNumber":
    //             if (value.length == 0) {
    //                 //message = "Enter the account number";
    //             }
    //             else if (value.length < 12) {
    //                 message = "Please enter a valid account number.";
    //             }
    //             break;
    //         case "lastName":
    //             //message = "Enter the last name";
    //             break;
    //         default:
    //             break;
    //     }
    //     return message;
    // };
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

    // const searchClick = () => {
    //     //
    //     
    //     let monthValue = "", dayValue = "";
    //     if (BankAccount === "Yes") {
    //         
    //         if(!(!!AccountNumber.accountNumber.value) &&  !(!!LastName.lastName.value))
    //         {
    //             messageRef.current.showMessage(
    //                 "Please enter all manadatory fields.",
    //                 NotificationMessageTypeEnum.Error
    //             );
    //             return true;
    //         } else if(!(!!AccountNumber.accountNumber.value))
    //         {
    //             messageRef.current.showMessage(
    //                 "Please enter account number.",
    //                 NotificationMessageTypeEnum.Error
    //             );
    //             return true;
    //         }else if(AccountNumber.accountNumber.value.length<12) 
    //         {
    //             messageRef.current.showMessage(
    //                 "Please enter a valid account number.",
    //                 NotificationMessageTypeEnum.Error
    //             );
    //             return true;
    //         } 
    //         else if(!(!!LastName.lastName.value))
    //         {
    //             messageRef.current.showMessage(
    //                 "Please enter last name.",
    //                 NotificationMessageTypeEnum.Error
    //             );
    //             return true;
    //         }
    //         else if(!(state.gilad))
    //         {
    //             messageRef.current.showMessage(
    //                 "You must confirm you have written and signed authorization from the customer before proceeding.",
    //                 NotificationMessageTypeEnum.Error
    //             );
    //             return true;
    //         }
           
    //         getData(AccountNumber.accountNumber.value, LastName.lastName.value, 1);
    //     } else {
    //         
    //         monthValue = Month.length == 1 ? "0" + Month : Month;
    //         dayValue = Day.length == 1 ? "0" + Day : Day;
    //         const date = Year + monthValue + dayValue;
    //         if(!(!!AccountNumber.accountNumber.value) &&  !(!!date))
    //         {
    //             messageRef.current.showMessage(
    //                 "Please enter all manadatory fields.",
    //                 NotificationMessageTypeEnum.Error
    //             );
    //             return true;
    //         } else if(!(!!AccountNumber.accountNumber.value))
    //         {
    //             messageRef.current.showMessage(
    //                 "Please enter account number.",
    //                 NotificationMessageTypeEnum.Error
    //             );
    //             return true;
    //         } else if(AccountNumber.accountNumber.value.length<12) 
    //         {
    //             messageRef.current.showMessage(
    //                 "Please enter a valid account number.",
    //                 NotificationMessageTypeEnum.Error
    //             );
    //             return true;
    //         }
            
    //         else if(!(!!date))
    //         {
    //             messageRef.current.showMessage(
    //                 "Please enter date of birth.",
    //                 NotificationMessageTypeEnum.Error
    //             );
    //             return true;
    //         }

    //         else if( !(!!Year) ||  !(!!monthValue)  || !(!!dayValue))
    //         {
    //             messageRef.current.showMessage(
    //                 "Please enter date of birth.",
    //                 NotificationMessageTypeEnum.Error
    //             );
    //             return true;
    //         }
    //         else if(!(state.gilad))
    //         {
    //             messageRef.current.showMessage(
    //                 "You must confirm you have written and signed authorization from the customer before proceeding.",
    //                 NotificationMessageTypeEnum.Error
    //             );
    //             return true;
    //         }
    //         getData(AccountNumber.accountNumber.value, Year + monthValue + dayValue, 2)
    //     }
    //     // localStorage.setItem("searchParam", JSON.stringify({
    //     //   contractAccountNumber: AccountNumber.accountNumber.value,
    //     //   searchBy: BankAccount === 1 ? LastName.lastName.value : Year + monthValue + dayValue,
    //     //   searchType: BankAccount === 1 ? 1 : 2
    //     // }));
    //     // setShowdiv(true);
    // }

    let monthValue = "", dayValue = "";
    const searchClick = () => {
      if (BankAccount === "No") {
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
  
        getData(AccountNumber.accountNumber.value, Year + monthValue + dayValue, 2);
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
  
        getData(AccountNumber.accountNumber.value, LastName.lastName.value, 1);
      }
      // localStorage.setItem("searchParam", JSON.stringify({
      //   contractAccountNumber: AccountNumber.accountNumber.value,
      //   searchBy: BankAccount === 1 ? LastName.lastName.value : Year + monthValue + dayValue,
      //   searchType: BankAccount === 1 ? 1 : 2
      // }));
    }

    const getData = (contractAccountNumber, searchBy, searchType) => {
        //
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
                            // setCancelPopUp(false);
                            setLoading(false);
                            setData(res.data.data);
                            localStorage.setItem("customerM", JSON.stringify(res.data.data));
                            return;
                        } else {
                            setLoading(false);
                            setData(res.data.data);
                        }
                    } else {
                        setLoading(false);
                    }
                } else {
                    //setCancelPopUp(false);


                    if (res.response.data.status.message === "No Relevent Record found") {
                        messageRef.current.showMessage(
                            "Customer not found. Please confirm all fields completed accurately according to the information on file with Southwest Gas.",
                            NotificationMessageTypeEnum.Error
                        );
                    } else {
                        messageRef.current.showMessage(
                            res.response.data.status.message,
                            NotificationMessageTypeEnum.Error
                        );
                    }

                    setData({});
                    setLoading(false);
                }

                localStorage.setItem("customerM", null);
            }
        );
    }


    // const searchClick = () => {
    //   let monthValue = "", dayValue = "";
    //   if (BankAccount === 1) {
    //     console.log("Account", AccountNumber.accountNumber.value);
    //     console.log("Last name", LastName.lastName.value);
    //     console.log("search type", 1);
    //   } else {
    //     console.log("Account", AccountNumber.accountNumber.value);
    //     console.log("Month", Month);
    //     console.log("Day", Day);
    //     console.log("Year", Year);
    //     console.log("search type", 2);

    //     monthValue = Month.length == 1 ? "0" + Month : Month;
    //     dayValue = Day.length == 1 ? "0" + Day : Day;
    //     console.log("Params", Year + monthValue + dayValue);
    //   }
    //   localStorage.setItem("searchParam", JSON.stringify({
    //     contractAccountNumber: AccountNumber.accountNumber.value,
    //     searchBy: BankAccount === "Yes" ? LastName.lastName.value : Year + monthValue + dayValue,
    //     searchType: BankAccount === "Yes" ? 1 : 2
    //   }));
    //   setShowdiv(true);
    // }

    //const handleBillingInformation = () => {
    //    // setShow(true)
    //    //setLoading(true);
    //    RequestHelper.POST(
    //        Pledge.GetCurrentBillDetail,
    //        { "accountNumber": "910000005222" },
    //        (res) => {
    //            if (res && res.status == StatusCodeEnum.OK) {
    //                if (res.data && res.data.status.code == StatusCodeEnum.OK) {
    //                    let result = [];
    //                    if (res.data.data.length == 0) {
    //                        setLoading(false);
    //                    } else {
    //                        const _res = res.data.data;
    //                        result = _res.map((m) => {
    //                            return {
    //                                //"contractAccount": m.contractAccount,
    //                                //"zipCode": m.zipCode,
    //                                //"businessPartner": m.businessPartner,
    //                                //"meterNo": m.meterNo,
    //                                //"nc_Col_Flag": m.nc_Col_Flag,
    //                                //"firstName": m.firstName,
    //                                //"middleName": m.middleName,
    //                                //"lastName": "MARTIN",
    //                                //"houseNum": m.houseNum,
    //                                //"street": m.street,
    //                                //"city": m.city,
    //                                //"region": m.region,
    //                                //"country": m.country,
    //                                //"postCode": m.postCode,
    //                                //"primary": m.primary,
    //                                //"secondary": m.secondary,
    //                                //"primary_Email": m.primary_Email,
    //                                //"secondary_Email": m.secondary_Email,
    //                                //"message": m.message,
    //                                //"paperless": m.paperless,
    //                                //"sendControl_gp": m.sendControl_gp,
    //                                //"houseNo_Service": m.houseNo_Service,
    //                                //"street_Service": m.street,
    //                                //"apartment_Service": m.apartment_Service,
    //                                //"city_Service": m.city,
    //                                //"region_Service": m.region_Service,
    //                                //"country_Service": m.country_Service,
    //                                //"postCode_Service": m.postCode_Service,
    //                                //"dateOfBirth": m.dateOfBirth,
    //                                //"contractAccountExt": m.contractAccountExt,
    //                                //"enterprise": m.enterprise,
    //                            };
    //                        });
    //                        setLoading(false);
    //                        setSearchData(result);
    //                        setData(result);
    //                    }
    //                } else {
    //                    setLoading(false);
    //                }
    //            } else {
    //                // messageRef.current.showMessage(
    //                //   res.response.data.status.message,
    //                //   NotificationMessageTypeEnum.Error
    //                // );
    //                setLoading(false);
    //            }
    //        }
    //    );
    //};
    const handleClickOpen = () => {
        setOpen(true);
    };

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

    const classes = useStyles();
    const { gilad } = state;
    return (
        <div className='rows'>
            <MessageBox ref={messageRef} />
            {loading && (
                <Loader />
            )}
            <div class="stepone">
                <div className='accountarea'>
                    <div class="grouppay ">
                        <div id="addPledgeSection1" className="srchsecmakepledge">
                            <Typography component="em" color="primary">Find Customer</Typography>
                            <FormControl component="fieldset" className={'formctrlprop turnonoffsteps'}>
                                <RadioGroup aria-label="gender" name="BankAccount" className={'radiouproperty'} value={BankAccount} onChange={handleChangeradio}>
                                    <FormControlLabel className={classes.optionlabel} value="No" control={<Radio color="primary" />} onClick={handleClick} label="By Account Number and Date of Birth" labelPlacement="last" /><br />
                                    <FormControlLabel className={`w-100 ${classes.optionlabel}`} value="Yes" control={<Radio color="primary" />} onClick={handleOnClick} label="By Account Number and Last Name" labelPlacement="last" />
                                </RadioGroup>
                            </FormControl>

                            <TextField
                                error={error}
                                helperText={
                                    error
                                        ? validationMessage("accountNumber", AccountNumber.accountNumber.value)
                                        : ""
                                }
                                id="accountNumber"
                                label="Account Number"
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
                                    maxLength: 13,
                                    //'aria-label': 'Enter Account Number',
                                    //invaliderrormessage: "Enter Account Number",
                                    //validatemessage: "Enter Account Number",
                                    mandatory: '1'
                                }}
                            />
                            {BankAccount === "Yes" &&
                                <TextField
                                    error={errorLastName}
                                    helperText={
                                        errorLastName
                                            ? validationMessage("lastName",LastName.lastName.value)
                                            : ""
                                    }
                                    id="lastName"
                                    label="Last Name"
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
                                        // maxLength: 12,
                                        'aria-label': 'Enter Last Name',
                                        invaliderrormessage: "Enter Last Name",
                                        validatemessage: "Enter Last Name",
                                        mandatory: '1'
                                    }}
                                />

                            }
                            {BankAccount === "No" &&
                                // <div>
                                //   <FormControl variant="filled" style={{ width: '32.6%' }}>
                                //     <InputLabel id="demo-simple-select-filled-label">Month *</InputLabel>
                                //     <Select
                                //       name="Month"
                                //       value={Month}
                                //       onChange={handleChangeradio}
                                //     >
                                //       {months.map(option => (
                                //         <MenuItem key={option.value} value={option.value}>
                                //           {option.text}
                                //         </MenuItem>
                                //       ))}
                                //     </Select>
                                //   </FormControl>
                                //   <FormControl variant="filled" style={{ width: '32.6%', marginLeft: '3px', marginRight: '3px' }}>
                                //     <InputLabel id="demo-simple-select-filled-label">Day *</InputLabel>
                                //     <Select
                                //       name="Day"
                                //       value={Day}
                                //       onChange={handleChangeradio}
                                //     >
                                //       {days().map(option => (
                                //         <MenuItem key={option.value} value={option.value}>
                                //           {option.text}
                                //         </MenuItem>
                                //       ))}
                                //     </Select>
                                //   </FormControl>
                                //   <FormControl variant="filled" style={{ width: '32.6%' }}>
                                //     <InputLabel id="demo-simple-select-filled-label">Year *</InputLabel>
                                //     <Select
                                //       name="Year"
                                //       value={Year}
                                //       onChange={handleChangeradio}
                                //     >
                                //       {years().map(option => (
                                //         <MenuItem key={option.value} value={option.value}>
                                //           {option.text}
                                //         </MenuItem>
                                //       ))}
                                //     </Select>
                                //   </FormControl>
                                // </div>
                                <>
                                <InputLabel className="dob-label" htmlFor="filled-age-simple">Customer Date of Birth</InputLabel>
                                <DateOfBirth isLabelVisible={false} 
                                    dayChange={dayChange} monthChange={monthChange} yearChange={yearChange} 
                                    errorMonth={errorMonth} errorDay={errorDay} errorYear={errorYear}
                                />
                                </>
                            }
                            <div className="dashboardPerform mb-4">
                                <FormControlLabel
                                    control={<Checkbox checked={gilad} onChange={handleChangeCheck} name="gilad" />}
                                    label="By performing a search, I confirm written and signed authorization from the customer is on file."
                                />
                            </div>


                            <Button aria-label="click here to search" className="btn-style border-width-2 make-pledge-btn" onClick={searchClick} variant="outlined" color="secondary"  >
                                Search
              </Button>
                            <Button aria-label="click here to clear" className="btn-style border-width-2 ml-2 make-pledge-btn" color="secondary" variant="outlined" onClick={clearOnClick} >Clear</Button>

                        </div>
                        {Object.keys(data).length > 0 &&
                            <div id="results" className="foundmatchbox">
                                <Typography component="em" color="primary">We found a match</Typography>
                                {/* <Alert onClose={handleClose} severity="error" className={classes.positionStatic}>
                  A paymentof $ x by date x is required. Lorem Ipsum
                  </Alert> */}
                                <AccordionList data={data} />
                            </div>
                        }
                        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={show}
                            classes={{ paper: classes.dialogPaper }}
                            aria-labelledby="scroll-dialog-title"
                            aria-describedby="scroll-dialog-description"
                            disableBackdropClick
                            disableEscapeKeyDown
                            TransitionComponent={Transition}
                        >
                            <DialogTitle id="customized-dialog-title">
                                Matching Accounts<br />
                                <span {...css(txttbl)}>There are 3 accounts that match your search criteria. Please select one to continue.</span>
                            </DialogTitle>
                            <DialogContent className={classes.CustomBodyDialog} dividers={scroll === 'paper'}>
                                <SelectedAccountData />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="secondary">Cancel</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>

        </div>
    );
}