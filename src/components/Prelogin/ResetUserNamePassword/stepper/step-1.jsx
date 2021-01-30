import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import PasswordStrength from '../PasswordStrength';
import clsx from 'clsx';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { validatePasswordIndicator, RenderPasswordIndicator } from "./../../../common/passwordIndicator";
import { HandleCutCopyPasteRule } from "./../../../../core/common/validate";
import Loader from "../../../../shared/Views/Loader";
import {SetTFADataModel,GetTFADataModel} from "../../../../store/LegacyUserDataStore";


const styles = theme => ({

});

class StepTwo extends React.Component {
  state = {
    ConfirmPassword: '',
    password: '',
    SecurityQuestion1: '',
    SecurityQuestion2: '',
    ShowPasswordIndicator: false,
    Username:'',
    name:''

  };
  

  componentDidMount() {
    
    const UserDetails=GetTFADataModel();
    if(!UserDetails.hasOwnProperty("LegacyUserData"))
    {
      window.location.href="#/";

       return;
    }
    this.setState({Username:UserDetails.LegacyUserData.userName})
    this.setState({name:UserDetails.LegacyUserData.userName})
    
  }
  handleClick = event => {
    this.setState({ showdiv: true });
  };

  handleChangeNew = name => event => {
    let self = this;
    
    this.setState({ [name]: event.target.value }, () => {
      localStorage.setItem("loginFirstStep", JSON.stringify(self.state));
    });

  };

  handleChangeNEW = prop => event => {
    
    let self = this;

    if(prop==='ConfirmPassword')
    {
    if(event.target.value.length==33)
    return;
    }
    if(prop === 'password')
    {
    
      if(event.target.value.length==33)
      return;


      
      validatePasswordIndicator(event) ;
      var data = this.state.ShowPasswordIndicator;
    }
    this.setState({ [prop]: event.target.value }, () => {
      localStorage.setItem("loginFirstStep", JSON.stringify(self.state));
    });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  handleClickShowConfirmPassword = () => {
    this.setState(state => ({ showConfirmPassword: !state.showConfirmPassword }));
  };

  render() {
    const { classes } = this.props;

    return (
      <form
        name="form"
        autoComplete="off"
        id="PasswordChangeSection"
        onSubmit={(e) => e.preventDefault()}
        eventTriggerId="pswrdSubmit"
      >
        <React.Fragment>
      <div className='rows loginSecStep'>
        <div class="stepone">

          <div className="grouppay">
            <div class="register_first">

              <MDBContainer>
                <MDBRow>
                  <MDBCol className="FormWrapper registerStep1">
                    <form noValidate autoComplete="off">
                      <TextField id="outlined-name" label="Username" className={'TextFieldWrapper'}
                        // helperText="Username already in use."
                        value={this.state.Username} onChange={this.handleChangeNew('Username')} margin="normal" variant="filled" />


                      <div className="passwordStrengthGroup">
                        <TextField id="filled-password" className={'TextFieldWrapper'} variant="filled" type={this.state.showPassword ? 'text' : 'password'}
                          label="Password" value={this.state.password} 
                          onFocus={() => this.setState({ ShowPasswordIndicator: true })}
                          onBlur={() => this.setState({ ShowPasswordIndicator: false })}
                          onChange={
                             
                            this.handleChangeNEW('password')
                          
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword} >
                                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }} />
                        {/* This sectio start for strength password */}
                        {
                          this.state.passwordStrenghtToggle ? <PasswordStrength /> : null
                        }

                        <RenderPasswordIndicator ShowPasswordIndicator={this.state.ShowPasswordIndicator} />
                        {/* This sectio End for strength password */}

                      </div>

                      <div className="passwordStrengthGroup">
                        <TextField id="filled-confirm-password" className={'TextFieldWrapper'} variant="filled" type={this.state.showConfirmPassword ? 'text' : 'password'}
                          label="Confirm Password" value={this.state.ConfirmPassword} 
                          
                          onCopy={HandleCutCopyPasteRule}
                          onCut={HandleCutCopyPasteRule}
                          onPaste={HandleCutCopyPasteRule}
                          onChange={this.handleChangeNEW('ConfirmPassword')}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowConfirmPassword} >
                                  {this.state.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }} />

                      </div>

                      <div className="alreadyAcc">
                        {/* <Link aria-label="click here to login" to="/">Already have an account?</Link> */}
                      </div>
                    </form>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>

          </div>

        </div>
      </div>
      </React.Fragment>
      </form>
    );
  }
}

StepTwo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepTwo);
