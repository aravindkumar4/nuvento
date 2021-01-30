import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { MDBCol } from "mdbreact";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FilledInput from '@material-ui/core/FilledInput';
import TextField from '@material-ui/core/TextField';
import { MaskPhoneNumber } from '../../../core/common/common';
const styles = theme => ({
});

class FaxModule extends React.Component {

	constructor(props) {
        super(props);
        

		const pt = this.props.PhoneType === 2 ? 2 : 1;

		this.state = {
			CountryCodes: '',
			PhoneType: pt,
			fax:this.props.phoneNumber ? MaskPhoneNumber(this.props.phoneNumber.replace("(", '').replace(")", '').replace("-", '').replace(" ", '')) : null,
		}
	}

	handleTextChange = event => {
		var number = event.target.value.replace("-", '').replace("-", '').replace(" ", '');
		if (number.length <= 10) {
			this.setState({ fax: MaskPhoneNumber(number) });
			this.props.SetUserInformation(this.props.id, number, this.state.PhoneType);
		}
	};
	handleTypeChange = event => {

		var number = this.props.fax;
		var phonetype = event.target.value;
		this.setState({ PhoneType: event.target.value });
		//this.props.SetUserInformation(this.props.id,phonetype,phonetype);
		this.props.SetUserInformation(this.props.id, number, phonetype);
	};
	render() {
		const { classes } = this.props;
		return (
			<div id="EditPhoneSection" className="myprofileEditbox profile-feild-width">
				
					<TextField className="editFields"
						id="PrimaryPhoneNumber"
						label="FAX (OPTIONAL)"
						name="primaryphone"
						value={this.state.fax}
						onChange={this.handleTextChange}
						margin="normal"
						variant="filled"

						inputProps={{
							validatemessage: "Please enter Fax Number",
							invaliderrormessage: "Please enter a valid 10 digit Fax Number",
							mandatory: "1",
							maxlength: "14",
							minLength: '14',
							inputtype: 'Phone',
						'aria-label':'Enter Phone number'
						}}
					/>
			</div>
		);
	}
}

FaxModule.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FaxModule);