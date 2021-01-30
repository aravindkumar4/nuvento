import 'date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from '@material-ui/core/TextField';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MessageBox from "../../../shared/Views/MessageBox";
import Loader from "../../../shared/Views/Loader";
import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from "../../../core/Enum";
import RequestHelper from "../../../common/RequestHelper";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { ValidateSinglePage, HandleCutCopyPasteRule } from '../../../core/common/validate';
import moment from 'moment';
const useStyles = makeStyles(theme => ({
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    Fcontainer: {
        marginTop: 25,
    }
}));
var allFields = [];
export default function EditUserPopup(props) {
    const [role, setRole] = React.useState([]);
    const { guestId, name, email, expiryDate, popupprop } = props;
    const [userName, setUserName] = React.useState(name.replace(/  +/g, ' '));
    const [userEmail, setUserEmail] = React.useState(email);
    const messageRef = React.useRef(null);
    const [loading, setLoading] = React.useState(false);
    const [roleText, setRoleText] = React.useState('1');

    const [errorRole, setErrorRole] = React.useState(false);
    const [errorEmail, setErrorEmail] = React.useState(false);
    const [errorEmailMsg, setErrorEmailMsg] = React.useState('');
    const [errorAccessUntil, setErrorAccessUntil] = React.useState(false);
    if (!popupprop) {
        allFields = [];
    }
    const roleChange = (e) => {
        setRoleText(e.target.value)
        allFields = allFields.filter(x => x != "role");
        setErrorRole(false);
    }

    const converDateCalenderFormat = (date) => {
        
        if (date) {
            const result = date.replace('-', '/').replace('-', '/').toString();
            return result;
        } else {
            return null;
        }

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

                        const value = res.data.data.filter(item => item.value === props.roleName);
                        if (value) {
                            setRoleText(value[0] && value[0].key);
                            if (value[0] == undefined) {
                                if (allFields.indexOf("role") == -1)
                                    allFields.push("role")
                            }
                        }
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
    // const handleDateChange = date => {
    //     if(date == null){
    //         setSelectedDate(date);
    //     }else{
    //         setSelectedDate(formatDate(date));
    //     }
    // };
    const onOpen = date => {
       
        if (date) {
            setTimeout(() => setSelectedDate(expiryDate), 0);
        }
    }

    const handleDateChange = date => {
        
        if (date == null) {
            allFields = allFields.filter(x => x != "accessUntil");
            setSelectedDate(date);
            setErrorAccessUntil(false);
        }
        else if (date.toString() == "Invalid Date") {
            allFields = allFields.filter(x => x != "accessUntil");
            setSelectedDate(date);
            setErrorAccessUntil(true);
        }
        else if (date < new Date()) {
            allFields = allFields.filter(x => x != "accessUntil");
            setSelectedDate(date);
            setErrorAccessUntil(true);
        }
        else {
            allFields = allFields.filter(x => x != "accessUntil");
            if (date) {
                setSelectedDate(date);
                setErrorAccessUntil(false);
            }
        }
    };

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const handleChange = e => {
        if (e.target.id == "Name") {
            setUserName(e.target.value);
        } else {
            setUserEmail(e.target.value);
            if (e.target.value !== "") {
                allFields = allFields.filter(x => x != "email");
                setErrorEmail(false);
                setErrorEmailMsg("");
            }
            else {
                if (allFields.indexOf("email") == -1)
                    allFields.push("email");
                setErrorEmail(true);
                setErrorEmailMsg("");
            }
        }
    };

    const handleClose = () => {
        props.triggerClose();
        allFields = [];
    }

    const editRecords = () => {
        // if (ValidateSinglePage("editUserSection", "Please enter all the mandatory information.")) {
        //     editRecordsSave();
        // }
        if (allFields.length > 1) {
            messageRef.current.showMessage(
                "Please enter all the mandatory information.",
                NotificationMessageTypeEnum.Error
            );
        } else {
            if (allFields.length == 1) {
                switch (allFields[0]) {
                    case "role":
                        setErrorRole(true);
                        break;
                    case "email":
                        setErrorEmail(true);
                        break;
                    // case "accessUntil":
                    //     setErrorAccessUntil(true);
                    //     break;
                }
            } else {
                if (userEmail !== "") {
                    var RegxEmailFilter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    if (!RegxEmailFilter.test(userEmail)) {
                        setErrorEmailMsg("Please enter a valid Email Address.");
                        setErrorEmail(true);
                        return;
                    } else {
                        setErrorEmailMsg("");
                        setErrorEmail(false);
                    }
                }
                if (!errorAccessUntil)
                    editRecordsSave();
            }
        }
    }

    const editRecordsSave = () => {
        
        setLoading(true);
        //
        //  "https://d2.smartcmobile.net/SWG-Agency-API/api/1/GuestUser/Update?id=" + guestId,
        let url = "GuestUser/Update?id=" + guestId;
        const params = {
            userId: parseInt(localStorage.getItem("UserId")),
            userFirstName: userName.split(' ')[0],
            userLastName: userName.split(' ')[1],
            primaryEMail: userEmail,
            accessExpiryDate: selectedDate ? formatDate(selectedDate) : null,
            roleId: roleText
        };

        RequestHelper.PUT1(
            url,
            APIURLTypeEnum.Agency,
            params,
            (res) => {
                //
                let r = role;
                params.guestId = guestId;

                var result = r.find(obj => {
                    return obj.key === params.roleId
                })
                params.roleName = result.value;

                if (res && res.status == StatusCodeEnum.OK) {
                    if (res.data) {
                        if (res.data.status.message == "success") {
                            //props.triggerClose();
                            setLoading(false);
                            props.triggerClose(params, "Guest User has been updated.", NotificationMessageTypeEnum.Success);
                            //messageRef.current.showMessage(
                            //    "Guest User has been updated",
                            //    NotificationMessageTypeEnum.Success
                            //);
                            setUserName('');
                            setUserEmail('');
                        } else {
                            setLoading(false);
                            props.triggerClose(params, "Guest User has not been updated.", NotificationMessageTypeEnum.Error);
                        }
                    } else {
                        setLoading(false);
                        props.triggerClose(params, "Guest User has not been updated.", NotificationMessageTypeEnum.Error);
                    }
                } else {
                    //messageRef.current.showMessage(
                    //    res.response.data.status.message,
                    //    NotificationMessageTypeEnum.Error
                    //);
                    setLoading(false);
                    props.triggerClose(params, "Guest User has not been updated.", NotificationMessageTypeEnum.Error);
                }
            }
        );
    }

    const getTommorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    }

    const [selectedDate, setSelectedDate] = React.useState(converDateCalenderFormat(expiryDate));

    const [minDate, setMinDate] = React.useState(getTommorrowDate);

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol lg="6" sm="8" xs="12" className="FormWrapper">
                    <div id="results" className="turnservicessteps"  >
                        <form id="editUserSection" variant="filled" className={classes.Fcontainer} noValidate>
                            <FormControl className="TextFieldWrapper" variant="filled" style={{ width: "100%" }} >
                                <InputLabel htmlFor="filled-age-simple">Select Guest Role</InputLabel>
                                <Select error={errorRole} classes={{ icon: 'DropIconStyle' }} inputProps={{ 'aria-label': "select Guest Role" }} labelId="roleId-label" id="roleId" value={roleText} onChange={roleChange}>
                                    {role.length > 0 &&
                                        role.map(n => {
                                            return (
                                                <MenuItem value={n.key}>{n.value}</MenuItem>
                                            );
                                        })}
                                </Select>
                                {errorRole && <FormHelperText style={{ color: "red" }}>Please select Guest Role.</FormHelperText>}
                            </FormControl>
                            <TextField className="TextFieldWrapper"
                                id="Name"
                                label="Name"
                                defaultValue=""

                                value={userName}
                                onChange={handleChange}
                                variant="filled"
                                inputProps={{
                                    invaliderrormessage: "Please enter User's Name.",
                                    validatemessage: "Please enter User's Name.",
                                    mandatory: "1",
                                    validationtype: "3",
                                    "aria-label": "enter User Name",
                                    readOnly: true,
                                }}
                            />
                            <TextField className="TextFieldWrapper"
                                error={errorEmail}
                                helperText={errorEmailMsg}
                                id="Email"
                                label="Email Address"
                                defaultValue=""
                                onChange={handleChange}
                                variant="filled"
                                value={userEmail}
                                inputProps={{
                                    validatemessage: "Please enter a valid Email Address. ",
                                    mandatory: "1",
                                    maxlength: "50",
                                    inputtype: "Email",
                                    'aria-label': "enter Email id"
                                }}
                            />
                            {errorEmail && errorEmailMsg == "" &&
                                <FormHelperText style={{ color: "red" }}>Please enter Email Address.</FormHelperText>
                            }
                            <MuiPickersUtilsProvider utils={DateFnsUtils} className="TextFieldWrapper">
                                <KeyboardDatePicker className="TextFieldWrapper"
                                    disableToolbar
                                    error={errorAccessUntil}
                                    autoOk={true}
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Access Exp Date"
                                    inputVariant="filled"
                                    value={selectedDate}
                                    onOpen={onOpen}
                                    onChange={handleDateChange}
                                    minDate={minDate || undefined}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            {errorAccessUntil && selectedDate == null && <FormHelperText style={{ color: "red" }}>Please select Access Exp Date.</FormHelperText>}
                            <div class="FormButtonsArea">
                                <Button aria-label="click here to cancel" color="secondary" onClick={handleClose} className={'ButtonPrimary'}>Cancel</Button>
                                <Button aria-label="click here to save" variant="contained" color="secondary" className={'ButtonPrimary'} onClick={editRecords}>Save</Button>
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
