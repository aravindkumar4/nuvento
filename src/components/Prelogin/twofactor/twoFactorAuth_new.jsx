import React, { Suspense } from "react";
import { Circle } from 'react-preloaders';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { MDBContainer, MDBCol } from 'mdbreact';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { userService } from '../../../auth/_services';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';

import AuthenticationFailed from '../Login/authenticationFailed';

import { SnakMessage } from '../../common/notificationMessage';
import { NumericOnly } from '../../../core/common/validate';
import { SessionTracker } from '../../../core/common/common';
import {
    getTwoFactorAuthenticationDetail,
    createAuthenticationCode,
    verifyActivationCode,
    resentUserTwoFactorAuthenticationToken,
    CheckisLegacyUser
} from '../../../core/services/twoFactorService';
import { toast } from 'react-toastify';
import { SetSessions, GetSessions } from '../../../core/common/common'
import SessionAccessor from '../../../core/common/sessionAccessor';
import './tfa.scss';
const styles = theme => ({
    ButtonContained: {
        backgroundColor: '#27A088',
    }
});

class TwoFactorAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            loading: true,
            successCode: false,
            value: '',
            stepper: false,
            authenticationType: -1,
            errorScreen: false,
            resendCount: 0,
            verfiyTokenCount: 0,
            termAndCondition: false,
            failureCount: 0,
            isButtonDisabled: false,
            authenticationDisabled: false,
            deletePressed: false,

        };

        this.constructorBindMethod();
    }

    constructorBindMethod = () => {
        this.messageRef = React.createRef();
        this.handleResend = this.handleResend.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleAutheticationType = this.handleAutheticationType.bind(this);
    }

    componentDidMount() {
       // this.CheckisLegacyUserInfo();
       this.getTwoFactorAuthenticationDetails();
    }

   

    getTwoFactorAuthenticationDetails = async () => {
        
        let userId = SessionAccessor.UserID;
        getTwoFactorAuthenticationDetail(userId, (m) => {
            
            const { status, data } = m;
            //this.setState({authenticationDisabled: !status })
            if (status) {
                if (status.code == "200") {
                    this.setState({
                        email: data.email,
                        phone: data.phone,
                        loading: false
                    });
                }
            } else {
                if (m.response && m.response.data) {
                    const { message } = m.response.data.status;
                    this.setState({ loading: false });
                    toast.error(message);
                }
            }
        });
    }

    createUserTwoFactorAuthenticationToken = async () => {
        let userId = SessionAccessor.UserID;
        this.setState({ loading: true });
        createAuthenticationCode(userId, this.state.authenticationType, (m) => {
            const { status, data } = m;
            if (status) {
                if (status.code == "200") {
                    this.setState({
                        stepper: true,
                        loading: false
                    });
                    toast.success(data.message);
                }
            } else {
                if (m.response && m.response.data) {
                    const { message } = m.response.data.status;
                    this.setState({ loading: false });
                    toast.error(message);
                }
            }
        });
    }


     createUserTwoFactorAuthenticationToken = async () => {
        let userId = SessionAccessor.UserID;
        this.setState({ loading: true });
        createAuthenticationCode(userId, this.state.authenticationType, (m) => {
            const { status, data } = m;
            if (status) {
                if (status.code == "200") {
                    this.setState({
                        stepper: true,
                        loading: false
                    });
                    toast.success(data.message);
                }
            } else {
                if (m.response && m.response.data) {
                    const { message } = m.response.data.status;
                    this.setState({ loading: false });
                    toast.error(message);
                }
            }
        });
    }

    resentUserTwoFactorAuthenticationToken = async () => {
        let userId = SessionAccessor.UserID;
        this.setState({ loading: true });
        const _resent = this.state.resendCount + 1;
        resentUserTwoFactorAuthenticationToken(userId, this.state.authenticationType, (m) => {
            const { status, data } = m;
            if (status) {
                if (status.code == "200") {
                    this.setState({
                        loading: false,
                        resendCount: _resent,
                    });
                    toast.success(data.message);
                }
            } else {
                if (m.response && m.response.data) {
                    const { message } = m.response.data.status;
                    this.setState({ loading: false });
                    toast.error(message);
                }
            }
        });

        if (_resent >= 6) {
            this.setState({authenticationDisabled: true});
            var element = document.getElementById("btnResend");
            element.style.display = "none";
            setTimeout(function () {
                var element = document.getElementById("btnResend");
                element.style.display = "block";
            }, 45000);
        }
    }

    VerifyUserTwoFactorAuthenticationToken = async () => {
        let userId = SessionAccessor.UserID;
        const self = this;
        let _token = `${self.state.one}${self.state.two}${self.state.three}${self.state.four}${self.state.five}${self.state.six}`;
        const _resent = this.state.verfiyTokenCount + 1;
        this.setState({ loading: true });
        verifyActivationCode(userId, self.state.authenticationType, _token, (m) => {
            const { status, data } = m;
            if (status) {
                if (status.code == "200") {
                    SessionAccessor.TwoFactorAuthenticated = !status.error;
                    SessionTracker();
                    this.props.history.push('/dashboard');
                }
            } else {
                if (m.response && m.response.data) {
                    const { message } = m.response.data.status;
                    toast.error(message);
                }
                this.setState({
                    loading: false,
                    verfiyTokenCount: _resent,
                });

                if (this.state.resendCount > 5 || this.state.verfiyTokenCount > 5 || ((this.state.resendCount + this.state.verfiyTokenCount) > 5)){
                    this.setState({authenticationDisabled: true});
                }
            }
        });
        if (_resent >= 6) {
            this.setState({authenticationDisabled: true});
        }
    }

    handleResend() {
        if (this.state.resendCount <= 5) {
            this.resentUserTwoFactorAuthenticationToken();
        }
    }

    handleSubmit = () => {
        if (this.state.failureCount <= 5) {
            this.VerifyUserTwoFactorAuthenticationToken();
        } else {
            this.setState({ errorScreen: true })
        }
    }
    

    inputValChange = (event) => {
        
        this.setState({
            [event.target.name]: NumericOnly(event.target.value)
        });
        
        var htmlInput = document.getElementsByClassName("TFA");
        for (var i = 0; i < htmlInput.length; i++) {
            if (htmlInput[i].value.length == 0) {
                if(this.state.deletePressed)
                    htmlInput[i - 1].focus();
                else
                    htmlInput[i].focus();
                break;
            }
        }
    }

    inputKeyPress = (event)=>{
        var htmlInput = document.getElementsByClassName("TFA");
        var key = event.keyCode || event.charCode;

        if (key == 8 || key == 46) {
            this.setState({deletePressed: true})
        }
        else{
            this.setState({deletePressed: false})
        }

         //for (var i = 0; i < htmlInput.length; i++) {
         //    if (key == 8 || key == 46) {
         //        let targetName = event.target.name;
         //        if (htmlInput[i].name == targetName) {
         //            if (htmlInput[i].value == '') {
         //                if (htmlInput[(i - 1)] != undefined) {
         //                    htmlInput[(i - 1)].focus();
         //                }
         //            }                     
         //        }
         //    }
         //}
    }

    handleOnClick = () => {
        
        const self = this;
        this.createUserTwoFactorAuthenticationToken();
    }

    handleAutheticationType = (event) => {
        
        this.setState({
            authenticationType: event.target.value,
            termAndCondition: event.target.value == 1
        });
    }

    handleCancel() {
        window.location.href = '#login';
    }

    render() {
        const { classes } = this.props;
        const { email, phone, loading, authenticationDisabled } = this.state;
        return (
            <section className="loginbg">
                {
                    loading == true &&
                    <div className='custom-loader'>
                        <CircularProgress className="SpinnCirc" size={50} thickness={3} /></div>
                }
                {(!authenticationDisabled && (email || phone)) && <MDBContainer>
                    <Grid item className="LoginColumn" lg={12} xs={12} sm={12}>
                        <MDBCol lg="8" sm="12" className="float-left">
                            <div className="w-100">
                                <div className={this.state.stepper ? 'loginPaper twoFactor text-left mt30 d-none' : 'loginPaper twoFactor text-left mt30'}>
                                    <Typography component="h3" color="primary" className="Loginpagehead border-bottom pb-3">Two Factor Authentication</Typography>
                                    <p>Where would you like us to send your verification code?</p>
                                    <div className="swg-radio">
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <RadioGroup className={classes.Radiogroup}
                                                aria-label="Select account number or service address"
                                                name="AccountSelection"
                                                // value={this.state.openResComVal}
                                                value={this.state.authenticationType}
                                                onChange={this.handleAutheticationType}
                                                defaultValue="sendCode">
                                                {email && <FormControlLabel
                                                    value="2"
                                                    control={<Radio color="secondary" />}
                                                    label={"Send a code to my email address " + email}
                                                />}
                                                {phone && phone != 'None' && <FormControlLabel
                                                    value="1"
                                                    //disabled={true} style={{opacity: "0.3"}}//Disbaled for now as Text message is not yet implemented
                                                    control={<Radio color="secondary" />}
                                                    label={"Send a code to my mobile number " + phone}
                                                />}
                                            </RadioGroup>
                                        </FormControl>
                                        <div className={this.state.termAndCondition ? 'w-100 sendCode' : 'd-none'}>

                                        </div>
                                        <div className={(this.state.termAndCondition != true)
                                            ? 'd-none' : 'w-100 sendText'}>
                                            <p>
                                            You agree that Southwest Gas may call and/or send text messages to you at any telephone number associated with your account, including wireless telephone numbers that could result in charges for you. The manner in which these calls or text messages are made to you may include, but is not limited to, the use of pre-recorded/ artificial voice messages and/or automatic telephone dialing system. You can edit your notification preferences for your account at any time.
                                            </p>
                                            <p className="borderTop">Click the <b>NEXT</b> button to accept the Terms & Conditions or <b>CANCEL</b> to go back.</p>
                                        </div>
                                    </div>
                                    <div className="FormButtonsArea">
                                        <Button aria-label='Cancel button' title="Click here to Cancel button" color="secondary" className="ButtonPrimary green-color tfa-green-color-btn" onClick={this.handleCancel}>Cancel</Button>
                                        <Button
                                            aria-label='next button' title="Click here to next button"
                                            disabled={this.state.authenticationType == -1 || this.state.loading==true}
                                            type="button" color="secondary"
                                            onClick={this.handleOnClick}
                                            variant="contained"
                                            className="ButtonPrimary green-btn">Next</Button>
                                    </div>
                                </div>
                                <div
                                    className={this.state.stepper ? 'loginPaper twoFactor text-left mt30' : 'd-none'}>
                                    <h3 className="Loginpagehead border-bottom pb-3">Two Factor Authentication</h3>
                                    <p>We've just sent a code to {this.state.authenticationType == 1 ? phone : email}. Enter that code below. </p>
                                    <div className="text-code">
                                        <input type="text" maxLength="1" name="one"
                                            class="TFA"
                                            autoComplete="off"
                                            value={this.state.one || ''}
                                            onKeyDown={(e)=> this.inputKeyPress(e)}
                                            onChange={(e) => this.inputValChange(e)} />
                                        <input type="text"
                                            aria-label="input feild"
                                            name="two"
                                            class="TFA"
                                            autoComplete="off"
                                            value={this.state.two || ''}
                                            onKeyDown={(e)=> this.inputKeyPress(e)}
                                            onChange={(e) => this.inputValChange(e)}
                                            maxLength="1" />
                                        <input type="text"
                                        aria-label="input feild"
                                            name="three"
                                            class="TFA"
                                            autoComplete="off"
                                            value={this.state.three || ''}
                                            onKeyDown={(e)=> this.inputKeyPress(e)}
                                            onChange={(e) => this.inputValChange(e)}
                                            maxLength="1" />
                                        <input type="text"
                                        aria-label="input feild"
                                            name="four"
                                            class="TFA"
                                            autoComplete="off"
                                            value={this.state.four || ''}
                                            onKeyDown={(e)=> this.inputKeyPress(e)}
                                            onChange={(e) => this.inputValChange(e)}
                                            maxLength="1" />
                                        <input type="text"
                                        aria-label="input feild"
                                            name="five"
                                            class="TFA"
                                            autoComplete="off"
                                            value={this.state.five || ''}
                                            onKeyDown={(e)=> this.inputKeyPress(e)}
                                            onChange={(e) => this.inputValChange(e)}
                                            maxLength="1" />
                                        <input type="text" name="six" maxlength="1" 
                                            autoComplete="off"
                                            value={this.state.six || ''}
                                            onKeyDown={(e)=> this.inputKeyPress(e)}
                                            onChange={(e) => this.inputValChange(e)}
                                            class="TFA mr-0" />
                                    </div>
                                    <p className="text-muted mt20">Verifying your account helps keep your account more secure</p>
                                    <a href="javascript:void(0)"
                                    title='Click here to resend activation code'
                                        id="btnResend"
                                        className="link-color w-100 mt20"
                                        onClick={this.handleResend}>
                                        {this.state.isButtonDisabled ? 'Resend activation code' : 'Resend activation code'}
                                    </a>
                                    <div className="FormButtonsArea">
                                        <Button aria-label='Cancel button' title="Click here to Cancel button" color="secondary" className="ButtonPrimary green-color tfa-green-color-btn" onClick={this.handleCancel}>Cancel</Button>
                                        <Button aria-label='Submit button' title="Click here to Submit button" color="secondary" variant="contained" className="ButtonPrimary green-btn"
                                            disabled={
                                                !(this.state.one && this.state.two && this.state.three && this.state.four && this.state.five && this.state.six)
                                            || this.state.loading==true}
                                            onClick={this.handleSubmit}>Submit</Button>
                                    </div>
                                </div>
                            </div>
                        </MDBCol>
                        <MDBCol lg="4" sm="12" className="float-left rightArea d-none d-sm-block">
                            <div class="enrollboxarea text-left">
                                <b>Why Two Factor Authentication?</b>
                                <p>Two Factor Authentication, sometimes referred to as two-step verification or dual-factor authentication is designed to prevent unauthorized users from gaining access to your account.</p>
                            </div>
                        </MDBCol>
                    </Grid>
                </MDBContainer>
                }
                {authenticationDisabled && <AuthenticationFailed />}
                <SnakMessage ref={this.messageRef} />
            </section>
        );

    }
}

export default withStyles(styles)(TwoFactorAuth);