import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { MDBContainer, MDBCol } from 'mdbreact';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './../../assets/css/login.css';
import { Link  } from "react-router-dom";

const styles = theme => ({
    ButtonContained: {
        backgroundColor: '#27A088',
    }
});

class AuthenticationFailed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const { classes } = this.props;
        return (
            <section className="loginbg">
                <MDBContainer className="AuthenticationFail">
                    <Grid item className="LoginColumn" lg={12} xs={12} sm={12}>
                        <MDBCol lg="6" sm="8" xs="12" className="float-left">
                            <div className="w-100">
                                <div className="loginPaper twoFactor text-left mt30">
                                    <Typography component="h3" color="primary" className="Loginpagehead border-bottom pb-3">Authentication Failed</Typography>
                                    <p>You have exceeded the maximum number of verification attempts. Please wait 30 minutes before trying to 
                                    <Link to="/Login" title="Click Here to Login"> log in</Link> again.</p>
                                    <h4 className="mayAlso">
                                        You may also try:
                                    </h4>
                                    <div className="w-100">
                                        {/* <Link to="/ForgotPassword" className="link-color d-flex flex-column" title="Click Here to Reset Password">Resetting your password </Link> */}
                                        <Link to="/Help" className="link-color d-flex flex-column pt-2" title="Click Here to Customer Solutions">Contacting SWG Customer Solutions</Link>
                                    </div>
                                </div>
                            </div>
                        </MDBCol>
                        <MDBCol lg="6" sm="4" className="float-left rightArea d-none d-sm-block">
                            <div class="enrollboxarea">
                                <b>Why Two Factor Authentication?</b>
                                <p>Two Factor Authentication, sometimes referred to as two-step verification or dual-factor authentication is designed to prevent unauthorized users from gaining access to your account.</p>

                            </div>
                        </MDBCol>
                    </Grid>
                </MDBContainer>
            </section>
        );
    }
}


export default withStyles(styles)(AuthenticationFailed);