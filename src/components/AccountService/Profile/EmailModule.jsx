import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MDBCol } from "mdbreact";
import { TextValidator } from 'react-material-ui-form-validator';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
	button: {
		margin: 0,
	},
});

class EmailModule extends React.Component {
	state = {
		email: this.props.email,
		CountryCode: '',
		open: false,

	};
	handleChange = name => event => {

		this.setState({ email: event.target.value });
		this.props.SetUserInformation(this.props.id, event.target.value);
	};

	handleOnChange = (event) => {

		this.props.SetUserInformation(this.props.id, event.target.value);
		const email = event.target.value;
		this.setState({ email });
	}

	render() {
		const { classes } = this.props;
		const { email } = this.state;
		return (
			<div id="EmailSection" className="myprofileEditbox profile-feild-width">
				<TextField className="editFields"
					id="filled-email-input"
					label="EMAIL ADDRESS"
					type="text"
					name="email"
					autoComplete="email"
					margin="normal"
					variant="filled"
					defaultValue={email}
					onChange={this.handleOnChange}
		
					inputProps={{
						validatemessage: "Please enter a valid Email Address. ",
						mandatory: "1",
						maxlength: "50",
						inputtype: "Email",
						'aria-label': "Enter Email id"
					}}
				/>
					
			</div>
		);
	}
}

export default withStyles(styles)(EmailModule);
