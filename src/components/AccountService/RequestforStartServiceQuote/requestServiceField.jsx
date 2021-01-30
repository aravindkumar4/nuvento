import "date-fns";
import { withStyles } from '@material-ui/core/styles';
import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { MDBNavLink } from 'mdbreact';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ValidateSinglePage, HandleCutCopyPasteRule, NumericOnly } from '../../../../src/core/common/validate';
import MessageBox from '../../../Shared/Views/MessageBoxV1'
import Loader from '../../../Shared/Views/Loader'
import RequestHelper from "../../../common/RequestHelper";
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { StatusCodeEnum, NotificationMessageTypeEnum, APIURLTypeEnum } from "../../../core/Enum";
import { Pledge } from "../../../core/URLConfig";
import DateOfBirth from "../../../../src/common/DateOfBirth";
import C4CService from "../../Pledges/C4CService/C4CService";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    row: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.default,
        },
    },
    Fcontainer: {
        marginTop: 25,
    },
    ButtonOutlined: {
        padding: '6px 35px',
        textTransform: 'uppercase',
        fontSize: '0.875rem',
        lineHeight: 1.75,
        marginLeft: '10px',
        color: theme.palette.secondary.main,
        "&:hover": {
            color: '#098169',
            backgroundColor: 'transparent'
        }
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

class RequestServiceField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            agreeChecked: false,
            readOnly: true,
            customerName: '',
            lName: '',
            addressLine1: '',
            addressLine2: '',
            loading: false,
            city: '',
            readOnly: true,
            roleText: '',
            zipCode: '',
            remitEmail: '',
            Day: '',
            Month: '',
            Year: '',
            priorAcctNum: ''
        };
        this.massegeRef = React.createRef();
        this.handleFocus = this.handleFocus.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.roleChange = this.roleChange.bind(this);
        this.createServiceRequest = this.createServiceRequest.bind(this);

    }
    handleFocus = () => {
        this.setState({
            readOnly: false
        })
    }

    roleChange = (e) => {
        this.setState({
            roleText: e.target.value
        })
    }

    agreeChkChange = (e) => {
        this.setState({
            agreeChecked: e.target.checked
        })
    }

    dayChange = (day) => {
        this.setState({
            Day: day
        })
    }
    monthChange = (month) => {
        if (month == 2 && this.state.Day > 29) {
            this.setState({
                Day: ''
            })
        }
        if (month == 4 && this.state.Day > 30) {
            this.setState({
                Day: ''
            })
        }
        if (month == 6 && this.state.Day > 30) {
            this.setState({
                Day: ''
            })
        }
        if (month == 9 && this.state.Day > 30) {
            this.setState({
                Day: ''
            })
        }
        if (month == 11 && this.state.Day > 30) {
            this.setState({
                Day: ''
            })
        }
        this.setState({
            Month: month
        })
    }

    yearChange = (year) => {
        this.setState({
            Year: year
        })
    }

    onTextChange = (event) => {
        if (event.target.id == "customerName") {
            this.setState({
                customerName: event.target.value
            })
        }
        if (event.target.id == "lastdigits") {
            this.setState({
                lName: event.target.value
            })
        }
        if (event.target.id == "addressLine1") {
            this.setState({
                addressLine1: event.target.value
            })
        }
        if (event.target.id == "addressLine2") {
            this.setState({
                addressLine2: event.target.value
            })
        }
        if (event.target.id == "city") {
            this.setState({
                city: event.target.value
            })
        }
        if (event.target.id == "zipCode") {
            event.target.value = NumericOnly(event.target.value);
            this.setState({
                zipCode: event.target.value
            })
        }
        if (event.target.id == "priorAcctNum") {
            event.target.value = NumericOnly(event.target.value);
            this.setState({
                priorAcctNum: event.target.value
            })
        }
        if (event.target.id == "remitEmail") {
            this.setState({
                remitEmail: event.target.value
            })
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        //const { username, password, returnUrl } = this.state;
        if (ValidateSinglePage("startServiceForm", "Please enter all the mandatory information.")) {
            if (!this.state.agreeChecked) {
                this.massegeRef.current.showMessage("error", "You must confirm you have written and signed authorization from the customer before proceeding.");
                return true;
            }
            this.createServiceRequest();
            return true;
        }

        else {
            this.massegeRef.current.showMessage("error", "Please enter all the mandatory information.");
            return true;
        }

    };

    goBack = () => {
        this.props.history.push({
            pathname: "/Dashboard"
        });
    }

    getFormattedAddress() {
        if (!arguments) {
            return "";
        }

        var str = "";
        for (var i = 0; i < arguments.length; i++) {
            str += addressFieldFormatter(arguments[i]);
        }

        str = str.trim();
        str = str.replace(/\,$/, '');//remove comma at the end

        return str;

        function addressFieldFormatter(field) {
            if (!field) {
                return "";
            }

            field = field.trim();//remove spaces

            if (field.charAt(field.length - 1) !== ',') {//add comma if not existing at the end
                field += ",";
            }

            field += " ";

            return field;
        }
    }

    dateToYMD(date) {
        var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var d = date.getDate();
        var m = strArray[date.getMonth()];
        var y = date.getFullYear();
        return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
    }

    createServiceRequest() {
        this.setState({
            loading: true
        });
        //

        const agencyData = JSON.parse(localStorage.getItem("UData"));

        const fullAddress = this.getFormattedAddress(this.state.addressLine1, this.state.addressLine2, this.state.city) + " " +
            this.state.roleText + " " + this.state.zipCode;

        const dob = new Date(this.state.Year + "/" + this.state.Month + "/" + this.state.Day);
        const dobString = this.dateToYMD(dob);

        const priorAccNum = this.state.priorAcctNum;

        let text = `Pledging Agency: ${agencyData.agency[0].agencyName};\nBP of Pledging Agency: ${agencyData.agency[0].agencyNumber};\nAgency User ${agencyData.userName} ${agencyData.firstName} ${agencyData.lastName};\n ${agencyData.emailAddress};\nCustomer Name: ${this.state.customerName}\nDate Of Birth: ${dobString}\nAddress: ${fullAddress}\n${this.state.remitEmail}`;

        if (priorAccNum) {
            text += 'Prior Account Number: ' + priorAccNum;
        }
        C4CService.serviceEstablishmentQuoteLetterRequest(text, (res) => {
            //


            const { status, data, statusText } = res;
            var self = this;

            this.ServiceQuatRequest(data, (resp) => {
                if (resp == "success") {
                    if (status) {
                        if (res.status == StatusCodeEnum.OK) {
                            self.setState({ loading: false });
                            self.props.history.push({
                                pathname: "/ThankyouSuccess"
                            });
                        }
                        else {
                            self.massegeRef.current.showMessage("error", "You have not successfully submitted your request.")
                        }
                    } else {
                        self.massegeRef.current.showMessage("error", "You have not successfully submitted your request.")
                    }
                }
            })
            self.setState({ loading: false });
        });
    }

    ServiceQuatRequest = (details, calback) => {
        const parsedata = JSON.parse(localStorage.getItem("UData"));
        const url = "Agency/ServiceQuat";
        const parmas = {
            "agencyid": parsedata.agency[0].agencyId,
            "agencyName": parsedata.agency[0].agencyName,
            "userid": parsedata.userId,
            "customerName": this.state.customerName,
            "priorAccountNumber": this.state.priorAcctNum,
            "addressLine1": this.state.addressLine1,
            "addressLine2": this.state.addressLine2,
            "city": this.state.city,
            "state": this.state.roleText,
            "zipCode": this.state.zipCode,
            "remitemailAddress": this.state.remitEmail
        }

        RequestHelper.POST(url, APIURLTypeEnum.Agency, parmas, (res) => {
            if (res && res.status == StatusCodeEnum.OK) {
                if (res.data.status.code == StatusCodeEnum.OK && res.data.status.type == "success") {
                    calback("success")
                }
                else {
                    this.massegeRef.current.showMessage(
                        NotificationMessageTypeEnum.Error,
                        res.data.status.message
                    );
                }
            }
            else {
                this.massegeRef.current.showMessage(
                    NotificationMessageTypeEnum.Error,
                    res.response.data.status.message,
                );
            }
        })
    }

    render() {
        const { readOnly, loading, agreeChecked, customerName, lName, addressLine1, addressLine2, city, roleText, zipCode, remitEmail } = this.state;
        const { classes } = this.props;
        return (
            <>
                {loading && (
                    <Loader />
                )}
                <MessageBox ref={this.massegeRef} />
                <MDBRow>
                    <MDBCol lg="12" sm="12" xs="12" className="FormWrapper">
                        <div id="results" className="turnservicessteps">
                            <form
                                variant="filled"
                                className={classes.Fcontainer}
                                noValidate
                                autoComplete="off"
                                id="startServiceForm"
                            >
                                <TextField
                                    className="TextFieldWrapper"

                                    id="customerName"
                                    label="Customer Name"
                                    onChange={this.onTextChange}
                                    onFocus={this.handleFocus}
                                    value={customerName}
                                    variant="filled"
                                    inputProps={{
                                        mandatory: "1",
                                        validationtype: "3",
                                        validatemessage: "Please enter Customer Name.",
                                        "aria-label": "enter Customer Name",
                                        readOnly: Boolean(readOnly)
                                    }}
                                />
                                {/*  <TextField
                                    className="TextFieldWrapper"
                                    id="lastdigits"
                                    label="Last 4 Digits of Customer ID"
                                    onChange={this.onTextChange}
                                    onFocus={this.handleFocus}
                                    value={lName}
                                    variant="filled"
                                    inputProps={{
                                        mandatory: "1",
                                        validationtype: "3",
                                        validatemessage: "Please enter last 4 Digits of Customer ID.",
                                        "aria-label": "Please enter last 4 Digits of Customer ID",
                                        readOnly: Boolean(readOnly)
                                    }}
                                /> */}
                                <InputLabel className="dob-label mb-0" htmlFor="filled-age-simple">Customer Date of Birth</InputLabel>
                                <DateOfBirth
                                    isLabelVisible={false}
                                    dayChange={this.dayChange}
                                    monthChange={this.monthChange}
                                    yearChange={this.yearChange} />

                                <TextField
                                    className="TextFieldWrapper"
                                    id="priorAcctNum"
                                    label="Prior Account Number (optional)"
                                    onChange={this.onTextChange}
                                    onFocus={this.handleFocus}
                                    value={this.state.priorAcctNum}
                                    variant="filled"
                                    inputProps={{
                                        InputType: "AccountNumber",
                                        maxlength: "13",
                                        minlength: "12",
                                        validatemessage: "Please enter valid Account Number",
                                        "aria-label": "enter Account Number",
                                        readOnly: Boolean(readOnly)
                                    }}
                                />

                                <TextField
                                    className="TextFieldWrapper"
                                    id="addressLine1"
                                    label="Address Line 1"
                                    onChange={this.onTextChange}
                                    onFocus={this.handleFocus}
                                    value={addressLine1}
                                    variant="filled"
                                    inputProps={{
                                        mandatory: "1",
                                        validationtype: "3",
                                        validatemessage: "Please enter Address Line 1",
                                        "aria-label": "Please enter Address Line 1",
                                        readOnly: Boolean(readOnly)
                                    }}
                                />
                                <TextField
                                    className="TextFieldWrapper"
                                    id="addressLine2"
                                    label="Address Line 2"
                                    onChange={this.onTextChange}
                                    onFocus={this.handleFocus}
                                    value={addressLine2}
                                    variant="filled"
                                    inputProps={{
                                        'aria-label': 'Enter address',
                                    }}
                                />
                                <TextField
                                    className="TextFieldWrapper"
                                    id="city"
                                    label="City"
                                    onChange={this.onTextChange}
                                    onFocus={this.handleFocus}
                                    value={city}
                                    variant="filled"
                                    inputProps={{
                                        mandatory: "1",
                                        validationtype: "3",
                                        validatemessage: "Please enter City",
                                        "aria-label": "enter City",
                                        readOnly: Boolean(readOnly)
                                    }}
                                />

                                <FormControl variant="filled" className={classes.formControl} style={{ width: "100%", margin: '10px 0' }}>
                                    <InputLabel id="demo-simple-select-filled-label">State</InputLabel>
                                    <Select
                                        classes={{ icon: 'DropIconStyle' }}
                                        native
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        name="demo-simple-select-filled"
                                        value={roleText}
                                        onChange={this.roleChange}
                                        inputProps={{
                                            invaliderrormessage: "Please select State.",
                                            'aria-label': "select State",
                                            validatemessage: "Please select State",
                                            mandatory: '1'
                                        }}
                                    >
                                        <option></option>
                                        <option value={'AZ'}>AZ</option>
                                        <option value={'CA'}>CA</option>
                                        <option value={'NV'}>NV</option>
                                    </Select>
                                </FormControl>
                                <TextField
                                    className="TextFieldWrapper"
                                    id="zipCode"
                                    label="ZIP Code"
                                    onChange={this.onTextChange}
                                    onFocus={this.handleFocus}
                                    value={zipCode}
                                    variant="filled"
                                    inputProps={{
                                        'aria-label': 'Enter zip code',
                                        validatemessage: "Please enter a valid 5 digit Zip code",
                                        invaliderrormessage: "Please enter a valid 5 digit Zip code",
                                        maxlength: "5",
                                        minlength: "5",
                                        mandatory: "1",
                                        inputType: "ZipCode",
                                        readOnly: Boolean(readOnly)
                                    }}
                                />

                                <TextField
                                    className="TextFieldWrapper"
                                    id="remitEmail"
                                    label="Remit to Email Address"
                                    value={remitEmail}
                                    onChange={this.onTextChange}
                                    onFocus={this.handleFocus}
                                    variant="filled"
                                    inputProps={{
                                        "maxlength": "50",
                                        "mandatory": "1",
                                        "inputType": "Email",
                                        validatemessage: "Please enter valid Remit to Email Address.",
                                        "aria-label": "enter Remit to Email Address",
                                        readOnly: Boolean(readOnly)
                                    }}
                                />

                                <FormControlLabel
                                    className="request-service-checkbox mt-3"
                                    value="end"
                                    control={<Checkbox
                                        color="primary"
                                        checked={agreeChecked}
                                        onChange={this.agreeChkChange}
                                    />}
                                    label="By requesting this letter, I confirm written and signed authorization from the customer is on file."
                                    labelPlacement="End"
                                />

                                <div className="FormButtonsArea">
                                    <Button aria-label="click here to cancel" color="secondary" onClick={this.goBack} className={classes.ButtonOutlined}>
                                        Cancel
                                </Button>

                                    <Button aria-label="click here to save" variant="contained" color="secondary" onClick={this.handleSubmit} className={classes.ButtonContained} >Submit </Button>
                                    {/*
                                <MDBNavLink aria-label="click here to submit" to="/ThankyouSuccess" className="viewBillsButton ButtonPrimary customBtn">Submit</MDBNavLink>
                                */}
                                </div>

                            </form>
                        </div>
                    </MDBCol>
                </MDBRow>
            </>
        );
    }
}

export default withRouter(withStyles(useStyles)(RequestServiceField));