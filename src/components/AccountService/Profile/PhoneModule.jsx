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

class PhoneModule extends React.Component {

	constructor(props) {
		super(props);

		const pt = this.props.PhoneType === 2 ? 2 : 1;

		this.state = {
			CountryCodes: '',
			PhoneType: pt,
			PhoneNumber:this.props.phoneNumber ? MaskPhoneNumber(this.props.phoneNumber.replace("(", '').replace(")", '').replace("-", '').replace(" ", '')) : null,
		}
	}

	handleTextChange = event => {

		var number = event.target.value.replace("-", '').replace("-", '').replace(" ", '');
		if (number.length <= 10) {
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
			<div id="EditPhoneSection" className="myprofileEditbox profile-feild-width">
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
					<TextField className="editFields"
						id="PrimaryPhoneNumber"
						label="PHONE (PRIMARY)"
						name="primaryphone"
						value={this.state.PhoneNumber}
						onChange={this.handleTextChange}
						margin="normal"
						variant="filled"

						inputProps={{
							validatemessage: "Please enter Mobile Phone Number",
							invaliderrormessage: "Please enter a valid 10 digit Mobile Phone Number",
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

PhoneModule.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhoneModule);