'use strict'
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { HandleCutCopyPasteRule, CheckIfNullOrEmpty, ValidateSinglePage, NumericOnly } from './../../../../core/common/validate';
import { MaskTaxID } from '../../../../core/common/common';
import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from "../../../../core/Enum";
import RequestHelper from "../../../../common/RequestHelper";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: theme.palette.background.paper,
    },
    formControl: {
        margin: '10px',
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
    },
    formLabel: {
        fontSize: '18px',
        color: '#005984',
        marginBottom: '25px',
    },

    optionlabel: {
        float: 'left',
        width: 'auto',
        marginRight: '60px !important',
        marginBottom: '0',
    },
    formgroup: {
        flexDirection: 'column',
        display: 'inline-block',
    },
    AccountSpanContainer: { display: 'flex' },
    AccountSpan: { flex: 1, alignSelf: 'center', },
    Radiogroup: { flexDirection: 'row' }
});

const MailingAddress = (props) => {
    const { id, onChangeText, handleDDLStateChange } = props;

    const _onStateValChange = (e) => {
        setState(e.target.value);
        handleDDLStateChange(e.target.name, e.target.value);
    }

    const _local = JSON.parse(localStorage.getItem("AARegistrationStep1"));
    const [state, setState] = React.useState(_local ? _local['State' + id] : '');
    const [stateData, setStateData] = React.useState([
        { value: 'AZ', text: 'AZ' },
        { value: 'CA', text: 'CA' },
        { value: 'NV', text: 'NV' }
    ]);

    //TODO: Move this to parent component to remove duplicate calls
    React.useEffect(() => {
        const url = "users/getUserStates";
        const params = "?countryCode=USA";

        RequestHelper.GET(url, APIURLTypeEnum.UserManagement, params, (res) => {
            if (res && res.status == StatusCodeEnum.OK) {
                if (res.data) {
                    if (res.data.data) {
                        let options = res.data.data.statesData.map(function (val) {
                            return { value: val.stateCode, text: val.stateName };
                        });

                        setStateData(options);
                    } else {
                    }
                } else {
                }
            } else {
            }
        });
    }, []);

    return (
        <React.Fragment>
            <TextField
                id={"Address" + id}
                className="TextFieldWrapper"
                label="Street Address"
                margin="normal"
                variant="filled"
                value={_local ? _local['Address' + id] : ''}
                onChange={onChangeText}
                inputProps={{
                    invaliderrormessage: id === 1
                        ? "Please enter Street Address"
                        : "Please enter Street Address",
                    validatemessage: id === 1
                        ? "Please enter Street Address"
                        : "Please enter Street Address",
                    mandatory: '1',
                    InputType: "StreetNo",
                    "minlength": "2",
                    "maxlength": "40",
                    'aria-label': "Please enter Street Address"
                }}
            />

            <div className="row no-gutters w-100">
                <div className="col-md-6">
                    <TextField
                        id={"City" + id}
                        className="TextFieldWrapper"
                        label="City"
                        margin="normal"
                        variant="filled"
                        onChange={onChangeText}
                        value={_local ? _local['City' + id] : ''}
                        inputProps={{
                            invaliderrormessage: "Please enter a valid City",
                            validatemessage: "Please enter City", mandatory: '1', InputType: "StreetNo",
                            "minlength": "2",
                            "maxlength": "40",
                            'aria-label': "Enter City"
                        }}
                    />
                </div>

                <div className="col-md-3 pl-3">
                    <FormControl variant="filled" className={props.classes.formControl}>
                        <InputLabel id="stateID" htmlFor="state" className = {!!state ? "MuiInputLabel-filled MuiInputLabel-shrink" : ""   }  >State</InputLabel>
                        <Select classes={{ icon: 'DropIconStyle' }}
                            native
                            id={"State" + id}
                            input={<FilledInput name={"State" + id} id={"State" + id} />}
                            //value={this.props.CareProgramPayload.CareProgramPayload.month}
                            //value={_local ? _local['State' + id] : ''}
                            value={state}
                            onChange={_onStateValChange}
                            inputProps={{
                                invaliderrormessage: "Please select State",
                                'aria-label': "Please select State",
                                validatemessage: "Please select State",
                                mandatory: '1'
                            }}
                        >
                            <option></option>
                            {stateData.map(option => (
                                <option value={option.value}>
                                    {option.text}
                                </option>
                            ))}
                   
                        </Select>
                    </FormControl>
                </div>

                <div className="col-md-3 pl-3">
                    <TextField
                        id={"ZipCode" + id}
                        className="TextFieldWrapper"
                        label="ZIP Code"
                        margin="normal"
                        variant="filled"
                        onChange={onChangeText}
                        value={_local ? _local['ZipCode' + id] : ''}
                        inputProps={{
                            validatemessage: "Please enter ZIP Code",
                            invaliderrormessage:  "Please enter a valid 5 digit ZIP Code",
                            maxlength: "5",
                            minlength: "5",
                            mandatory: "1",
                            inputType: "ZipCode",
                            'aria-label': 'Enter ZIP Code'
                        }}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
let step1 = {};
class StepOne extends React.Component {
    state = {
        labelWidth: 0,
        value: 'acntno',
        gas: true,
        electric: true,
        lighting: true,
        gasmeter: true,
        electricmeter: true,
        openResComVal: 'residential',
        applyTo: '',
        usePhysical: true
    };

    componentWillMount() {
        // localStorage.clear()
        const _local = JSON.parse(localStorage.getItem("AARegistrationStep1"));
        
        if (_local) {
            this.setState({
                usePhysical: _local.usePhysical
            })
        } else {
            this.setState({ usePhysical: true });
            step1.usePhysical = true;
            localStorage.setItem("AARegistrationStep1", JSON.stringify(step1));
        }
    }

    handleChangeApplyTo = event => {
        this.setState({
            applyTo: event.target.value
        })
    };
    handleClick = event => {
        this.setState({ showdiv: true });
    };
    handleOnClick = event => {
        this.setState({ showdiv: false });
    };

    handleOnChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    handleChangeNew = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleChange = event => {
        this.setState({ value: event.target.value });
    };
    openResCom = (event) => {
        this.setState({ openResComVal: event.target.value });
    }
    handleChangeCheckbox = name => event => {
        this.setState({ usePhysical: event.target.checked });
        step1.usePhysical = event.target.checked;
        localStorage.setItem("AARegistrationStep1", JSON.stringify(step1));
    };

    handleOnChangeTextField = (e) => {
        
        this.setState({ [e.target.id]: event.target.value });
        if (e.target.id == "OrgName") {
            step1.OrgName = event.target.value;
        }
        if (e.target.id == "TaxIDNumber") {
            event.target.value = MaskTaxID(event.target.value);
            step1.TaxIDNumber = event.target.value;
        }
        // for physical Address
        if (e.target.id == "Address1") {
            step1.Address1 = event.target.value;
        }
        if (e.target.id == "City1") {
            
            step1.City1 = event.target.value.replace(/[^A-Za-z ]/ig, '');;
        }
        if (e.target.id == "ZipCode1") {
            event.target.value = NumericOnly(event.target.value);
            step1.ZipCode1 = event.target.value;
        }

        // for mailing Address
        if (e.target.id == "Address2") {
            step1.Address2 = event.target.value;
        }
        if (e.target.id == "City2") {
            step1.City2 = event.target.value.replace(/[^A-Za-z ]/ig, '');
        }
        if (e.target.id == "ZipCode2") {
            event.target.value = NumericOnly(event.target.value);
            step1.ZipCode2 = event.target.value;
        }
        localStorage.setItem("AARegistrationStep1", JSON.stringify(step1));
    };

    handleDDLStateChange = (name, value) => {
        if (name == "State1") {
            step1.State1 = value;
        }
        if (name == "State2") {
            step1.State2 = value;
        }
        localStorage.setItem("AARegistrationStep1", JSON.stringify(step1));
    }
    render() {
        
        const { classes } = this.props;
        const _local = JSON.parse(localStorage.getItem("AARegistrationStep1"));
        //const { gas, electric, lighting, gasmeter, electricmeter, } = this.state;
        let resCom = false;
        if (this.state.openResComVal === 'residential') {
            resCom = true
        }
        return (
            <div className='rows'>
                {console.log(_local, 'orgName')}
                <div class="stepone agencyRegis">
                    <div className='requestree'>
                        <div className="grouppay">
                            <div class="register_first">
                                <form className={classes.root} autoComplete="off" noValidate>
                                    <MDBContainer>
                                        <MDBRow>
                                            <MDBCol className="FormWrapper registerStep1">
                                                <form id="registrationSection1" className="stepperForm" noValidate autoComplete="off">
                                                    <TextField
                                                        id="OrgName"
                                                        className="TextFieldWrapper"
                                                        label="Organization Name "
                                                        margin="normal"
                                                        variant="filled"
                                                        value={_local ? _local.OrgName : ''}
                                                        onChange={this.handleOnChangeTextField}
                                                        inputProps={{
                                                            invaliderrormessage: "Please enter Organization Name",
                                                            'aria-label': "Enter Organization Name",
                                                            validatemessage: "Please enter Organization Name",
                                                            mandatory: '1',
                                                            maxlength: "100",
                                                        }}
                                                    />
                                                    <TextField
                                                        id="TaxIDNumber"
                                                        className="TextFieldWrapper"
                                                        label="Tax ID Number"
                                                        margin="normal"
                                                        variant="filled"
                                                        value={_local ? _local.TaxIDNumber : ''}
                                                        onChange={this.handleOnChangeTextField}
                                                        inputProps={{
                                                            invaliderrormessage: "Please enter a valid 9 digit Tax Identification Number (TIN).",
                                                            validatemessage: "Please enter Tax Identification Number (TIN)", maxlength: "10", minlength: "10", mandatory: '1', InputType: "taxid",
                                                            'aria-label': "Enter Tax Id Field"
                                                        }}
                                                    />
                                                    <MailingAddress classes={classes} id={1} onChangeText={this.handleOnChangeTextField} handleDDLStateChange={this.handleDDLStateChange} />

                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control={<Checkbox color="secondary" checked={this.state.usePhysical} onChange={this.handleChangeCheckbox()} value="" />}
                                                            label={<span>Same as mailing address</span>}
                                                        />
                                                    </FormGroup>

                                                    {!this.state.usePhysical && (<div>
                                                        <h3>Mailing  Address</h3>
                                                        <MailingAddress classes={classes}
                                                            id={2}
                                                            onChangeText={this.handleOnChangeTextField} handleDDLStateChange={this.handleDDLStateChange}  /> </div>)}
                                                </form>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBContainer>
                                </form>
                            </div>
                            {/* <div id="results" className="aptsuit turnservicessteps" hidden = {!this.state.showdiv}> </div> */}
                            <Grid component="div" id="results" className="turnservicessteps" hidden={!this.state.showdiv}>
                                <Typography component="p" variant="body1">More than 1 person was found. Please enter your Account Number or full Service Address</Typography>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <RadioGroup className={classes.Radiogroup} aria-label="Select account number or service address" name="AccountSelection" value={this.state.value} onChange={this.handleChange}>
                                        <FormControlLabel
                                            value="acntno"
                                            control={<Radio color="secondary" />}
                                            label="Account Number"
                                        />
                                        <FormControlLabel
                                            value="serviceaddress"
                                            control={<Radio color="secondary" />}
                                            label="Service Address"
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <TextField inputProps={{'aria-label':'Enter account number'}} id="outlined-name" label="Enter Account Number" className={'TextFieldWrapper'}
                                    value={this.state.name} onChange={this.handleChangeNew('Enter Account Number')} margin="normal" variant="filled" />
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

StepOne.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepOne);