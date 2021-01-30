import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { MDBContainer, MDBCol,MDBRow } from 'mdbreact';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import './tfa.scss';
import {
    getTwoFactorAuthenticationDetail,
    createAuthenticationCode,
    verifyActivationCode,
    resentUserTwoFactorAuthenticationToken,
    CheckisLegacyUser
} from '../../../core/services/twoFactorService';
import { toast } from 'react-toastify';
import MessageBox from '../../../shared/Views/MessageBox';
import {SetTFADataModel,GetTFADataModel} from "../../../store/LegacyUserDataStore";
const styles = theme => ({
    ButtonContained: {
        backgroundColor: '#27A088',
    }
});

class TwoFactorAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticationType:false,
            nextstep:true,
            email:'',
            phone:'',
            deletePressed: false,
            // one:'',
            // two:'',
            // three:'',
            // four:'',
            // five:'',
            // six:''
            success: false,
            loading: true,
            successCode: false,
            value: '',
            errorScreen: false,
            resendCount: 0,
            verfiyTokenCount: 0,
            termAndCondition: false,
            failureCount: 0,
            isButtonDisabled: false,
            authenticationDisabled: false,
            tokenvalue:""

        }

        this.messageRef = React.createRef();
    }
    
    componentDidMount() {
        // this.CheckisLegacyUserInfo();
        
        // this.messageRef.current.showMessage(
        //     "Please enter Username and Password.",
        //     "success"
        // );
        const UserDetails=GetTFADataModel();
    if(!UserDetails.hasOwnProperty("LegacyUserData"))
    {
      window.location.href="#/";

       return;
    }
        this.getTwoFactorAuthenticationDetails();
     }

     getTwoFactorAuthenticationDetails = async () => {
        
        let userId = "";
        getTwoFactorAuthenticationDetail(userId, (m) => {
            
            const { status, data } = m;
            //this.setState({authenticationDisabled: !status })
            if (status) {
                if (status.code == "200") {
                    this.setState({
                        email: data.email,
                        phone: data.phone
                        // loading: false
                    });

                }
            } else {
                if (m.response && m.response.data) {
                    const { message } = m.response.data.status;
                    this.setState({ loading: false });
                    this.messageRef.current.showMessage(
                        "User Details could not be loaded",
            "error"
        );
        window.location.href="#/"
                }
                else{
                    this.setState({ loading: false });
                    this.messageRef.current.showMessage(
                        "User Details could not be loaded",
            "error"
        );
        window.location.href="#/"


                }
            }
        });
    }

    createUserTwoFactorAuthenticationToken = async () => {
        let userId = ""; //SessionAccessor.UserID;
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
                    this.messageRef.current.showMessage(
                        data.message,
            "success"
        );


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
    

    handleAuthenticationType = (e) =>{
        
        this.setState({
            authenticationType:e.target.value
        })
    }
    handleNext = () =>{
        
        this.setState({
            nextstep:false
        })
       this.createUserTwoFactorAuthenticationToken();
    }
    handleCancle = () =>{
        window.location.href = "#/"
    }

    handleSubmit = () => {
        if (this.state.failureCount <= 5) {
            var htmlInput = document.getElementsByClassName("TFA");
            var inputtoken=this.state.tokenvalue;
            this.VerifyUserTwoFactorAuthenticationToken();
        } else {
            this.setState({ errorScreen: true })
        }
    }

    VerifyUserTwoFactorAuthenticationToken = async () => {
        let userId = '';//SessionAccessor.UserID;
        const self = this;
        let _token = `${self.state.one}${self.state.two}${self.state.three}${self.state.four}${self.state.five}${self.state.six}`;
        const _resent = this.state.verfiyTokenCount + 1;
        this.setState({ loading: true });
        verifyActivationCode(self.state.authenticationType, _token, (m) => {
            
            const { status, data } = m;
            if (status) {
                if (status.code == "200") 
                {
                    window.location.href="#/ResetUserNamePassword";
                }
            } else {
                if (m.response && m.response.data) 
                {
                    // const { message } = m.response.data.status;
                    // toast.error(message);
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
    NumericOnly=(value)=> {
        //
        if (value && value.length > 0)
            return value.replace(/[^0-9]/g, '')
        return value;
    }

    inputValChange = (event) => {
        
        this.setState({
            [event.target.name]:this.NumericOnly(event.target.value)
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

    handleResend=()=> {
        
        if (this.state.resendCount <= 5) {
            this.resentUserTwoFactorAuthenticationToken();
        }
    }

    resentUserTwoFactorAuthenticationToken = async () => {
        let userId = '';//SessionAccessor.UserID;
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
                    this.messageRef.current.showMessage(
                        data.message,
            "success"
        );
                }
            } else {
                if (m.response && m.response.data) {
                    const { message } = m.response.data.status;
                    this.setState({ loading: false });
                    this.messageRef.current.showMessage(
                        message,
            "error"
        );
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

    inputKeyPress = (event)=>{
        var htmlInput = document.getElementsByClassName("TFA");
        var key = event.keyCode || event.charCode;

        if (key == 8 || key == 46) {
            this.setState({deletePressed: true})
        }
        else{
            this.setState({deletePressed: false})
        }
        // this.setState({
        //     [event.target.name]: NumericOnly(event.target.value)
        // });

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



    render() {
        const { classes } = this.props;
        return (
            <section className="twofactor-module text-left">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol lg="8" sm="12" role="region" aria-label="two factor left sidebar">
                            {this.state.nextstep == true ?
                                <div className='twofactor-module__leftside mt30'>
                                    <Typography component="h3" className="pb-3">Two-Factor Authentication</Typography>
                                    <p>Where would you like us to send your verification code?</p>
                                    <div className="swg-radio">
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <RadioGroup className={classes.Radiogroup}
                                                aria-label="Select account number or service address"
                                                name="AccountSelection"
                                                value={this.state.authenticationType}
                                                onChange={this.handleAuthenticationType}
                                                defaultValue="sendCode">
                                                <FormControlLabel
                                                    value="2"
                                                    control={<Radio color="secondary" />}
                                                    label={<span>{"Send a code to my email address ("}{<span style={{ fontWeight: "bold" }}>{this.state.email}</span>}{" )"}</span>}
                                                />
                                                <FormControlLabel
                                                    value="1"
                                                    control={<Radio color="secondary" />}
                                                    label={<span>{"Send a code to my mobile number ( "}{<span style={{ fontWeight: "bold" }}>{this.state.phone}</span>}{" )"}</span>}

                                                />
                                            </RadioGroup>
                                        </FormControl>
                                        { this.state.authenticationType == true ? 
                                        <div className='w-100 sendText'>
                                            <p>
                                                You agree that Southwest Gas may call and/or send text messages to you at any telephone number associated with your account, including wireless telephone numbers that could result in charges for you. The manner in which these calls or text messages are made to you may include, but is not limited to, the use of pre-recorded/ artificial voice messages and/or automatic telephone dialing system. You can edit your notification preferences for your account at any time.
                                            </p>
                                            <p className="borderTop">Click the <b>NEXT</b> button to accept the Terms & Conditions or <b>CANCEL</b> to go back.</p>
                                        </div> : ''
                                        }
                                    </div>
                                    <div className="FormButtonsArea">
                                        <Button onClick={this.handleCancle} aria-label="Click here to Cancel button" color="secondary" className="ButtonPrimary">Cancel</Button>
                                        <Button
                                            onClick={this.handleNext}
                                            aria-label="Click here to be next "
                                            type="button" color="secondary"
                                            variant="contained"
                                            className="ButtonPrimary">Next</Button>
                                    </div>
                                </div> : 
                                <div className='twofactor-module__leftside mt30'>
                                    <h3 className="pb-3">Two-Factor Authentication</h3>
                                    <p>We've just sent a code to { this.state.authenticationType==="2" ?this.state.email:this.state.phone} Enter that code below. </p>
                                    <div className="tfa-code">
                                        <input type="text" 
                                            name="one"
                                            class="TFA"                                          
                                            aria-label="input feild"
                                            autoComplete="off"
                                            maxLength="1"
                                            // value={this.state.one || ''}
                                            onKeyDown={(e)=> this.inputKeyPress(e)}
                                            onChange={(e) => this.inputValChange(e)}
                                            />
                                        <input type="text"
                                            aria-label="input feild"
                                            name="two"
                                            class="TFA"
                                            autoComplete="off"
                                            // value={this.state.two || ''}
                                            onKeyDown={(e)=> this.inputKeyPress(e)}
                                            onChange={(e) => this.inputValChange(e)}
                                            maxLength="1" />
                                        <input type="text"
                                            aria-label="input feild"
                                            name="three"
                                            class="TFA"
                                            autoComplete="off"
                                            // value={this.state.three || ''}
                                            onKeyDown={(e)=> this.inputKeyPress(e)}
                                            onChange={(e) => this.inputValChange(e)}
                                            maxLength="1" />
                                        <input type="text"
                                            aria-label="input feild"
                                            name="four"
                                            class="TFA"
                                            autoComplete="off"
                                            // value={this.state.four || ''}
                                            onKeyDown={(e)=> this.inputKeyPress(e)}
                                            onChange={(e) => this.inputValChange(e)}
                                            maxLength="1" />
                                        <input type="text"
                                            aria-label="input feild"
                                            name="five"
                                            class="TFA"
                                            autoComplete="off"
                                            // value={this.state.five || ''}
                                            onKeyDown={(e)=> this.inputKeyPress(e)}
                                            onChange={(e) => this.inputValChange(e)}
                                            maxLength="1" />
                                        <input type="text"
                                            aria-label="input feild"
                                            name="six"
                                            class="TFA mr-0"
                                            autoComplete="off"
                                            // value={this.state.six || ''}
                                            onKeyDown={(e)=> this.inputKeyPress(e)}
                                            onChange={(e) => this.inputValChange(e)}
                                            maxLength="1" />
                                    </div>
                                    <p className="text-muted mt20">Verifying your account helps keep your account more secure</p>
                                    <a href="javascript:void(0)"
                                        aria-label='Click here to resend activation code'
                                        id="btnResend"
                                        className="link-color w-100 mt20"
                                        onClick={this.handleResend}
                                        >Resend activation code
                                    </a>
                                    <div className="FormButtonsArea">
                                        <Button aria-label="Click here to Cancel button" color="secondary" className="ButtonPrimary green-color tfa-green-color-btn" onClick={this.handleCancle}>Cancel</Button>
                                        <Button aria-label="Click here to Submit button" color="secondary" variant="contained" className="ButtonPrimary green-btn" onClick={this.handleSubmit}>Submit</Button>
                                    </div>
                                </div> }                      
                        </MDBCol>
                        <MDBCol lg="4" sm="12" className="twofactor-module__rightside d-none d-sm-block" role="region" aria-label="two factor right sidebar">
                            <b>Why Two-Factor Authentication?</b>
                            <p>Two-Factor Authentication, sometimes referred to as two-step verification or dual-factor authentication is designed to prevent unauthorized users from gaining access to your account.</p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <MessageBox ref={this.messageRef} />
            </section>
        );

    }
}

export default withStyles(styles)(TwoFactorAuth);