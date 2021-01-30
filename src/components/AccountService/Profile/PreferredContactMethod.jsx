import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MDBCol } from "mdbreact";
import { TextValidator } from 'react-material-ui-form-validator';

const styles = theme => ({
	button: {
		margin: 0,
	},
});

class PreferredContactMethod extends React.Component {
	state = {
		email: '',
		CountryCode: '',
		PrimaryPhoneNumber: '323 444 9942',
		open: false,

	};
	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	handleOnChange = (event) => {
		const email = event.target.value;
		this.setState({ email });
	}

	render() {
		const { classes } = this.props;
		const { email } = this.state;
		return (
			<div class="profileEditbox row">
				<MDBCol lg="6" sm="6" xs="12">

					<TextValidator className="editFields"
						id="filled-email-input"
						label="Email Address*"
						type="email"
						name="email"
						onChange={this.handleOnChange}
						autoComplete="email"
						margin="normal"
						variant="filled"
						value={email}
						validators={['required', 'isEmail']}
						errorMessages={['this field is required', 'Enter a valid email address']}
						inputProps={{
							'aria-label':'Enter Phone number'
							}}
					/>
				</MDBCol>
			</div>
		);
	}
}

export default withStyles(styles)(PreferredContactMethod);
