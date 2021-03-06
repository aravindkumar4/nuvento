import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import { withStyles } from '@material-ui/core/styles';
import './../forgotPassword/forgot-module.scss';
import { User } from '../../../core/URLConfig';
import RequestHelper from '../../../common/RequestHelper';
import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from "../../../core/Enum";
import MessageBox from '../../../Shared/Views/MessageBoxV1';
const styles = theme => ({
	ButtonContained: {
		padding: '10px 35px',
		margin: '20px 0 0 0',
		width: '100%',
		position: 'relative'
	},
});


class ForgotUserID extends React.Component {

	constructor(props) {
		super(props);
		this.massegeRef = React.createRef();
	}
	state = {
		email: '',
		zip: '',
		accountNumber: '',
		loader: false,
		isAccountNumber: false,
	};


	cancel = () => {
		
       this.props.history.push('/');
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	handleOnChange = (event) => {
		this.setState({ email: event.target.value });
	}

	handleOnAccountChange = (event) => {
		this.setState({ accountNumber: event.target.value });
	}



	onSubmit = () => {
		
		var regxEmailFilter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!(this.state.email)) {
			this.massegeRef.current.showMessage("error", "Please enter email id fields.");
			return true;
		}
		else if (!regxEmailFilter.test(this.state.email)) {
			this.massegeRef.current.showMessage("error", "Please enter valid email address.");
			return true;
		}

		this.setState({ loader: true });
		var params = {
			"email": this.state.email,
		};
		RequestHelper.POST(User.ForgotUsername, APIURLTypeEnum.Agency, params, (resp) => {
			this.setState({ loader: false });
			
			if (resp.status == 200) {
				this.props.history.push('/ForgotUserIDSuccess?id =' + this.state.email);
				let path = `ForgotUserIDSuccess`;

			}
			
			else if (resp.response && resp.response.data.status.code == 409) {

				this.massegeRef.current.showMessage("error", resp.response.data.status.message);

			} else {
				this.massegeRef.current.showMessage("error", resp.response.data.status.message);
				if (this.state.isAccountNumber) {
					this.setState({ isAccountNumber: true });
				} else {
					this.setState({ isAccountNumber: false });
				}
			}
		});



	}




	render() {
		const { classes } = this.props;
		return (
			<div className="forgot-module">
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-lg-7 text-left m-auto">
							<div className="forgot-module">
								<h3>Forgot Username?</h3>
								<h5>Please enter the primary email address associated with your account.</h5>
								<span className="content">We will send your Username to your email</span>
								<TextField
									className="TextFieldWrapper editFields"
									id="emailAddress"
									label="Primary Email Address"
									type="text"
									name="emailAddress"

									margin="normal"
									variant="filled"
									onChange={this.handleOnChange}
									autoComplete="off"
									value={this.state.email}
									inputProps={{
										inputtype: "Email",
										invaliderrormessage: "Please enter the primary email address associated with your MyAccount.",
										validatemessage: "Please enter the primary email address associated with your MyAccount.",
										mandatory: "1",
										'aria-label': "Please enter valid email",
										autocomplete: "off"
									}}
								/>


								<div className="form-group row">
									<div className="col-sm-6 pr-sm-0">
										<Button aria-label="Click Here to Cancel" onClick={this.cancel} type="button" variant="outlined" color="secondary" className={classes.ButtonContained}>Cancel</Button>
									</div>
									<div className="col-sm-6">
										<Button aria-label="Click Here to Submit" onClick={this.onSubmit} type="button" variant="contained" color="secondary" className={`forget-conti ${classes.ButtonContained}`}>Continue</Button>
										{/* <Button aria-label="Click Here to Submit" onClick={this.onSubmit} >  type="button" variant="contained" color="secondary" className={`forget-conti ${classes.ButtonContained}`}>Continue</Button> */}
									</div>
								</div>
							</div></div>
					</div>
				</div>

				{this.state.loader &&
					<div className='custom-loader'><CircularProgress className="SpinnCirc" size={50} thickness={3} /></div>
				}
				<MessageBox ref={this.massegeRef} />
			</div>


		)
	};

}
export default withStyles(styles)(ForgotUserID);