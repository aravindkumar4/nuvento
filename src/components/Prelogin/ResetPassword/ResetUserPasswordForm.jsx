import React from "react";
import PropTypes from "prop-types";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "./../forgotPassword/forgot-module.scss";
import { User } from "../../../core/URLConfig";
import RequestHelper from "../../../common/RequestHelper";
import {
  StatusCodeEnum,
  APIURLTypeEnum,
  NotificationMessageTypeEnum,
} from "../../../core/Enum";
import MessageBox from "../../../Shared/Views/MessageBoxV1";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MDBContainer, MDBRow, MDBCol, MDBListGroup } from "mdbreact";
import { Link } from "react-router-dom";
import { css } from "glamor";
import { RenderPasswordIndicator, validatePasswordIndicator } from "./../../common/passwordIndicator";

import Paper from "@material-ui/core/Paper";
const styles = (theme) => ({
  button: {
    margin: 0,
  },
  ButtonContained: {
    padding: "10px 35px",
    margin: "20px 0 0 0",
    width: "100%",
  },
});

class ResetUserPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ConfirmPassword: "",
      password: "",
      ShowPasswordIndicator: false,
      showConfirmPassword: false,
      showPassword: false,
      isValidLink: false,
      ErrorMessage: "",
      apierror: false,
      loader: false,
	  token: "",
	  ShowPasswordIndicator: false,
    };
    this.massegeRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let token = this.props.location.search;
    token = !!token ? token.split("=")[1] : null;
    if (token) {
      this.setState({ token: token });
      this.validateToken(token);
    }
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  getRequest = (token, password, isValidation) => {
    const params = {
      token: token,
      newPassword: password,
      isValidation: isValidation,
    };
    return params;
  };

  validateToken = (token, password) => {
    this.setState({ loader: true });
    const request = this.getRequest(token, "", true);
    RequestHelper.POST(
      User.ResetPassword,
      APIURLTypeEnum.Agency,
      request,
      (resp) => {
        this.setState({ loader: false });
        if (resp.status == 200) {
          this.setState({ isValidLink: true });
        } else {
          this.setState((state) => ({
            ErrorMessage: resp.response.data.status.message,
          }));
        }
      }
    );
  };

  handleChange = (name) => (event) => {
	this.setState({ [name]: event.target.value });
	validatePasswordIndicator(event) ;
  };

  cancel = () => {
    this.props.history.push("/");
  };

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.password === "" || this.state.ConfirmPassword === "") {
      this.massegeRef.current.showMessage(
        "error",
        "Mandatory fields are required"
      );
      return true;
    } else if (this.state.password != this.state.ConfirmPassword) {
      this.massegeRef.current.showMessage(
        "error",
        "Confirm Password Does not match"
      );
      return true;
	} else if (!(this.state.password.match(/[a-z]/g) && 
		this.state.password.match(/[A-Z]/g) && 
		(this.state.password.match( /[0-9]/g) || 
		this.state.password.match( /[^a-zA-Z\d]/g)) && 
		this.state.password.length >= 8)) {
			this.massegeRef.current.showMessage(
				"error",
				"Please enter a valid password."
				);
		return true;
	}
    this.setState({ loader: true });

    const request = this.getRequest(
      this.state.token,
      this.state.password,
      false
    );
    RequestHelper.POST(
      User.ResetPassword,
      APIURLTypeEnum.Agency,
      request,
      (resp) => {
        this.setState({ loader: false });
        if (resp.status == 200) {
          let path = `ResetPasswordFormSuccess`;
          this.props.history.push(path);
        } else {
          this.massegeRef.current.showMessage(
            "error",
            resp.response.data.status.message
          );
        }
      }
    );
  }

  handleClick = (event) => {
    this.setState({ showdiv: true });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ value: event.target.value });
  };

  handleChangeNew = (name) => (event) => {
	validatePasswordIndicator(event) ;
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeNEW = (prop) => (event) => {
    // if (event.target.name == "password" || event.target.name == "confirmPassword") {
    // 	event.target.value = event.target.value.replace(/[ ]/g, '')
    // 	event.target.name == "password" ? validatePasswordIndicator(event) : "";
    // }
	validatePasswordIndicator(event) ;
    this.setState({ [prop]: event.target.value });
    var data = this.state;
  };

  handleClickShowPassword = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }));
  };
  handleClickShowConfirmPassword = () => {
    this.setState((state) => ({
      showConfirmPassword: !state.showConfirmPassword,
    }));
  };
  handleCancelClick = () => {
    let path = `login`;
    this.props.history.push({
      pathname: path,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="forgot-module">
        {this.state.loader && (
          <div className="custom-loader">
            <CircularProgress className="SpinnCirc" size={50} thickness={3} />
          </div>
        )}
        <MessageBox ref={this.massegeRef} />

        {this.state.isValidLink == true && (
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-lg-7 text-left m-auto">
                <div className="forgot-module">
                  <h3>Reset Password</h3>
                  <TextField
                    id="password"
                    name="password"
                    className={"TextFieldWrapper"}
					variant="filled"
					onFocus={() => this.setState({ ShowPasswordIndicator: true })}
                    onBlur={() => this.setState({ ShowPasswordIndicator: false })}
                    type={this.state.showPassword ? "text" : "password"}
                    label="New Password"
                    value={this.state.password}
                    onChange={this.handleChangeNEW("password")}
                    inputProps={{
                      invaliderrormessage: "Please enter a valid password.",
                      validatemessage: "Please enter New Password.",
                      maxlength: "32",
                      minlength: "8",
                      mandatory: "1",
                      InputType: "Password",
                      "aria-label": "Enter password",
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                          >
                            {this.state.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    // InputProps={{
                    // 	endAdornment: (
                    // 		<InputAdornment position="end">
                    // 			<IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword} >
                    // 			{this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    // 			</IconButton>
                    // 		</InputAdornment>
                    // 	)
                    // }}
                  />
				  <RenderPasswordIndicator ShowPasswordIndicator={this.state.ShowPasswordIndicator} />
                  <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    className={"TextFieldWrapper"}
                    variant="filled"
                    type={this.state.showConfirmPassword ? "text" : "password"}
                    label="Confirm Password"
                    value={this.state.ConfirmPassword}
                    onChange={this.handleChangeNEW("ConfirmPassword")}
                    inputProps={{
                      invaliderrormessage:
                        "Passwords do not match, please try again.",
                      validatemessage: "Please Confirm Password.",
                      maxlength: "32",
                      minlength: "8",
                      mandatory: "1",
                      InputType: "ConfirmPassword",
                      confirmWithPasswordID: "password",
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowConfirmPassword}
                          >
                            {this.state.showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <div className="form-group row">
                    <div className="col-sm-6 pr-sm-0">
                      <Button
                        aria-label="Click Here to Cancel"
                        type="button"
                        variant="outlined"
                        color="secondary"
                        onClick={this.cancel}
                        className={classes.ButtonContained}
                      >
                        Cancel
                      </Button>
                    </div>

                    <div aria-label="Submit button" className="col-sm-6 ">
                      <Button
                        aria-label="Click Here to Continue"
                        type="submit"
                        variant="contained"
                        color="secondary"
                        onClick={this.handleSubmit}
                        className={classes.ButtonContained}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.isValidLink == false && (
          <div>
            {/* <Typography component="h2" color="primary"  style={{ color: 'red', textAlign: 'center' }}>
		{this.state.ErrorMessage}</Typography> */}

            <MDBContainer>
              <MDBRow>
                <MDBCol lg="7" sm="12" xs="12" className="successarea">
                  <MDBCol size="12" className="float-left">
                    <Paper className={"wrapper-box registerSucess ShortPaper"}>
                      <div className="billingpayarea">
                        <div className="successview">
                          <span>{this.state.ErrorMessage}</span>
                        </div>

                        <div className="resendLink text-center w-100">
                          {/* <Link to="/ForgotPassword" style={{ lineHeight: '50px' }}>Resend recovery link</Link> */}
                        </div>
                      </div>
                    </Paper>
                  </MDBCol>
                </MDBCol>
              </MDBRow>
              <MDBListGroup className="returnlinks">
                <Link to="/">Return to login</Link>
              </MDBListGroup>
            </MDBContainer>
          </div>
        )}
      </div>
    );
  }
}

ResetUserPasswordForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetUserPasswordForm);
