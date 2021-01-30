import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MDBCol } from "mdbreact";
import { TextValidator } from 'react-material-ui-form-validator';

const useStyles = makeStyles(theme => ({
	button: {
		margin: 0,
	},
}));

export default function PrimaryEmail(props) {
	const {isValidEmail}=props
	const [email, setEmail] = React.useState(props.val);

	const handleOnChange = (event) => {
		const email = event.target.value;
		setEmail(email);
		isValidEmail(email);
	}

	const classes = useStyles();
	return (
		<div class="profileEditbox row">
			<MDBCol lg="6" sm="6" xs="12">
				<TextValidator className="editFields"
					id="filled-email-input"
					label="Email Address*"
					type="email"
					name="email"
					onChange={handleOnChange}
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

