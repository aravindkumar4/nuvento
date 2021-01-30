import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { MaskPhoneNumber } from '../../../../core/common/common';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        border: 'none',
    },
    control: {
        padding: theme.spacing.unit * 2
    },
    formgroup: {
        flexDirection: 'column',
        display: 'inline-block',
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
    },
});
let step2 = {};
class StepTwo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            error1: false,
        }
    }


    handleConfirmEmail= (e) => {
        step2.PCConfirmEmailAddress = event.target.value;
        if (event.target.value !== this.state.PCEmailAddress &&
            event.target.value && this.state.PCEmailAddress && event.target.value.trim().toLowerCase() !== this.state.PCEmailAddress.trim().toLowerCase()) {
            this.setState({ error: true });
        } else {
            this.setState({ error: false });
        }
    }

    handleSecondaryConfirmEmail= (e) => {
        step2.SCConfirmEmailAddress = event.target.value;
        if (event.target.value !== this.state.SCEmailAddress) {
            this.setState({ error1: true });
        } else {
            this.setState({ error1: false });
        }
    }


    handleOnChangeTextField = (e) => {
        this.setState({ [e.target.name]: event.target.value });
        // for Primary Contact Information
        if (e.target.name == "PCName") {
            step2.PCName = event.target.value;
        }
        if (e.target.name == "PCJobTitle") {
            step2.PCJobTitle = event.target.value;
        }
      
        if (e.target.name == "PCEmailAddress") {
            
            step2.PCEmailAddress = event.target.value;
            if (this.state.PCConfirmEmailAddress) {
                if (event.target.value !== this.state.PCConfirmEmailAddress &&
                    event.target.value && this.state.PCConfirmEmailAddress && event.target.value.trim().toLowerCase() !== this.state.PCConfirmEmailAddress.trim().toLowerCase() ) {
                    this.setState({ error: true });
                } else {
                    this.setState({ error: false });
                }
            }
        }
        if (e.target.name == "PCConfirmEmailAddress") {
            step2.PCConfirmEmailAddress = event.target.value;
            this.setState({ error: false });
            // if (event.target.value !== this.state.PCEmailAddress &&
            //     event.target.value && this.state.PCEmailAddress && event.target.value.trim().toLowerCase() !== this.state.PCEmailAddress.trim().toLowerCase()) {
            //     this.setState({ error: true });
            // } else {
            //     this.setState({ error: false });
            // }
        }
        if (e.target.name == "PCPhone") {
            step2.PCPhone = MaskPhoneNumber(event.target.value);
        }
        if (e.target.name == "PCFax") {
            step2.PCFax = MaskPhoneNumber(event.target.value);
        }
        if (e.target.name == "PCMobile") {
            step2.PCMobile = MaskPhoneNumber(event.target.value);
        }

        if (e.target.name == "SCMobile") {
            step2.SCMobile = MaskPhoneNumber(event.target.value);
        }
        
        // for Secondary Contact Information
        if (e.target.name == "SCName") {
            step2.SCName = event.target.value;
        }
        if (e.target.name == "SCJobTitle") {
            step2.SCJobTitle = event.target.value;
        }
        if (e.target.name == "SCEmailAddress") {
            step2.SCEmailAddress = event.target.value;
            if (this.state.SCConfirmEmailAddress) {
                if (event.target.value !== this.state.SCConfirmEmailAddress) {
                    this.setState({ error1: true });
                } else {
                    this.setState({ error1: false });
                }
            }
        }
        if (e.target.name == "SCConfirmEmailAddress") {
             step2.SCConfirmEmailAddress = event.target.value;
            // if (event.target.value !== this.state.SCEmailAddress) {
            //     this.setState({ error1: true });
            // } else {
            //     this.setState({ error1: false });
            // }
        }
        if (e.target.name == "SCPhone") {
            step2.SCPhone = MaskPhoneNumber(event.target.value);
        }
        if (e.target.name == "SCFax") {
            step2.SCFax = MaskPhoneNumber(event.target.value);
        }
        localStorage.setItem("AARegistrationStep2", JSON.stringify(step2));
    }
    validationMessage = (name, value) => {
        
        let message = "";
        switch (name) {
            case "PCConfirmEmailAddress":
                message = value == "" ? "" : "Your confirm email address does not match primary contact email.";
                break;
            case "SCConfirmEmailAddress":
                message = value == "" ? "" : "Your confirm email address does not match secondary contact email.";
                break;
            default:
                break;
        }
        return message;
    };
    render() {
        const { classes } = this.props;
        const _local = JSON.parse(localStorage.getItem("AARegistrationStep2"));
        return (
            <div className='rows'>
                <div class="stepone regisSecondStep">
                    <div className='requestree'>
                        <div className="grouppay">
                            <div class="register_first">
                                <form id="registrationSection2" className={classes.root} autoComplete="off">
                                    <MDBContainer>
                                        <MDBRow>
                                            <MDBCol className="FormWrapper registerStep1">
                                                <h3>Primary Contact Information</h3>
                                                <form className={classes.container} noValidate autoComplete="off">
                                                    <TextField id="PCName" label="Contact Name" className={'TextFieldWrapper'}
                                                        value={_local ? _local.PCName : ''} margin="normal" variant="filled" name="PCName"
                                                        onChange={this.handleOnChangeTextField}
                                                        inputProps={{
                                                            mandatory: "1",
                                                            maxlength: "100",
                                                            validationtype: "3",
                                                            validatemessage: "Please enter Primary Contact Name.",
                                                            "aria-label": "Enter Primary Contact Name",
                                                        }}
                                                    />

                                                    <TextField id="PCJobTitle" label="Contact Job Title" className={'TextFieldWrapper'}
                                                        value={_local ? _local.PCJobTitle : ''} margin="normal" variant="filled" name="PCJobTitle"
                                                        onChange={this.handleOnChangeTextField}
                                                        inputProps={{
                                                            mandatory: "1",
                                                            validationtype: "3",
                                                            "maxlength": "60",
                                                            validatemessage: "Please enter Primary Contact Job Title.",
                                                            "aria-label": "Enter Primary Contact Job Title",
                                                        }}
                                                    />

                                                    <TextField id="PCEmailAddress" label="Contact Email" className={'TextFieldWrapper'}
                                                        value={_local ? _local.PCEmailAddress : ''} margin="normal" variant="filled" name="PCEmailAddress"
                                                        onChange={this.handleOnChangeTextField}

                                                        inputProps={{
                                                            "maxlength": "100",
                                                            "mandatory": "1",
                                                            "inputType": "Email",
                                                            validatemessage: "Please enter valid Primary Contact Email.",
                                                            "aria-label": "Enter Primary Contact Email",
                                                        }}
                                                    />

                                                    <TextField id="PCConfirmEmailAddress" label="Confirm Contact Email" className={'helper-text-feild TextFieldWrapper'}
                                                        value={_local ? _local.PCConfirmEmailAddress : ''} margin="normal"
                                                        variant="filled" name="PCConfirmEmailAddress"
                                                        onChange={this.handleOnChangeTextField}
                                                        onBlur={ this.handleConfirmEmail }
                                                        
                                                        onPaste={e => e.preventDefault()}
                                                        error={this.state.error}
                                                        helperText={
                                                            this.state.error
                                                                ? this.validationMessage("PCConfirmEmailAddress", this.state.PCConfirmEmailAddress)
                                                                : ""
                                                        }
                                                        inputProps= {{
                                                            "maxlength": "100",
                                                            "mandatory": "1",
                                                            "inputType": "text",
                                                            validatemessage: !(!!this.state.PCConfirmEmailAddress) ?"Please enter primary confirm Contact Email Address." :'',
                                                            "aria-label": "Please enter primary confirm Contact Email Address.",
                                                        }}
                                                    />

                                                    <TextField id="PCPhone" label="Phone (primary)" className={'TextFieldWrapper'}
                                                        value={_local ? _local.PCPhone : ''} margin="normal" variant="filled" name="PCPhone"
                                                        onChange={this.handleOnChangeTextField}
                                                        inputProps={{
                                                            validatemessage: "Please enter a valid 10 digit primary Phone Number",
                                                            invaliderrormessage: "Please enter a valid 10 digit primary Phone Number.",
                                                            mandatory: "1",
                                                            maxlength: "12",
                                                            minLength: '12',
                                                            inputtype: 'Phone',
                                                            'aria-label': 'Enter Phone number'
                                                        }}
                                                    />
                                                    <TextField id="PCMobile" label="Mobile (optional)" className={'TextFieldWrapper'}
                                                       value={_local ? _local.PCMobile : ''} margin="normal" variant="filled" name="PCMobile"
                                                        onChange={this.handleOnChangeTextField}
                                                        inputProps={{
                                                            validatemessage: "Please enter a valid 10 digit mobile Number",
                                                            invaliderrormessage: "Please enter a valid 10 digit mobile Number.",
                                                            mandatory: "0",
                                                            maxlength: "12",
                                                            minLength: '12',
                                                            inputtype: 'mobile',
                                                            'aria-label': 'Enter mobile number'
                                                        }}
                                                    />
                                                    <TextField id="PCFax" label="Fax (optional)" className={'TextFieldWrapper'}
                                                        value={_local ? _local.PCFax : ''} margin="normal" variant="filled" name="PCFax"
                                                        onChange={this.handleOnChangeTextField}
                                                        inputProps={{
                                                            validatemessage: "Please enter a valid 10 digit primary contact Fax Number.",
                                                            invaliderrormessage: "Please enter a valid 10 digit primary contact Fax Number.",
                                                            maxlength: "12",
                                                            minLength: '12',
                                                            inputtype: 'Phone',
                                                            'aria-label': 'Enter Primary Contact Fax'
                                                        }}
                                                    />

                                                    <h3 className="secHeading">Secondary Contact Information</h3>

                                                    <TextField id="outlined-name" label="Contact Name (optional)" className={'TextFieldWrapper'}
                                                        value={_local ? _local.SCName : ''} margin="normal" variant="filled" name="SCName"
                                                        inputProps={{
                                                            maxlength: "100",
                                                            'aria-label': 'Enter Secondary Contact Name'
                                                        }}
                                                        onChange={this.handleOnChangeTextField}
                                                    />

                                                    <TextField id="outlined-name" label="Contact Job Title (optional)" className={'TextFieldWrapper'}
                                                        value={_local ? _local.SCJobTitle : ''} margin="normal" variant="filled" name="SCJobTitle"
                                                        onChange={this.handleOnChangeTextField}
                                                        inputProps={{
                                                            "maxlength": "60",
                                                            'aria-label': 'Enter Contact job title'
                                                        }}
                                                    />

                                                    <TextField id="outlined-name" label="Contact Email (optional)"
                                                        className={'TextFieldWrapper'}
                                                        value={_local ? _local.SCEmailAddress : ''}
                                                        margin="normal" variant="filled" name="SCEmailAddress"
                                                        onChange={this.handleOnChangeTextField}
                                                        // inputProps={{
                                                        //     "maxlength": "100",
                                                        //     "inputType": "Email",
                                                        // }}
                                                        inputProps={{
                                                                validatemessage: "Please enter valid Secondary Email",
                                                                invaliderrormessage: "Please enter valid Secondary Email",
                                                            "maxlength": "100",
                                                            "inputType": "Email",
                                                            'aria-label': 'Enter Secondary Email address'
                                                        }}
                                                    />

                                                    <TextField id="outlined-name" label="Confirm Contact Email (optional)" className={'helper-text-feild TextFieldWrapper'}
                                                        value={_local ? _local.SCConfirmEmailAddress : ''} margin="normal" variant="filled" name="SCConfirmEmailAddress"
                                                        onChange={this.handleOnChangeTextField}
                                                        onPaste={e => e.preventDefault()}
                                                        onBlur={this.handleSecondaryConfirmEmail}
                                                        error={this.state.error1}
                                                        helperText={
                                                            this.state.error1
                                                                ? this.validationMessage("SCConfirmEmailAddress", this.state.SCConfirmEmailAddress)
                                                                : ""
                                                        }
                                                        inputProps={{
                                                            validatemessage: !(!!this.state.SCConfirmEmailAddress)? "Please confirm your secondary Contact Email Address." : '',
                                                            invaliderrormessage: !(!!this.state.SCConfirmEmailAddress)?  "Please confirm your secondary Contact Email Address.":'',
                                                            "maxlength": "100",
                                                            "inputType": "Email",
                                                            'aria-label': 'Please confirm your secondary Contact Email Address.'
                                                        }}
                                                    />

                                                    <TextField id="outlined-phone" label="Phone (optional)" className={'TextFieldWrapper'}
                                                        value={_local ? _local.SCPhone : ''} margin="normal" variant="filled" name="SCPhone"
                                                        onChange={this.handleOnChangeTextField}
                                                        inputProps={{
                                                            validatemessage: "Please enter a valid 10 digit Secondary Contact Phone Number.",
                                                            invaliderrormessage: "Please enter a valid 10 digit Secondary Contact Phone Number.",
                                                            maxlength: "12",
                                                            minLength: '12',
                                                            inputtype: 'Phone',
                                                            'aria-label': 'Enter Secondary Contact Phone number'
                                                        }}
                                                    />
                                                    <TextField id="SCMobile" label="Mobile (optional)" className={'TextFieldWrapper'}
                                                       value={_local ? _local.SCMobile : ''} margin="normal" variant="filled" name="SCMobile"
                                                        onChange={this.handleOnChangeTextField}
                                                        inputProps={{
                                                            validatemessage: "Please enter a valid 10 digit mobile Number",
                                                            invaliderrormessage: "Please enter a valid 10 digit mobile Number.",
                                                            mandatory: "0",
                                                            maxlength: "12",
                                                            minLength: '12',
                                                            inputtype: 'Phone',
                                                            'aria-label': 'Enter mobile number'
                                                        }}
                                                    />
                                                    <TextField id="outlined-fax" label="Fax (optional)" className={'TextFieldWrapper'}
                                                        value={_local ? _local.SCFax : ''} margin="normal" variant="filled" name="SCFax"
                                                        onChange={this.handleOnChangeTextField}
                                                        inputProps={{
                                                            validatemessage: "Please enter a valid 10 digit secondary contact Fax Number.",
                                                            invaliderrormessage: "Please enter a valid 10 digit secondary contact Fax Number.",
                                                            maxlength: "12",
                                                            minLength: '12',
                                                            inputtype: 'Phone',
                                                            'aria-label': 'Enter Secondary Contact Fax'
                                                        }}
                                                    />
                                                </form>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBContainer>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

StepTwo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepTwo);
