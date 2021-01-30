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

class AltPhoneModule extends React.Component {

	constructor(props) {
		super(props);

		const pt = this.props.PhoneType === 2 ? 2 : 1;

		let phoneNum = '';
		if (this.props.phoneNumber) {
			phoneNum = this.props.phoneNumber.replace("(", '').replace(")", '').replace("-", '').replace(" ", '');
		}

		this.state = {
			CountryCodes: '',
			PhoneType: pt,
			PhoneNumber: MaskPhoneNumber(phoneNum),
		}
	}

	handleTextChange = event => {

		var number = event.target.value.replace("(", '').replace(")", '').replace("-", '').replace(" ", '');
		if (number.length <= 11) {
			this.setState({ PhoneNumber: MaskPhoneNumber(number) });
			this.props.SetUserInformation(this.props.id, number, this.state.PhoneType);
		}
	};
	handleTypeChange = event => {

		var number = this.props.phoneNumber;
		var phonetype = event.target.value;
		this.setState({ PhoneType: event.target.value });
		//this.props.SetUserInformation(this.props.id,phonetype,phonetype);
		this.props.SetUserInformation(this.props.id, number, phonetype);
	};
	render() {
		const { classes } = this.props;
		return (
			<div id="EditAltPhoneSection" className="myprofileEditbox">
				{/* 
				<MDBCol lg="5" sm="6" xs="12">
					<FormControl variant="filled" className="editFields">
						<InputLabel htmlFor="PhoneType">Type*</InputLabel>
						<Select
							value={this.state.PhoneType}
							onChange={this.handleTypeChange}
							input={<FilledInput name="PhoneType" id="PhoneType" />}
						>
							<MenuItem value={1}>Mobile</MenuItem>
							<MenuItem value={2}>Landline</MenuItem>
						</Select>
					</FormControl>
				</MDBCol>
				*/}
					<TextField className="editFields profile-feild-width"
						id="PrimaryPhoneNumber"
						label="Landline"
						name="primaryphone"
						value={this.state.PhoneNumber}
						onChange={this.handleTextChange}
						margin="normal"
						variant="filled"
						inputProps={{
							validatemessage: "Please enter a valid 10 digit Landline Number.",
							invaliderrormessage: "Please enter a valid 10 digit Landline Number.",
							maxlength: "14",
							inputtype: 'ALTPhone',
							'aria-label': "Enter Secondary Phone number"
						}}
					/>
			</div>
		);
	}
}

AltPhoneModule.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AltPhoneModule);