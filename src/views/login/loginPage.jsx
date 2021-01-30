import React, { useState, useRef } from "react";
import { withStyles } from '@material-ui/core/styles';
//import Dashboard from '../../components/Dashboard';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import '../../assets/css/login.css';
import MySnackbarContentWrapper from '../../views/shared/snackbar/notifier';

import { MDBListGroup, MDBContainer, MDBBtn, MDBRow, MDBCol } from 'mdbreact';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Input, TextField } from '@material-ui/core';

import Snackbar from '@material-ui/core/Snackbar';
import { ValidateSinglePage, HandleCutCopyPasteRule } from '../../core/common/validate';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import UserContextModel from '../../store/UserContextModel';

import RequestHelper from "../../common/RequestHelper";
import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from '../../core/Enum';
import MessageBox from "../../shared/Views/MessageBox";
import { withRouter } from "react-router-dom";
import SessionAccessor from './../../core/common/sessionAccessor';
import { getJSON, SetIPAddress, SetCountries, SetStates } from './../../core/common/common';
import Encrption from '../../common/encryption-decryption/encryption-decryption';
import {
    CheckisLegacyUser
} from '../../core/services/twoFactorService';
import { SetTFADataModel, GetTFADataModel } from "../../store/LegacyUserDataStore"
import { SetUserBehaviour } from "../../core/services/setUserBehaviour";
import { LoginAttemptFailed, LoginAttemptSuccessful } from "../../common/setBehaviourValue";
import moment from "moment";
const styles = theme => ({
    ButtonContained: {
        backgroundColor: '#27A088',
    }
});

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        //userService.logout();
        this.state = {
            username: '',
            password: '',
            loading: true,
            error: '',
            Language: '',
            success: false,
            successCode: false,
            readOnly: true,
            hidden: true,
            guestUserToken: '',
            checkedB: false,
            IsButtonDisabled: true,
            isBackButtonClicked: false,
            isLegacyUser: false,
            isLegacyUser: false,
            isloginScreen: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.activationLinkResponse = this.activationLinkResponse.bind(this);
        this.messageRef = React.createRef();
        this.handleFocus = this.handleFocus.bind(this);
        this.SetIPAddressExitFun = this.SetIPAddressExitFun.bind(this);
        this.Login = this.Login.bind(this);
        //this.testClick = this.testClick.bind(this);
        localStorage.removeItem('UData');


    }

    static contextType = UserContextModel;

    Login() {
        if (this.state.checkedB == true) {
            this.rememberUser();
        } else {
            this.forgetUser();
        }

        if (!ValidateSinglePage("loginSection", "Please enter Username and Password.")) {
            this.messageRef.current.showMessage(
                "Please enter Username and Password.",
                NotificationMessageTypeEnum.Error
            );
            return;
        }


        this.setState({ loading: true });
        //let userId = "weblogic+152@localhost.localdomain";  // SessionAccessor.UserID;
        // let userId=encodeURIComponent("weblogic+152@localhost.localdomain");
        CheckisLegacyUser(encodeURIComponent(this.state.username), (m) => {
            const { status, data } = m;
            // this.setState({authenticationDisabled: !status })

            this.setState({ loading: true });
            CheckisLegacyUser(encodeURIComponent(this.state.username), (m) => {
                const { status, data } = m;
                if (status) {
                    if (status.code == "200") {
                        if (data.isLegacyUser) {
                            SetTFADataModel(data);
                            this.props.history.push("/authentication");
                        }
                        else {
                            this.CallLogin();
                        }

                    }
                } else {
                    this.CallLogin();
                }
            });
        })
    }


    CallLogin = () => {
        RequestHelper.POST(
            "agency/validatelogin",
            APIURLTypeEnum.Agency,
            {
                userName: this.state.username,
                password: this.state.password,
                ipAddress: SessionAccessor.IPAddress

            },
            (res) => {
                if (res && res.status == StatusCodeEnum.OK) {
                    if (res.data) {
                        if (res.data.data) {
                            this.setState({ loading: false });
                            localStorage.setItem("RoleType", res.data.data.agency[0].role);
                            localStorage.setItem("UserId", res.data.data.userId);
                            localStorage.setItem("UserName", res.data.data.userName);
                            localStorage.setItem("AgencyNumber", res.data.data.agency[0].agencyNumber);

                            localStorage.setItem("UData", JSON.stringify(res.data.data));
                            SetUserBehaviour(LoginAttemptSuccessful.Name,
                                LoginAttemptSuccessful.Name,
                                LoginAttemptSuccessful.Name,
                                LoginAttemptSuccessful.Event,
                                LoginAttemptSuccessful.EventDetails.
                                replace('{username}', res.data.data.userName)
                                    .replace('{Date / Time}', moment(new Date()).format('MM/DD/YYYY hh:mm A'))
                            );
                            this.props.history.push("/Dashboard");
                        } else {
                            this.setState({ loading: false });
                        }
                    } else {
                    }
                } else {
                    this.messageRef.current.showMessage(
                        res.response.data.status.message,
                        NotificationMessageTypeEnum.Error
                    );
                    this.setState({ loading: false });
                }
            }
        );

    }

    onBackButtonEvent = (e) => {
        e.preventDefault();
    }

    componentWillMount() {
        SetIPAddress();
        if (this.props.location && this.props.location.state && this.props.location.state.key)
            this.setState({ guestUserToken: this.props.location.state.key.replace(' ', '+') })

    }

    componentDidMount() {
        this.setState({ loading: true });

        const key = this.props.location.pathname.replace('/loginAdmin/', '');
        if (key && key != "/") {
            const accessToken = Encrption.decryptAES(key, SessionAccessor.getEncryptionKey);
            localStorage.removeItem('UData');
            localStorage.removeItem('UserId');
            localStorage.removeItem('AgencyNumber');
            localStorage.removeItem('RoleType');
            localStorage.removeItem('UserName');
           try {
                const data = JSON.parse(accessToken);
                this.validateLogin(JSON.parse(accessToken));
           } catch (error) {
            this.props.history.push("/");
           }
           this.setState({ loading: false })
    
        } else {
            this.setState({ loading: false })
        }

    }

    validateLogin = (accessToken) => {
        this.setState({ isloginScreen: false })
        this.setState({ loading: true })
        RequestHelper.POST(
            "Login/ValidateLogin",
            APIURLTypeEnum.CSPService,
            {
                "EncryptedParam": accessToken.token
            },
            (res) => {
                
                this.setState({ loading: false });
                if (res && res.status == StatusCodeEnum.OK) {
                    if (res.data) {
                        if (res.data.data && res.data.data.IsSuccess === true) {
                            
                            this.setState({ isloginScreen: true });
                            localStorage.setItem("RoleType", accessToken.agency[0].role);
                            localStorage.setItem("UserId", accessToken.userId);
                            localStorage.setItem("UserName", accessToken.userName);
                            localStorage.setItem("AgencyNumber", accessToken.agency[0].agencyNumber);
                            localStorage.setItem("AgencyId", accessToken.agency[0].agencyId);
                            // accessToken.firstName = accessToken.adminUserName;
                            // accessToken.lastName = '';
                            // accessToken.userName = accessToken.agencyNumber;
                            localStorage.setItem("UData", JSON.stringify(accessToken));
                            this.props.history.push("/Dashboard");
                        } else 
                        {
                            this.props.history.push("/");
                        }
                    }
                } else {
                    this.setState({ isloginScreen: true });
                    this.props.history.push("/");
                }
            });
    }

    activationLinkResponse(res) {
        if (res.hasOwnProperty("status")) {
            if (res.status.code == "200") {
                this.messageRef.current.UpdateMessageState(true, "success", 'You have successfully activated your MyAccount. Please log in with your Username and Password.');
                this.props.history.push('/login');
                this.setState({ loading: false })
            } else {
                this.messageRef.current.UpdateMessageState(true, "error", res.status.message);
            }
        } else {

            const { message } = res.response.data.status;
            this.setState({ loading: false });
            this.messageRef.current.UpdateMessageState(true, "error", message);
            this.props.history.push('/login');
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if (name == "username") {
            if (this.state.password && value) {
                this.setState({ IsButtonDisabled: false });
            } else {
                this.setState({ IsButtonDisabled: true });
            }
        }
        if (name == "password") {
            if (this.state.username && value) {
                this.setState({ IsButtonDisabled: false });
            } else {
                this.setState({ IsButtonDisabled: true });
            }
        }
    }

    handleSelect = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    _handleKeyDown = (e) => {
        if (e.key === 'Enter' && !this.state.IsButtonDisabled) {
            //this.handleSubmit(e)
            this.Login();
        }
    }
    handleSubmit(e) {
        e.preventDefault();

        if (this.state.checkedB == true) {
            //user wants to be remembered.
            this.rememberUser();
        } else {
            this.forgetUser();
        }
        const { username, password, returnUrl } = this.state;
        if (ValidateSinglePage("loginSection", "Please enter Username and Password.")) {
            this.setState({ loading: true });
            if (!SessionAccessor.IPAddress)
                SetIPAddress(this.SetIPAddressExitFun);
            else
                validateUser(this);
        }

    }
    //When log out is clicked and user try to log in without refreshing page then we have to set BrowserDevice first then proceed login
    SetIPAddressExitFun = () => {
        validateUser(this)
    }

    handleOnChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    // Remember me Fuctionality
    rememberUser = () => {
        try {
            let user = this.accessCookie('userName');
            if (user != this.state.username) {
                let date = new Date();
                date.setTime(date.getTime() + (60 * 24 * 60 * 60 * 1000));
                var expires = "expires=" + date.toGMTString();
                document.cookie = "userName=" + this.state.username + ";" + expires + ";path=/";
            }
        } catch (error) {
            // Error saving cookies            
        }
    };

    getRememberedUser = () => {

        try {
            let user = this.accessCookie('userName');
            if (user != '') {
                this.setState({
                    username: user,
                    checkedB: true
                });
            }
        } catch (error) {

        }
    };
    accessCookie = (cookieName) => {
        var name = cookieName + "=";
        var allCookieArray = document.cookie.split(';');
        for (var i = 0; i < allCookieArray.length; i++) {
            var temp = allCookieArray[i].trim();
            if (temp.indexOf(name) == 0)
                return temp.substring(name.length, temp.length);
        }
        return "";
    };
    forgetUser = () => {
        try {
            let date = new Date();
            var expires = "expires=" + date.toGMTString();
            document.cookie = "userName=" + this.state.username + ";" + expires + ";path=/";
        } catch (error) {
            // Error removing
        }
    };
    // Remember me Functionaliity

    handleChangeButton = (e) => {
        alert(e.currentTarget.value)
        this.props.setFieldValue('degreeLevel', e.currentTarget.value);
    }

    handleonClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ success: false });
    };

    sucessCodeOPen = () => {
        this.setState({ successCode: true });
    }

    codehandleonClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ successCode: false });
    };
    handleFocus = () => {
        this.setState({
            readOnly: false
        })
    }

    togglePasswordShow = () => {
        this.setState({ hidden: !this.state.hidden });
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    render() {
        const { username, password, loading, error, readOnly } = this.state;
        const { classes } = this.props;
        return (
            <section className="loginbg" role="region" aria-label="login">
                {loading && <div className='custom-loader'>
                    <CircularProgress className="SpinnCirc" size={50} thickness={3} /></div>}
                {this.state.isloginScreen && <MDBContainer>
                    <Grid item className="LoginColumn" lg={12} xs={12} sm={12}>
                        <MDBCol md="6" sm="12" xs="12" className="float-left" role="region" aria-label="login page left sidebar">
                            <Paper elevation={0} className="loginPaper">
                                <Typography component="h3" color="primary" variant="h3" className="Loginpagehead">Log Into Your MyPledge Account</Typography>
                                <form name="form" className="LoginForm" autoComplete="off" id="loginSection">
                                    <TextField id="username" name="username" label="Username" className={'TextFieldWrapper'} autoComplete="off"
                                        value={this.state.username}
                                        margin="normal" variant="filled" onFocus={this.handleFocus} onChange={this.handleChange} inputProps={{
                                            invaliderrormessage: "Please enter Username.",
                                            'aria-label': 'Please enter Username',
                                            validatemessage: "Please enter Username.", mandatory: "1", validationtype: "3",
                                            readOnly: Boolean(readOnly)
                                        }} onKeyDown={this._handleKeyDown} />

                                    <TextField
                                        id="password" name="password" label="Password"
                                        className={'TextFieldWrapper'}
                                        type={this.state.hidden ? "password" : "text"}
                                        autoComplete="off"
                                        onFocus={this.handleFocus}
                                        onChange={this.handleChange}
                                        margin="normal"
                                        variant="filled"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.togglePasswordShow}
                                                    onMouseDown={this.handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {this.state.hidden ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>

                                            </InputAdornment>,
                                            invaliderrormessage: "Please enter Password.",
                                            validatemessage: "Please enter Password.", mandatory: "1", validationtype: "3",
                                            readOnly: Boolean(readOnly)
                                        }}
                                        inputProps={{
                                            'aria-label': 'Enter the Password'
                                        }}
                                        onKeyDown={this._handleKeyDown} />


                                    <div className="form-group">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.checkedB}
                                                    onChange={this.handleOnChange('checkedB')}
                                                    value={this.state.checkedB}
                                                    color="secondary"
                                                    inputProps={{ 'aria-label': 'Check for Remember Me' }}
                                                />
                                            }
                                            label="Remember Me"
                                        />
                                    </div>
                                    <div className="form-group" style={{ position: 'relative' }}>
                                        <button onClick={this.Login} aria-label="Click Here to Login" type="button" variant="contained" color="inherit" className={clsx(classes.ButtonContained, 'btn loginboxbutton')}>
                                            LOG IN</button>
                                    </div>
                                </form>
                                <MDBListGroup className="extralinks text-left">
                                    <li>
                                        <Link to="/ForgotUserID" aria-label="Click to recover your forgotten username">Forgot Username</Link><span> or </span>
                                        <Link to="/ForgotPassword" aria-label="Click to recover your forgotten password">Password?</Link>
                                    </li>
                                    <li>
                                        <Link to="/Register" aria-label="Click to register">Agency Pledge Portal Registration</Link>
                                    </li>
                                </MDBListGroup>
                            </Paper>
                        </MDBCol>
                        <MDBCol md="6" sm="12" className="float-left rightArea" role="region" aria-label="login page right sidebar">
                            <div className="enrollboxarea text-left login-page-right-side">
                                <b className="d-block">Need to register a new agency?</b>
                                <strong className="d-block">Follow these easy steps and register today!</strong>
                                <ul>
                                    <li>Complete the online registration form</li>
                                    <li>Review, complete and return the required agreement</li>
                                    <li>Receive authorization to use the portal and activate your account</li>
                                    <li>Still have question? Check out our <Link to="/PreFaq" aria-label="click here to Navigate to Faqs">FAQs</Link></li>
                                </ul>
                            </div>
                        </MDBCol>
                        <Snackbar className="snackbarmain" anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                            open={this.state.success} autoHideDuration={10000} onClose={this.handleonClose}>
                            <MySnackbarContentWrapper
                                onClose={this.handleonClose}
                                variant="error"
                                message={<span id="message-id">Your Username and/or Password  do not match our records. Please try again.</span>}
                                action={[

                                ]}
                            />
                        </Snackbar>
                    </Grid>
                </MDBContainer>}

                <MessageBox ref={this.messageRef} />
            </section>
        );
    }
}

export default withRouter(withStyles(styles)(LoginPage));
