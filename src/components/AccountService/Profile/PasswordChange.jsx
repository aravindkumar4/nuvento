import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import { RenderPasswordIndicator, validatePasswordIndicator } from "./../../common/passwordIndicator";


const styles = theme => ({
	button: {
		fontSize: 15,
		paddingRight: 35,
		paddingLeft: 35,
		textTransform: 'capitalize',
	},
	formtemp: {
		flex: '1',
	},
	buttonsection: {
		flex: '1',
		marginTop: '25px',
		marginBottom: '12px',
		textAlign: 'right',
		display:'flex'
	},

});
class PasswordChange extends React.Component {
  state = {
      password: '',
      newPassword: '',
      confirmnewPassword: '',
      showPassword: false,
      showconfirmPassword: false,
      showexistingPassword:false,
      passwordErrorFlag: false,
      newPasswordErrorFlag: false,
      confirmnewPasswordErrorFlag: false,
      passwordErrorText: "",
      newPasswordErrorText: "",
      confirmnewPasswordErrorText: "",
      ShowPasswordIndicator: false,
  };
  handleChange = prop => event => {
      this.setState({ [prop]: event.target.value });
      setTimeout(() => {
          this.props.passwordInfo(this.state.password, this.state.newPassword, this.state.confirmnewPassword);
      }, 1);
      validatePasswordIndicator(event) ;
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickShowConfirmPassword = () => {
    this.setState(state => ({ showconfirmPassword: !state.showconfirmPassword }));
  };

  handleCancelPassword = (prop) => {
    this.props.handleCancelPassword();
    this.resetValidation();
}

resetValidation = () => {
    this.setState({
        passwordErrorFlag: false,
        newPasswordErrorFlag: false,
        confirmnewPasswordErrorFlag: false,
        passwordErrorText: "",
        newPasswordErrorText: "",
        confirmnewPasswordErrorText: "",
    })
  }

resetPassword = (prop) => {
    this.resetValidation();
    if ((this.state.password == '' && this.state.newPassword == '')||(this.state.newPassword == '' && this.state.confirmnewPassword == '') || (this.state.password == '' && this.state.confirmnewPassword == '')) {
        this.props.resetPassword();
    } else if (this.state.password == '') {
        this.setState({ passwordErrorFlag: true, passwordErrorText: "Please enter your existing password." })
        return;
    } else if (this.state.newPassword == '') {
        this.setState({ newPasswordErrorFlag: true, newPasswordErrorText: "Please enter new password" })
        return;
    } else if (this.state.confirmnewPassword == '') {
        this.setState({ confirmnewPasswordErrorFlag: true, confirmnewPasswordErrorText: "Please confirm password" })
        return;
    } else {
        this.props.resetPassword();
    }

}


  handleClickshowconfirmPassword = () => {
    
    const existing =! this.state.showexistingPassword; 
    this.setState(state => ({ showexistingPassword:  existing}));
    var data= this.state;
  };

  render() {

    const { classes } = this.props;
      return (
       
          <div className="myprofileEditbox row w-100">

                  <MDBCol lg="3" md="6" sm="12" xs="12">
                      <TextField className="editFields"
                          id="filled-password-input"
                          error={this.state.passwordErrorFlag}
                          helperText={this.state.passwordErrorText}
                          label="Existing Password"
                          type={this.state.showexistingPassword ? 'text' : 'password'}
                          value={this.state.password}
                          onChange={this.handleChange('password')}
                          autoComplete="current-password"
                          margin="normal"
                          variant="filled"
                          inputProps={{
                                'aria-label':'Enter Old password'
                            }}
                          InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickshowconfirmPassword}
                                    >
                                        {this.state.showexistingPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </MDBCol>

                <MDBCol lg="3" md="6" sm="12" xs="12">
                    <TextField
                        id="NewPassword"
                        className="editFields"
                        error={this.state.newPasswordErrorFlag}
                        helperText={this.state.newPasswordErrorText}
                        onFocus={() => this.setState({ ShowPasswordIndicator: true })}
                        onBlur={() => this.setState({ ShowPasswordIndicator: false })}
                        variant="filled"
                        type={this.state.showPassword ? 'text' : 'password'}
                        label="New Password"
                        value={this.state.newPassword}
                        onChange={this.handleChange('newPassword')}
                        inputProps={{
                            'aria-label': 'Enter new Password'
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <RenderPasswordIndicator ShowPasswordIndicator={this.state.ShowPasswordIndicator} />
                </MDBCol>

                <MDBCol lg="3" md="6" sm="12" xs="12">
                    <TextField
                        id="ConfirmNewPassword"
                        className="editFields"
                        error={this.state.confirmnewPasswordErrorFlag}
                        helperText={this.state.confirmnewPasswordErrorText}
                        variant="filled"
                        type={this.state.showconfirmPassword ? 'text' : 'password'}
                        label="Confirm New Password"
                        value={this.state.confirmnewPassword}
                        onChange={this.handleChange('confirmnewPassword')}
                        inputProps={{
                            'aria-label': 'Enter confirm Password'
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowConfirmPassword}
                                    >
                                        {this.state.showconfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </MDBCol>
                <MDBCol lg="3" md="6" sm="12" xs="12">
                    <div className={`${classes.buttonsection} d-block d-md-flex`}>                  
                        <Button aria-label="click here to cancel" color="secondary" className={classes.button} onClick={ this.handleCancelPassword}>CANCEL</Button>
                        <Button aria-label="click here to save" variant="contained" color="secondary" onClick={ this.resetPassword} className={classes.button}>SAVE </Button>
                    </div>    
                </MDBCol>
            </div>

        );
    }
}

export default withStyles(styles)(PasswordChange);
