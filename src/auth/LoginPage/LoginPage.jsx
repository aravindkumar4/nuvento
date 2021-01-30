import React from 'react';
import {MDBListGroup, MDBContainer, MDBBtn,MDBAlert, MDBRow, MDBCol } from 'mdbreact';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import { userService } from '../_services';
import './login.css';
import googlelogo from '../../assets/images/google.png';
import logoWhite from '../../assets/images/duke_white.png';
import { Link } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import ExpandMore from '@material-ui/icons/ExpandMore';


class LoginPage extends React.Component {
    
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: '',
            BankAccount: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value} = e.target;
        this.setState({ [name]: value});
    }
    handleSelect = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({ loading: true });
        userService.login(username, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }

    handleOnChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleChangeButton = (e) => {
        alert(e.currentTarget.value)
        this.props.setFieldValue('degreeLevel', e.currentTarget.value);
    }
    render() {
        const { username, password, submitted, loading, error} = this.state;
 
        return (
            <section className="loginbg" role="region" aria-label="login">
            <MDBContainer>
                <Grid item className="LoginColumn" lg={12} xs={12} sm={12}>
                <Grid className="logoContainer" lg={6} sm={6} xs={12}>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol size="6"> <a aria-label="South west gas logo" id="logo-container" href="#" className="brand-logo"><img src={logoWhite} alt="South west gas logo" /></a></MDBCol>
                        <MDBCol size="6">  
                        <FormControl class="formControl langSelect">
                        <InputLabel shrink htmlFor="year-label-placeholder"></InputLabel>
                        <Select classes={{ icon: 'DropIconStyle'}}
                            value={this.state.BankAccount}
                            onChange={this.handleSelect}
                            name="BankAccount"
                            input={<Input disableUnderline name="BankAccount" id="year-label-placeholder" />}
                            displayEmpty 
                            IconComponent = {ExpandMore}
                            iconStyle={{color: "#fff"}} 
                            inputProps={{
                                'aria-label':'select year'
                            }}
                        >
                <MenuItem value=""><em>English</em> </MenuItem>
                <MenuItem value={10}>Spanish</MenuItem>
                <MenuItem value={20}>French</MenuItem>
                </Select>
                    </FormControl></MDBCol>
                    </MDBRow>
                </MDBContainer>


			    </Grid>
                <Grid className="logoContainer" lg={6} xs={12} sm={6}>
                    </Grid>
                <Grid item lg={6} sm={6} xs={12}>
                <Paper elevation={1} className="loginPaper" role="region" aria-label="login box">
                <Typography component="h3" color="primary" variant="h3" className="Loginpagehead">Log into your account</Typography>
                <form name="form" onSubmit={this.handleSubmit} className="LoginForm">
                <div className="GoogleLogin">
                <MDBBtn color="white" className="loginboxbutton"><img src={googlelogo} alt="google" className="googlelogo"/>Sign in with Google</MDBBtn>
                </div>
                <div className="dividersection">
                <Typography>or</Typography>
                </div>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                    <TextField className="LoginTextFields"
                        id="username"
                        label="Enter Email Address *"
                        type="text"
                        name="username"
                        autoComplete="email"
                        margin="normal"
                        variant="filled"  value={username} onChange={this.handleChange}
                    />
                        {/* <TextField className="LoginTextFields"
                            id="username"
                            label="Enter Email Address *"
                            type="text"
                            name="username"
                            margin="normal"
                            variant="outlined" value={username} onChange={this.handleChange}
                            /> */}
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                    <TextField  className="LoginTextFields"
                            id="outlined-password-input"
                            label="Password *"
                            name="password" 
                            type="password"
                            autoComplete = 'newpassword'
                            margin="normal"
                            variant="filled" value={password} onChange={this.handleChange} 
                        />
                        {/* <TextField className="LoginTextFields"
                            id="outlined-password-input"
                            label="Password *"
                            name="password" 
                            type="password"
                            autoComplete = 'newpassword'
                            margin="normal"
                            variant="outlined" value={password} onChange={this.handleChange} 
                            /> */}
                                            
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                    <FormControlLabel
                        control={
                            <Checkbox
                            checked={this.state.checkedB}
                            onChange={this.handleOnChange('checkedB')}
                            value="checkedB"
                            color="secondary"
                            />
                        }
                        label="Remember Me"
                        />
                    </div>
                    <div className="form-group" style={{position:'relative'}}>
                    <button aria-label="loding button" variant="contained" color="primary" className="btn btn-primary loginboxbutton" disabled={loading}>
                    Login</button>
                        {loading &&
                         <CircularProgress className="SpinnCirc" size={60} thickness={3} />
                        }
                        </div>
                    {error &&
                    <MDBAlert color="danger" className="warningError">
                    {error}
                    </MDBAlert>                     
                    }
                </form>
                <MDBListGroup className="extralinks">
                    <Link to="/ForgotPassword" aria-label="Click here to forgot password">Can't login?</Link>
                    <Link to="/Register" aria-label="Click here to registeration">Don't have an account? Register</Link>
                </MDBListGroup>
            </Paper>
            </Grid>
            <Grid item lg={6} sm={6} xs={12} className="RightSectionBar">
            <h3>No Login Required</h3>
            <MDBListGroup className="LoginLists">
                <Link aria-label="Click here to make payment" to="/MakePayment"><i class="material-icons">attach_money</i>Make a Payment</Link>
                <Link to="/StartService" aria-label="Click here to start service"><i class="material-icons">power_settings_new</i>Start Service</Link>
                <Link to="/StopService" aria-label="Click here to stop service"><i class="material-icons">close</i>Stop Service</Link>
                <Link to="/PreOutages" aria-label="Click here to view outage"><i class="material-icons">offline_bolt</i>View Outages</Link>
            </MDBListGroup>
            </Grid>
            </Grid>
            </MDBContainer>
            </section>
        );

    }
}

export {LoginPage}; 
