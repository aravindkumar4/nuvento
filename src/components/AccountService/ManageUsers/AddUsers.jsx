import "date-fns";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import MessageBox from "../../../shared/Views/MessageBox";
import Loader from "../../../shared/Views/Loader";
import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from "../../../core/Enum";
import RequestHelper from "../../../common/RequestHelper";
import { css } from 'glamor';
import { ValidateSinglePage, HandleCutCopyPasteRule } from '../../../core/common/validate';

const useStyles = makeStyles((theme) => ({
    row: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.default,
        },
    },
    Fcontainer: {
        marginTop: 25,
    },
}));

var allFields = ["role","fName","lName","email"];

export default function EditUserPopup(props) {
    const [role, setRole] = React.useState([]);
    const messageRef = React.useRef(null);
    const [loading, setLoading] = React.useState(true);

    const [roleText, setRoleText] = React.useState('');
    const [fName, setfName] = React.useState('');
    const [lName, setlName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [errorRole, setErrorRole] = React.useState(false);
    const [errorfName, setErrorfName] = React.useState(false);
    const [errorlName, setErrorlName] = React.useState(false);
    const [errorEmail, setErrorEmail] = React.useState(false);
    const [errorEmailMsg, setErrorEmailMsg] = React.useState('');
    const [errorAccessUntil, setErrorAccessUntil] = React.useState(false);
    
    const roleChange = (e) => {
        setRoleText(e.target.value)
        allFields = allFields.filter(x => x !="role");
        setErrorRole(false);
    }

    React.useEffect(() => {
        setLoading(true);
        const url = "Role/GetAll";
        const params = "";

        RequestHelper.GET(url, APIURLTypeEnum.Agency, params, (res) => {
            if (res && res.status == StatusCodeEnum.OK) {
                if (res.data) {
                    if (res.data.data) {
                        setLoading(false);
                        setRole(res.data.data);
                    } else {
                    }
                } else {
                    setRole(res.data.data);
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
    }, []);

    const classes = useStyles();
    const handleDateChange = (date) => {
       setSelectedDate(formatDate(date).displayDate);
       setSendDate(formatDate(date).sendDate);
    };
    const handleAccessUntilChange = (date) => {
        
        setSelectedDate(date);
        if(date==null){
            allFields=allFields.filter(x => x !="accessUntil");
           // if(allFields.indexOf("accessUntil") == -1)
            //allFields.push("accessUntil");
            setErrorAccessUntil(false);
        }
        else if(date.toString()=="Invalid Date"){
            allFields=allFields.filter(x => x !="accessUntil");
            if(allFields.indexOf("accessUntil") == -1)
            allFields.push("accessUntil");
            setErrorAccessUntil(true);
        }
        else {
            //allFields=allFields.filter(x => x !="accessUntil");
            //setErrorAccessUntil(false);
        }
            
     };
    const [selectedDate, setSelectedDate] = React.useState(
        null
    );
    const getTommorrowDate = () =>{
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    }

    const [minDate, setMinDate] = React.useState(
        getTommorrowDate
    );

    const [sendDate, setSendDate] = React.useState('');

    const formatDate = (date) => {
    
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return { displayDate: [year, month, day].join('-'), sendDate: [month, day, year].join('-') };
    }

    const onTextChange = (event) => {
        if (event.target.id == "firstName") {
            setfName(event.target.value);
            if(event.target.value !==""){
                allFields=allFields.filter(x => x !="fName");
                setErrorfName(false);
            }
            else {
                if(allFields.indexOf("fName") == -1)
                allFields.push("fName");
                setErrorfName(true);
            }
        }
        if (event.target.id == "lastName") {
            setlName(event.target.value);
            if(event.target.value !==""){
                allFields=allFields.filter(x => x !="lName")
                setErrorlName(false);
            }
            else {
                if(allFields.indexOf("lName") == -1)
                allFields.push("lName");
                setErrorlName(true);
            }
        }
        if (event.target.id == "email") {
            setEmail(event.target.value);
            if(event.target.value !==""){
                allFields=allFields.filter(x => x !="email");
                setErrorEmail(false);
                setErrorEmailMsg("");
            }
            else {
                if(allFields.indexOf("email") == -1)
                allFields.push("email");
                setErrorEmail(true);
                setErrorEmailMsg("");
            }
        }
    };

    const handleClose = () => {
        props.triggerClose();
    }

    const handleCloseOnSave = (m) => {
        props.triggerClose(m);
    }

    const inviteGuestUser = () => {
        //User Role validation
        // if (!roleText) {
        //     messageRef.current.showMessage(
        //         "Please select User Role.",
        //         NotificationMessageTypeEnum.Error
        //     );

        //     return;
        // }

        // if (ValidateSinglePage("addUserSection", "Please enter all the mandatory information.")) {
        //     if (!selectedDate) {
        //         messageRef.current.showMessage(
        //             "Please enter Access Until date.",
        //             NotificationMessageTypeEnum.Error
        //         );
        //         return;
        //     }

        //     inviteGuestUserSave();
        // } else {
        //     messageRef.current.showMessage(
        //         "Please enter all the mandatory information.",
        //         NotificationMessageTypeEnum.Error
        //     );
        // }
        

    
        if(allFields.length > 1){
            messageRef.current.showMessage(
                "Please enter all the mandatory information.",
                NotificationMessageTypeEnum.Error
            );
        }else{
            if(allFields.length==1){
            switch(allFields[0]) {
                case "role":
                    setErrorRole(true);
                  break;
                case "fName":
                  setErrorfName(true);
                  break;
                case "lName":
                  setErrorlName(true);
                  break;
                case "email":
                  setErrorEmail(true);
                  break;
                // case "accessUntil":
                //   setErrorAccessUntil(true);
                //   break;
              }
            }else{
                if(email !== ""){
                    var RegxEmailFilter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    if (!RegxEmailFilter.test(email)) {
                        setErrorEmailMsg("Please enter a valid Email Address.");
                        setErrorEmail(true);
                        return;
                    }else{
                        setErrorEmailMsg("");
                        setErrorEmail(false);
                    }
                }
                if(!errorAccessUntil)
                inviteGuestUserSave();
            }
        }
    }
    //const [selectedDate, handleDateChange] = useState(new Date());
    const inviteGuestUserSave = () => {
        setLoading(true);
       
        RequestHelper.POST(
            "GuestUser/inviteGuestUser",
            APIURLTypeEnum.Agency,
            {
                ownerUserId: parseInt(localStorage.getItem("UserId")),
                roleId: parseInt(roleText),
                userFirstName: fName,
                userLastName: lName,
                primaryEMail: email,
                accessExpiryDate: selectedDate ? formatDate(selectedDate).displayDate : null ,
                agencyCustomerNumber: localStorage.getItem("AgencyNumber"),
            },
            (res) => {
                if (res && res.status == StatusCodeEnum.OK) {
                    if (res.data) {
                        if (res.data.data) {
                            setLoading(false);
                            // messageRef.current.showMessage(
                            //     res.data.status.message,
                            //     NotificationMessageTypeEnum.Success
                            // );
                            setRole(1);
                            setfName('');
                            setlName('');
                            setEmail('');
                            handleCloseOnSave("save");
                            allFields = ["role","fName","lName","email"];
                        } else {
                            setLoading(false);
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

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol lg="6" sm="8" xs="12" className="FormWrapper">
                    <div id="results" className="turnservicessteps">
                        <form
                            id="addUserSection"
                            variant="filled"
                            className={classes.Fcontainer}
                            noValidate
                            autoComplete="off"
                        >
                            <FormControl className="TextFieldWrapper" variant="filled" style={{ width: "100%" }} >
                                <InputLabel htmlFor="filled-age-simple">Select Guest Role</InputLabel>
                                <Select labelId="roleId-label"
                                    classes={{ icon: 'DropIconStyle' }}
                                    id="roleId"
                                    error={errorRole}
                                    value={roleText}
                                    onChange={roleChange}
                                    inputProps={{
                                        invaliderrormessage: "Please select Guest Role.",
                                        'aria-label': "Please select Guest Role",
                                        validatemessage: "Please select Guest Role.",
                                        mandatory: '1'
                                    }}
                                >
                                    {role.length > 0 &&
                                        role.map(n => {
                                            return (
                                                <MenuItem value={n.key}>{n.value}</MenuItem>
                                            );
                                        })}
                                </Select>
                                {errorRole && <FormHelperText style={{color:"red"}}>Please select Guest Role.</FormHelperText>}
                            </FormControl>
                            <TextField
                                className="TextFieldWrapper"
                                error={errorfName}
                                id="firstName"
                                label="User's First Name"
                                onChange={onTextChange}
                                value={fName}
                                //defaultValue="User's First Name"
                                variant="filled"
                                inputProps={{
                                    invaliderrormessage: "Please enter User's First Name.",
                                    validatemessage: "Please enter User's First Name.",
                                    mandatory: "1",
                                    validationtype: "3",
                                    "aria-label": "Please enter User's First Name"
                                }}
                            />
                            {errorfName && <FormHelperText style={{color:"red"}}>Please enter User's First Name.</FormHelperText>}
                            <TextField
                                className="TextFieldWrapper"
                                error={errorlName}
                                id="lastName"
                                label="User's Last Name"
                                value={lName}
                                onChange={onTextChange}
                                //defaultValue="User's Last Name"
                                variant="filled"
                                inputProps={{
                                    invaliderrormessage: "Please enter User's Last Name.",
                                    validatemessage: "Please enter User's Last Name.",
                                    mandatory: "1",
                                    validationtype: "3",
                                    "aria-label": "Please enter User's Last Name"
                                }}
                            />
                            {errorlName && <FormHelperText style={{color:"red"}}>Please enter User's Last Name.</FormHelperText>}
                            <TextField
                                className="TextFieldWrapper"
                                id="email"
                                error={errorEmail}
                                helperText={errorEmailMsg}
                                label="Email Address"
                                onChange={onTextChange}
                                value={email}
                                //defaultValue=""
                                variant="filled"
                                inputProps={{
                                    validatemessage: "Please enter a valid Email Address. ",
                                    mandatory: "1",
                                    maxlength: "50",
                                    inputtype: "Email",
                                    'aria-label': "enter Email id"
                                }}
                            />
                            {errorEmail && errorEmailMsg=="" && 
                            <FormHelperText style={{color:"red"}}>Please enter Email Address.</FormHelperText>
                            }
                            <MuiPickersUtilsProvider
                                utils={DateFnsUtils}
                                className="TextFieldWrapper"
                            >
                                <KeyboardDatePicker
                                    autoOk
                                    className="TextFieldWrapper"
                                    error={errorAccessUntil}
                                    disableToolbar
                                    variant="inline"
                                    inputVariant="filled"
                                    label="Access Exp Date"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    value={selectedDate}
                                    onChange={date => handleAccessUntilChange(date)}
                                    minDate={minDate || undefined}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            {errorAccessUntil && selectedDate == null && 
                            <FormHelperText style={{color:"red"}}>Please select Access Exp Date.</FormHelperText>}
                            <div class="FormButtonsArea">
                                <Button aria-label="click here to cancel" color="secondary" className={"ButtonPrimary"} onClick={handleClose}>
                                    Cancel
                </Button>
                                <Button
                                    aria-label="click here to save"
                                    variant="contained"
                                    color="secondary"
                                    className={"ButtonPrimary"}
                                    onClick={inviteGuestUser}
                                >
                                    INVITE
                </Button>
                            </div>
                        </form>
                    </div>
                </MDBCol>
            </MDBRow>
            <MessageBox ref={messageRef} />
            {loading && (
                <Loader />
            )}
        </MDBContainer>
    );
}
