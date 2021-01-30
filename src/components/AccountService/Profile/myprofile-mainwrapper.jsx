import React, { useEffect, useState, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MDBCol } from "mdbreact";
import AltPhone from './AltPhone';
import PrimaryEmail from './PrimaryEmail';
import PreferredContactMethod from './PreferredContactMethod';
import PasswordChange from './PasswordChange';
import PrimaryRoleModule from './PrimaryRoleModule';
import PrimaryPhoneModule from './PrimaryPhoneModule';
import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Snackbar from '@material-ui/core/Snackbar';
import RequestHelper from "../../../common/RequestHelper";
import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from "../../../core/Enum";
import Loader from "../../../shared/Views/Loader";
import { isEmailAddress } from "../../../../src/common/Validation";
import IconButton from '@material-ui/core/IconButton';
import PhoneModule from './PhoneModule';
import AltPhoneModule from './AltPhoneModule';
import EmailModule from './EmailModule';
import UserContextModel from "../../../store/UserContextModel";
import { MaskPhoneNumber } from '../../../core/common/common';
import MessageBox from '../../../Shared/Views/MessageBoxV1';
import { ValidateSinglePage } from '../../../core/common/validate';
import MobileModule from './Mobile';
import FaxModule from './fax'
import { UpdatePrimaryContactNumber, UpdatePrimaryEmailAddress, ProfilePasswordChangeSuccessful, ProfilePasswordChangeAttemptFailed } from '../../../common/setBehaviourValue';
import { SetUserBehaviour } from '../../../core/services/setUserBehaviour';

import moment from "moment";
const styles = theme => ({
	button: {
		fontSize: 15,
		paddingRight: 35,
		paddingLeft: 35,
		textTransform: 'capitalize',
	},
	formtemp: {
		flex: '1',
	},
	buttonsection: {
		flex: '1',
		marginTop: '12px',
		marginBottom: '12px',
		textAlign: 'right',
		display: 'flex'
	},

});

class NameModule extends React.Component {
	state = {
		FirstName: '',
		LastName: ''
	};

	handleChange = name => event => {
		this.setState({ value: event.target.value });
		this.props.SetUserInformation(this.props.id, event.target.value);
	};

	render() {
		return (
			<div class="profileEditbox">
				<MDBCol lg="4" sm="6" xs="12">
					<TextField className="editFields"
						id="FirstName"
						label="First Name*"
						value={this.state.FirstName}
						onChange={this.handleChange('FirstName')}
						margin="normal" variant="filled"
					/></MDBCol>
				<MDBCol lg="4" sm="6" xs="12">
					<TextField className="editFields"
						id="LastName"
						label="Last Name*"
						value={this.state.LastName}
						onChange={this.handleChange('LastName')}
						margin="normal" variant="filled"
					/>
				</MDBCol>
			</div>
		);
	}
}


class AlternateEmail extends React.Component {
	state = {
		email: '',
		CountryCode: '',
		PrimaryPhoneNumber: '323 444 9942'
	};

	handleOnChange = (event) => {
		const email = event.target.value;
		this.setState({ email });
	}

	render() {
		const { classes } = this.props;
		const { email } = this.state;
		return (
			<div class="profileEditbox">
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

					/>
				</MDBCol>
			</div>
		);
	}
}

class ProfilePageMain extends React.Component {
	static contextType = UserContextModel;

	constructor(props) {
		super(props);
		this.state = {
			NameEditing: false, RoleEditing: false, PrimaryPhone: false, AltPhone: false, PrimaryEmail: false, PreferredContactMethod: false, Mobile: false, Fax: false,
			userName: "", agencyName: "", secondaryPhoneType: "", submittedMail: false, submittedAltMail: false,
			AltEmail: false, Password: false, userInfo: [], tempuserinfo: [],
			open: false, maxWidth: 'xs', success: false, data: {}, loading: false, isDisabled: false,
			name: "", primaryPhone: "", secondaryPhone: "", email: "", alternateEmail: "", password: "", primaryPhoneType: "", 
			bpNumber: '', newPassword: '', confirmNewPassword: '', tempFax: '', tempMobile: '', tempPrimaryPhone: '', tempEmail: '',
		}

		this.GetUserInformation = this.GetUserInformation.bind(this);
		this.SetUserInformation = this.SetUserInformation.bind(this);
		this.SaveUserMailPhone = this.SaveUserMailPhone.bind(this);
		//this.massegeRef = useRef(null);// React.createRef();
		this.massegeRef = React.createRef();
	}


	componentDidMount() {
		let ctrl = document.getElementById("dtAccount");
		if (ctrl) {
			ctrl.classList.add("active");
		}
		//
		//const _context = this.context;

		//if (_context !== undefined && _context.userModel.userId) {
		//	this.GetUserInformation(_context.userModel.userId);
		//	this.getSapAccountInformation(_context.userModel.userId);
		//}
		var userId = localStorage.getItem("UserId");
		if (userId) {
			this.GetUserInformation(userId);
			//this.getSapAccountInformation(userId);
		}
	}

	//getSapAccountInformation(userid) {
	//
	////https://d2.smartcmobile.net/SWG-EntUserManagement-API/api/1/users/1/AccountsAddress

	//const url = "";
	//const params = "users/" + userid + "/AccountsAddress";

	//RequestHelper.GET(
	//	url,
	//	APIURLTypeEnum.UserMgmt,
	//	params,
	//	(res) => {
	//		const { status, data, statusText } = res;
	//		if (status === StatusCodeEnum.OK && data.data) {
	//			const result = data.data.userAccounts.filter(x => x.default === true);
	//			if (result && result.length > 0) {
	//				this.setState({ bpNumber: result[0].customerNumber });
	//			} else if (data && data.data.userAccounts.length > 0) {
	//				this.setState({ bpNumber: data.data.userAccounts[0].customerNumber });
	//			}
	//		}
	//	});
	//}

	GetUserInformation(userId) {
		var self = this;
		try {
			self.setState({ loading: true });

			const url = "agency/GetUserProfile/";
			const params = "?userId=" + localStorage.getItem("UserId");

			RequestHelper.GET(
				url,
				APIURLTypeEnum.Agency,
				params,
				(res) => {
					if (res && res.status == StatusCodeEnum.OK) {
						let d = res.data.data;
						res.data.data.userByIdData = d;
						const agencyData = JSON.parse(localStorage.getItem("UData"));

						if (res.status == StatusCodeEnum.OK) {
							
							self.setState({
								userInfo: res.data.data.userByIdData,
								userName: res.data.data.userByIdData.userName,
								name: res.data.data.name ? res.data.data.name.toUpperCase() : '',
								primaryPhone: res.data.data.userByIdData.primaryPhone ? MaskPhoneNumber(res.data.data.userByIdData.primaryPhone) : null,
								secondaryPhone: !!res.data.data.userByIdData.secondaryPhone ? MaskPhoneNumber(res.data.data.userByIdData.secondaryPhone) : null,
								email: res.data.data.userByIdData.email,
								alternateEmail: res.data.data.userByIdData.alternateEmail,
								primaryPhoneType: res.data.data.userByIdData.primaryPhoneType,
								secondaryPhoneType: res.data.data.userByIdData.secondaryPhoneType,
								password: "",
								role: res.data.data.userByIdData.role.toUpperCase(),
								agencyName: agencyData.agency[0].agencyName,
								mobile: res.data.data.userByIdData.primaryMobile,
								fax: res.data.data.userByIdData.primaryFax,
								tempFax: res.data.data.userByIdData.primaryFax,
								tempMobile: res.data.data.userByIdData.primaryMobile,
								tempPrimaryPhone: res.data.data.userByIdData.primaryPhone ? MaskPhoneNumber(res.data.data.userByIdData.primaryPhone) : null,
								tempEmail: res.data.data.userByIdData.email,
							});
							self.setState({ loading: false });
						}
						else {
							self.setState({ loading: false, userInfo: [] });
						}
					} else {
						if (res.response && res.response.data) {
							self.setState({ loading: false });
						}
					}
				}
			);

			//let url = "https://d2.smartcmobile.net/SWG-EntUserManagement-API/api/1/users/" + userId;

			//RequestHelper.GET1(url, (res) => {
			//	const { status, data, statusText } = res;
			//	if (status) {

			//		if (res.status == StatusCodeEnum.OK) {
			//			self.setState({
			//				userInfo: res.data.data.userByIdData,
			//				userName: res.data.data.userByIdData.userName,
			//				name: (res.data.data.userByIdData.firstName + " " + res.data.data.userByIdData.middleName + " " + res.data.data.userByIdData.lastName),
			//				primaryPhone: res.data.data.userByIdData.primaryPhone ? res.data.data.userByIdData.primaryPhone : null,
			//				secondaryPhone: !!res.data.data.userByIdData.secondaryPhone ? res.data.data.userByIdData.secondaryPhone : null,
			//				email: res.data.data.userByIdData.email,
			//				alternateEmail: res.data.data.userByIdData.alternateEmail,
			//				primaryPhoneType: res.data.data.userByIdData.primaryPhoneType,
			//				secondaryPhoneType: res.data.data.userByIdData.secondaryPhoneType,
			//				password: ""
			//			});
			//			self.setState({ loading: false });
			//		}
			//		else {

			//			self.setState({ loading: false, userInfo: [] });

			//		}
			//	} else {
			//		if (res.response && res.response.data) {
			//			self.setState({ loading: false });

			//		}
			//	}
			//});
		}
		catch {
			self.setState({ loading: false });
		}

	}

	SetUserInformation(id, text, PhoneType = 0) {
		var self = this;
		switch (id) {
			case "UserName":
				self.setState({ userName: text });
				break;
			case "Name":
				self.setState({ name: text });
				break;
			case "PrimaryPhone":
				self.setState({ primaryPhone: text, primaryPhoneType: PhoneType });
				break;
			case "AltPhone":
				self.setState({ secondaryPhone: text, secondaryPhoneType: PhoneType });
				break;
			case "PrimaryEmail":
				self.setState({ email: text });
				break;
			case "AltEmail":
				self.setState({ alternateEmail: text });
				break;
			case "Mobile":
				self.setState({ mobile: text });
				break;
			case "Fax":
				self.setState({ fax: text });
				break;
		}
	}

	isValidEmail = (email) => {
		if (isEmailAddress(email)) {
			this.setState({ isDisabled: false });
		} else {
			this.setState({ isDisabled: true });
		}
	}

	handleClick() {
		this.setState(state => ({ NameEditing: !state.NameEditing }));
	}

	handleClickRole() {
		this.setState(state => ({ RoleEditing: !state.RoleEditing }));
	}

	handleClickPhone() {
		this.setState(state => ({
			PrimaryPhone: !state.PrimaryPhone,
			AltPhone: false,
			PrimaryEmail: false,
			Password: false,
			Fax:false,
			Mobile:false
		}));
	}

	handleClickMobile() {
		this.setState(state => ({
			PrimaryPhone: false,
			Mobile: !state.Mobile,
			PrimaryEmail: false,
			Password: false,
			Fax:false,
			AltPhone: false,
		}));
	}


	handleClickFax() {
		this.setState(state => ({
			PrimaryPhone: false,
			Fax: !state.Fax,
			PrimaryEmail: false,
			Password: false,
			Mobile: false,
			AltPhone: false,
		}));
	}

	handleCancelPhone() {
		this.setState({primaryPhone: this.state.tempPrimaryPhone})
		this.setState(state => ({ PrimaryPhone: false }));
	}

	handleCancelMobile() {
		this.setState({ mobile: this.state.tempMobile })
		this.setState(state => ({ Mobile: false }));
	}


	handleCancelFax() {
		this.setState({ fax: this.state.tempFax })
		this.setState(state => ({ Fax: false }));
	}

	//handleonPrimaryPhoneClick = () => {
	//	this.setState({
	//		success: true,
	//		PrimaryPhone: !this.state.PrimaryPhone
	//	});
	//};
	getApiRequest() {
		var AgencyNumber = localStorage.getItem("AgencyNumber");
		var UserId = localStorage.getItem("UserId");

		var apiRquest =
		{
			//"contractAccountNumber": SessionAccessor.AccountNumber,
			//"bpNumber": [this.state.bpNumber],
			"primaryPhone": this.state.primaryPhone != undefined ? this.state.primaryPhone : '',
			"primaryPhoneType": this.state.primaryPhoneType != undefined ? this.state.primaryPhoneType : 0,
			"secondaryPhone": this.state.secondaryPhone != undefined ? this.state.secondaryPhone : '',
			"secondaryPhoneType": this.state.secondaryPhoneType != undefined ? this.state.secondaryPhoneType : 0,
			"email": this.state.email != undefined ? this.state.email : '',
			"alternateEmail": this.state.alternateEmail != undefined ? this.state.alternateEmail : '',
		};

		return apiRquest;
	}

	handleonSavePrimaryPhone = () => {
		//this.handleClickOpen();
		if (ValidateSinglePage("EditPhoneSection")) {
			this.setState({ loading: true });
			var params = this.getApiRequest();

			this.SaveUserMailPhone("PrimaryPhone");
		} else {
			//
		}

		//var phonetypevalue=this.state.primaryPhoneType;
		//this.setState({ loading: true });
		//var params = this.getApiRequest();

		//this.SaveUserMailPhone("PrimaryPhone");

		//RequestHelper.PUT1("https://d2.smartcmobile.net/SWG-EntSAP-API/api/1/account/EmailPhoneUpdate", params, (res) => {
		//	this.setState({ loading: false });
		//	if (res.data.status.code == 200) {
		//		this.SaveUserMailPhone("PrimaryPhone");
		//	} else {
		//		this.setState({ loading: false });
		//		this.massegeRef.current.showMessage("error", res.response.data.status.message);
		//	}
		//}
		//);

		//this.setState({
		//	loading: false,
		//	success: true,
		//	PrimaryPhone: !this.state.PrimaryPhone
		//});
	}

	handleonSaveAltPhone = () => {
		if (ValidateSinglePage("EditAltPhoneSection")) {
			this.setState({ loading: true });
			var params = this.getApiRequest();

			this.SaveUserMailPhone("AltPhone");
		} else {
			//
		}
		//this.setState({ loading: true });
		//var params = this.getApiRequest();

		//this.SaveUserMailPhone("AltPhone");

		//RequestHelper.PUTURL(UserAPI.updatePhoneEmailSSA, params, (res) => {
		//	this.setState({ loading: false });
		//	if (res.data.status.code == 200) {
		//		this.SaveUserMailPhone("AltPhone");
		//	} else {
		//		this.setState({ loading: false });
		//		this.massegeRef.current.showMessage("error", res.response.data.status.message);
		//	}
		//}
		//);

	}

	handleonSaveMobile = () => {
		if(this.state.mobile !== '') {
			if (ValidateSinglePage("EditPhoneSection")) {
				this.setState({ loading: true });
				var params = this.getApiRequest();

				this.SaveUserMailPhone("Mobile");
			}
		} else {
			this.SaveUserMailPhone("Mobile");
		}


	}

	handleonSaveFax = () => {
		if(this.state.fax !== '') {
			if (ValidateSinglePage("EditPhoneSection")) {
				this.setState({ loading: true });
				var params = this.getApiRequest();
	
				this.SaveUserMailPhone("Fax");
			} 
		} else {
			this.SaveUserMailPhone("Fax");
		}
	}

	handleonSavePrimaryEmail = () => {
		if (ValidateSinglePage("EmailSection")) {
			this.setState({ open: false });
			this.setState({ loading: true });
			var params = this.getApiRequest();

			this.SaveUserMailPhone("PrimaryEmail");
		} else {
			//
		}

		//this.setState({ open: false });
		//this.setState({ loading: true });
		//var params = this.getApiRequest();

		//this.SaveUserMailPhone("PrimaryEmail");

		//RequestHelper.PUTURL(UserAPI.updatePhoneEmailSSA, params, (res) => {
		//	this.setState({ loading: false });
		//	if (res.data.status.code == 200) {
		//		this.SaveUserMailPhone("PrimaryEmail");
		//	} else {
		//		this.setState({ loading: false });
		//		this.massegeRef.current.showMessage("error", res.response.data.status.message);
		//	}
		//}
		//);

	}

	handleonSaveAltEmail = () => {
		var self = this;
		var result = ValidateSinglePage("AltEmailSection");
		if (result) {
			this.setState({ loading: true });
			var params = this.getApiRequest();
			self.SaveUserMailPhone("AltEmail");

			//RequestHelper.PUTURL(UserAPI.updatePhoneEmailSSA, params, (res) => {
			//	this.setState({ loading: false });
			//	if (res.data.status.code == 200) {
			//		self.SaveUserMailPhone("AltEmail");

			//	} else {
			//		this.setState({ loading: false });
			//		this.massegeRef.current.showMessage("error", res.response.data.status.message);
			//	}
			//});
		}
		else
			self.massegeRef.current.showMessage("error", "Please enter valid email Id.")
	}

	SaveUserMailPhone(id) {
		//var param = {
		//	"primaryPhone": this.state.userInfo.primaryPhone,
		//	"primaryPhoneType": this.state.userInfo.primaryPhoneType,
		//	"secondaryPhone": this.state.userInfo.secondaryPhone,
		//	"secondaryPhoneType": this.state.userInfo.secondaryPhoneType,
		//	"email": this.state.userInfo.email,
		//	"alternateEmail": this.state.alternateEmail,
		//	"modifiedType": 0
		//};
		var self = this;
		var UserId = localStorage.getItem("UserId");
		var p;
		let eventDetails = "";
		let setBehaviourValue = {};
		try {
			self.setState({ loading: true });

			switch (id) {
				case "PrimaryPhone":
					self.setState(state => ({ PrimaryPhone: !state.PrimaryPhone }));

					p = {
						"primaryPhone": {
							//"type": this.state.primaryPhoneType,
							"value": this.state.primaryPhone
								? this.state.primaryPhone.replace("(", '').replace(")", '').replace("-", '').replace(" ", '')
								: null
						},
						"secondaryPhone": null,
						"mobile": null,
						"fax": null
					};


					var url = "User/UpdatePhone?userid=" + UserId;
					eventDetails = UpdatePrimaryContactNumber.EventDetails.replace('<new number>', p.primaryPhone.value);
					setBehaviourValue = UpdatePrimaryContactNumber;
					this.updateProfile(UserId, url, p, "Mobile Phone Number", eventDetails, setBehaviourValue);
					return;
					break;
				case "AltPhone":
					self.setState(state => ({ AltPhone: !state.AltPhone }));

					p = {
						"primaryPhone": null,
						"secondaryPhone": {
							//"type": this.state.secondaryPhoneType,
							"value": this.state.secondaryPhone
								? this.state.secondaryPhone.replace("(", '').replace(")", '').replace("-", '').replace(" ", '')
								: null
						},
						"mobile": null,
						"fax": null
					}
					eventDetails = UpdateAlternateContactNumber.EventDetails.replace('<new number>', p.secondaryPhone.value).
					replace("<old number>", self.secondaryPhone.value);
					setBehaviourValue = UpdateAlternateContactNumber;
					var url = "User/UpdatePhone?userid=" + UserId;
					this.updateProfile(UserId, url, p, "Landline",eventDetails, setBehaviourValue);
					return;
					break;
				case "PrimaryEmail":
					self.setState(state => ({ PrimaryEmail: !state.PrimaryEmail }));

					p = {
						"oldEmailId": self.state.userInfo.email,
						"newEmailId": this.state.email
					};

					var url = "User/ResetEmail?userid=" + UserId;
					eventDetails = UpdatePrimaryEmailAddress.EventDetails.replace('<new email>', p.newEmailId).
					replace("<old email>", p.oldEmailId);
					setBehaviourValue = UpdatePrimaryEmailAddress;

					this.updateProfile(UserId, url, p, "Primary Email Address", eventDetails, setBehaviourValue);
					break;
				case "AltEmail":
					self.setState(state => ({ AltEmail: !state.AltEmail }));
					break;

				case "Mobile":
					self.setState(state => ({ Mobile: !state.Mobile }));

					p = {
						"primaryPhone": null,
						"secondaryPhone": null,
						"mobile": {
							"value": this.state.mobile
								? this.state.mobile.replace("(", '').replace(")", '').replace("-", '').replace(" ", '')
								: null
						},
						"fax": null
					}

					var url = "User/UpdatePhone?userid=" + UserId;
					eventDetails = UpdatePrimaryContactNumber.EventDetails.replace('<new number>', p.mobile.value).
					replace("<old number>", p.mobile);
					setBehaviourValue =  UpdatePrimaryContactNumber;
					this.updateProfile(UserId, url, p, "Mobile", eventDetails, setBehaviourValue);
					return;
					break;

				case "Fax":
					self.setState(state => ({ Fax: !state.Fax }));

					p = {
						"primaryPhone": null,
						"secondaryPhone": null,
						"mobile": null,
						"fax": {
							"value": this.state.fax
								? this.state.fax.replace("(", '').replace(")", '').replace("-", '').replace(" ", '')
								: null
						}
					}

					var url = "User/UpdatePhone?userid=" + UserId;
					this.updateProfile(UserId, url, p, "Fax", eventDetails, setBehaviourValue);
					return;
					break;
			}
		}
		catch {
			self.setState({ loading: false });
			self.massegeRef.current.showMessage("error", "You have not successfully updated your profile.")
		}
	}

	updateProfile(UserId, url, p, type, eventDetails, setBehaviourValue) {
		RequestHelper.PUT1(url,
			APIURLTypeEnum.Agency,
			p, (res) => {
				const { status, data, statusText } = res;
				var self = this;

				if (status) {
					if (res.status == StatusCodeEnum.OK) {
						if(setBehaviourValue){
						  SetUserBehaviour(setBehaviourValue.Name,
							setBehaviourValue.Name,
							setBehaviourValue.Name,
							setBehaviourValue.Event, eventDetails)
						}
						self.setState({ loading: false });
						self.GetUserInformation(UserId);
						self.massegeRef.current.showMessage("success", `You have successfully updated your ${type}.`);
					}
					else {
						self.setState({ loading: false });
						if(setBehaviourValue){
							SetUserBehaviour(setBehaviourValue.Name,
							  setBehaviourValue.Name,
							  setBehaviourValue.Name,
							  setBehaviourValue.Event, eventDetails)
						  }
						self.massegeRef.current.showMessage("error", `You have not successfully updated your ${type}.`)
					}
				} else {
					if (res.response && res.response.data) {
						self.setState({ loading: false });
						if(setBehaviourValue){
							SetUserBehaviour(setBehaviourValue.Name,
							  setBehaviourValue.Name,
							  setBehaviourValue.Name,
							  setBehaviourValue.Event, eventDetails)
						  }
						self.massegeRef.current.showMessage("error", `You have not successfully updated your ${type}.`)
					}
				}
			});
	}

	passwordInfo = (oldPassword, newPassword, confirmNewPassword) => {
		var self = this;
		self.setState({ password: oldPassword });
		self.setState({ newPassword: newPassword });
		self.setState({ confirmNewPassword: confirmNewPassword });
	}

	resetPassword = () => {
		var self = this;
		var UserId = localStorage.getItem("UserId");
		if ((this.state.password == '' && this.state.newPassword == '')||(this.state.newPassword == '' && this.state.confirmNewPassword == '') || (this.state.password == '' && this.state.confirmNewPassword == '')) {
			self.massegeRef.current.showMessage("error", "Please eneter all manadatory information.");
			return true; 
		}
		// if (!(!!this.state.password) || !(!!this.state.newPassword) || !(!!this.state.confirmNewPassword)) {
		// 	self.massegeRef.current.showMessage("error", "Please eneter all manadatory information.");
		// 	return true;
		// }

		if (this.state.newPassword !== this.state.confirmNewPassword) {
			self.massegeRef.current.showMessage("error", "Confirm password does not match.");
			return true;
		}

		if (!(this.state.newPassword.match(/[a-z]/g) && 
			this.state.newPassword.match(/[A-Z]/g) && 
			(this.state.newPassword.match( /[0-9]/g) || 
			this.state.newPassword.match( /[^a-zA-Z\d]/g)) && 
			this.state.newPassword.length >= 8)) {
				this.massegeRef.current.showMessage("error", "Please enter a valid password." );
				return true;
		}

		//const passwordRequest = {
		//	password: this.state.newPassword,
		//	currentPassword: this.state.password
		//}
		//const _context = self.context;
		//var url = UserAPI.resetPassword.format(
		//	_context.userId
		//);

		const p = {
			"oldPassword": this.state.password,
			"newPassword": this.state.newPassword
		};

		this.setState({ loading: true });

		var url = "User/ResetPassword?userid=" + UserId;
		//this.updateProfile(UserId, url, p,"Password");
		self.setState({ Password: false });

		RequestHelper.PUT1(url, APIURLTypeEnum.Agency, p, (res) => {
			debugger;
			const { status, data, statusText } = res;
			self.setState({ Password: false });
			this.setState({ loading: false });
			if (res.status === 200) {
				self.massegeRef.current.showMessage("success", "Password has been successfully changed.");
				SetUserBehaviour(ProfilePasswordChangeSuccessful.Name,
					ProfilePasswordChangeSuccessful.Name,
					ProfilePasswordChangeSuccessful.Name,
					ProfilePasswordChangeSuccessful.Event, 
					ProfilePasswordChangeSuccessful.EventDetails.replace('{username}', this.state.userName)
					.replace('{Date / Time}',moment(new Date()).format('MM/DD/YYYY hh:mm A')));
			} else {
				self.massegeRef.current.showMessage("error", res.response.data.status.message);
				SetUserBehaviour(ProfilePasswordChangeAttemptFailed.Name,
					ProfilePasswordChangeAttemptFailed.Name,
					ProfilePasswordChangeAttemptFailed.Name,
					ProfilePasswordChangeAttemptFailed.Event, 
					ProfilePasswordChangeAttemptFailed.EventDetails.replace('{username}', this.state.userName)
					.replace('{Date / Time}', moment(new Date()).format('MM/DD/YYYY hh:mm A')));
			}
		});
	}

	handleClickAltPhone() {
		this.setState(state => ({
			PrimaryPhone: false,
			AltPhone: !state.AltPhone,
			PrimaryEmail: false,
			Password: false
		}));
	}

	handleCancelAltPhone() {
		this.setState(state => ({ AltPhone: false }));
	}

	//handleonAltPhoneClick = () => {
	//	this.setState({
	//		success: true,
	//		AltPhone: !this.state.AltPhone
	//	});
	//};
	handleClickEmail() {
		this.setState(state => ({
			PrimaryPhone: false,
			AltPhone: false,
			PrimaryEmail: !state.PrimaryEmail,
			Password: false,
			Fax:false,
			Mobile:false
		}));

	}
	handleCancelEmail() {
		this.setState({email: this.state.tempEmail});
		this.setState(state => ({ PrimaryEmail: false }));
	}

	handleClickAltEmail() {
		this.setState(state => ({ AltEmail: !state.AltEmail }));
	}
	
	handleClickPFContact() {
		this.setState(state => ({ PreferredContactMethod: !state.PreferredContactMethod }));
	}

	handleClickPassword() {
		this.setState(state => ({
			PrimaryPhone: false,
			AltPhone: false,
			PrimaryEmail: false,
			Password: !state.Password,
			Fax:false,
			Mobile:false
		}));
	}

	handleCancelPassword() {
		this.setState({
			password: '',
			newPassword: '',
			confirmnewPassword: '',
		})
		this.setState(state => ({ Password: false }));
	}
	//handleClickPasswordSave = () => {
	//	this.setState(state => ({ success: true, Password: !this.state.Password }));
	//}
	//Email confirmation popup toggle
	handleClickOpen = () => {
		this.setState(state => ({ open: !state.open }));
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleEmailDialogClose = () => {
		this.setState({ open: false, PrimaryEmail: !this.state.PrimaryEmail });
	};

	handleonClick = () => {
		this.setState({ success: true });
	};

	handleonClose = (event, reason) => {
		this.setState({ success: false });
	};



	//componentDidMount() {
	//	
	//	this.setState({ loading: true });
	//	const url = "agency/GetUserProfile/";
	//	const params = "?userId=" + localStorage.getItem("UserId");

	//	RequestHelper.GET(
	//		url,
	//		APIURLTypeEnum.Agency,
	//		params,
	//		(res) => {
	//			if (res && res.status == StatusCodeEnum.OK) {
	//				if (res.data) {
	//					if (res.data.data) {
	//						this.setState({ loading: false });
	//						this.setState({ data: res.data.data });
	//					} else {
	//					}
	//				} else {
	//					this.setState({ loading: false });
	//				}
	//			} else {
	//				messageRef.current.showMessage(
	//					res.response.data.status.message,
	//					NotificationMessageTypeEnum.Error
	//				);
	//				this.setState({ loading: false });
	//			}
	//		}
	//	);
	//}

	render() {
		const { classes } = this.props;
		return (
			<Paper role="region" aria-label="profile" className='wrapper-box' elevation={0}>
				<div class="profileContainer removeshadow">
					<div class="profiledata-row  row no-gutters resProfileData">
						<div class="col-lg-4 col-sm-3 col-12 profileStatic"><Typography component="h3" variant="h3">NAME</Typography></div>
						<div class="col-lg-4 col-sm-4 col-12 profileDynamic">
							<span id="" class="">{this.state.userInfo.firstName ? this.state.userInfo.firstName.toUpperCase() : ''}  {this.state.userInfo.lastName ? this.state.userInfo.lastName.toUpperCase() : ''} </span></div>
						{/* <div class="col-lg-4 col-sm-5 col-12 profileEdit profileEditLink resProfileData">
							{this.state.NameEditing === false && (
								<Button color="secondary" className={classes.button + ' editBtn'} onClick={this.handleClick.bind(this)}>Edit</Button>
							)}
						</div>
						<Grid item xs={12} className="editProfileGroup">
							{this.state.NameEditing && (<NameModule />)}
							{this.state.NameEditing === true && (
								<div className={classes.buttonsection + ' editProfileBtnG'}>
									<React.Fragment>
										<Button color="secondary" className={classes.button} onClick={this.handleClick.bind(this)}>Cancel</Button>
										<Button variant="contained" color="secondary" onClick={this.handleonClick} className={classes.button}>save </Button>
									</React.Fragment>
								</div>
							)}
						</Grid> */}

					</div>
					<div class="profiledata-row row no-gutters resProfileData">
						<div class="col-lg-4 col-sm-3 col-12 profileStatic"><Typography component="h3" variant="h3">ROLE</Typography></div>
						<div class="col-lg-4 col-sm-4 col-12 profileDynamic"><span id="" class="">{this.state.userInfo.role ? this.state.userInfo.role.toUpperCase() : ''}</span></div>
						{/* <div class="col-lg-4 col-sm-5 col-12 profileEdit profileEditLink resProfileData">
							{this.state.RoleEditing === false && (
								<Button color="secondary" className={classes.button + ' editBtn'} onClick={this.handleClickRole.bind(this)}>Edit</Button>
							)}

						</div>
						<Grid item xs={12} className="editProfileGroup">
							{this.state.RoleEditing && (<PrimaryRoleModule />)}

							{this.state.RoleEditing === true && (
								<div className={classes.buttonsection}>
									<React.Fragment>
										<Button color="secondary" className={classes.button} onClick={this.handleClickRole.bind(this)}>Cancel</Button>
										<Button variant="contained" color="secondary" onClick={this.handleonClick} className={classes.button}>save </Button>
									</React.Fragment>
								</div>
							)}
						</Grid> */}


					</div>
					<div class="profiledata-row row no-gutters resProfileData">
						<div class="col-lg-4 col-sm-3 col-12 profileStatic"><Typography component="h3" variant="h3">AGENCY NAME</Typography></div>
						<div class="col-lg-4 col-sm-4 col-12 profileDynamic"><span id="" class="">{this.state.agencyName}</span></div>
					</div>
					<div class="profiledata-row row no-gutters resProfileData">
						<div class="col-lg-4 col-sm-3 col-12 profileStatic"><Typography component="h3" variant="h3">USER NAME</Typography></div>
						<div class="col-lg-4 col-sm-4 col-12 profileDynamic"><span id="" class="">{this.state.userInfo.userName}</span></div>
					</div>
					<div class="profiledata-row row no-gutters resProfileData">
						<div class="col-lg-4 col-sm-3 col-12 profileStatic"><Typography component="h3" variant="h3">PHONE (PRIMARY)</Typography></div>
						{this.state.PrimaryPhone === false && (
							<div class="col-lg-4 col-sm-4 col-12 profileDynamic"><span id="" class="">{MaskPhoneNumber(this.state.userInfo.primaryPhone)}</span></div>
						)}
						<div class="col-lg-4 col-sm-5 col-12 profileEdit profileEditLink resProfileData">
							{this.state.PrimaryPhone === false && (
								<IconButton color="secondary" className={classes.button} onClick={this.handleClickPhone.bind(this)} aria-label="click here to open edit phone number">
									<i className="material-icons editico">edit</i>
								</IconButton>
							)}
						</div>
						<Grid item xs={12} className="editProfileGroup">
							{this.state.PrimaryPhone &&
								(<PhoneModule SetUserInformation={this.SetUserInformation} PhoneType={this.state.userInfo.primaryPhoneType} id={"PrimaryPhone"} phoneNumber={(this.state.userInfo.primaryPhone)} />)}

							{this.state.PrimaryPhone === true && (
								<div className={classes.buttonsection}>
									<React.Fragment>
										<Button aria-label="click here to cancel" color="secondary" className={classes.button} onClick={this.handleCancelPhone.bind(this)}>CANCEL</Button>
										<Button aria-label="click here to save" variant="contained" color="secondary" onClick={this.handleonSavePrimaryPhone} className={classes.button}>SAVE </Button>
									</React.Fragment>
								</div>
							)}
						</Grid>
					</div>

					<div class="profiledata-row row no-gutters resProfileData">
						<div class="col-lg-4 col-sm-3 col-12 profileStatic"><Typography component="h3" variant="h3">MOBILE (OPTIONAL)</Typography></div>
						{this.state.Mobile === false && (
							<div class="col-lg-4 col-sm-4 col-12 profileDynamic"><span id="" class="">{MaskPhoneNumber(this.state.userInfo.primaryMobile)}</span></div>
						)}
						<div class="col-lg-4 col-sm-5 col-12 profileEdit profileEditLink resProfileData">
							{this.state.Mobile === false && (
								<IconButton color="secondary" className={classes.button} onClick={this.handleClickMobile.bind(this)} aria-label="click here to open edit phone number">
									<i className="material-icons editico">edit</i>
								</IconButton>
							)}
						</div>
						<Grid item xs={12} className="editProfileGroup">
							{this.state.Mobile &&
								(<MobileModule SetUserInformation={this.SetUserInformation} PhoneType={this.state.userInfo.primaryPhoneType} id={"Mobile"} phoneNumber={(this.state.userInfo.primaryMobile)} />)}

							{this.state.Mobile && (
								<div className={classes.buttonsection}>
									<React.Fragment>
										<Button aria-label="click here to cancel" color="secondary" className={classes.button} onClick={this.handleCancelMobile.bind(this)}>CANCEL</Button>
										<Button aria-label="click here to save" variant="contained" color="secondary" onClick={this.handleonSaveMobile} className={classes.button}>SAVE </Button>
									</React.Fragment>
								</div>
							)}
						</Grid>
					</div>

					<div class="profiledata-row row no-gutters resProfileData">
						<div class="col-lg-4 col-sm-3 col-12 profileStatic"><Typography component="h3" variant="h3">FAX (OPTIONAL)</Typography></div>
						{this.state.Fax === false && (
							<div class="col-lg-4 col-sm-4 col-12 profileDynamic"><span id="" class="">{MaskPhoneNumber(this.state.userInfo.primaryFax)}</span></div>
						)}
						<div class="col-lg-4 col-sm-5 col-12 profileEdit profileEditLink resProfileData">
							{this.state.Fax === false && (
								<IconButton color="secondary" className={classes.button} onClick={this.handleClickFax.bind(this)} aria-label="click here to open edit phone number">
									<i className="material-icons editico">edit</i>
								</IconButton>
							)}
						</div>
						<Grid item xs={12} className="editProfileGroup">
							{this.state.Fax &&
								(<FaxModule SetUserInformation={this.SetUserInformation} PhoneType={this.state.userInfo.primaryPhoneType} id={"Fax"} phoneNumber={(this.state.userInfo.primaryFax)} />)}

							{this.state.Fax && (
								<div className={classes.buttonsection}>
									<React.Fragment>
										<Button aria-label="click here to cancel" color="secondary" className={classes.button} onClick={this.handleCancelFax.bind(this)}>CANCEL</Button>
										<Button aria-label="click here to save" variant="contained" color="secondary" onClick={this.handleonSaveFax} className={classes.button}>SAVE </Button>
									</React.Fragment>
								</div>
							)}
						</Grid>
					</div>


					{/* <div class="profiledata-row row no-gutters resProfileData">
						<div class="col-lg-4 col-sm-3 col-12 profileStatic"><Typography component="h3" variant="h3">LANDLINE (OPTIONAL)</Typography></div>
						{this.state.AltPhone === false && (
							<div class="col-lg-4 col-sm-4 col-12 profileDynamic"><span id="" class="">{MaskPhoneNumber(this.state.userInfo.secondaryPhone)}</span></div>
						)}
						<div class="col-lg-4 col-sm-5 col-12 profileEdit profileEditLink resProfileData">
							{this.state.AltPhone === false && (
								<IconButton color="secondary" className={classes.button} onClick={this.handleClickAltPhone.bind(this)} aria-label="click here to open edit additional phone number">
									<i className="material-icons editico">edit</i>
								</IconButton>
							)}
						</div>
						<Grid item xs={12} className="editProfileGroup">
							{this.state.AltPhone && (<AltPhoneModule id={"AltPhone"} PhoneType={this.state.userInfo.secondaryPhoneType} phoneNumber={(this.state.userInfo.secondaryPhone)} SetUserInformation={this.SetUserInformation} />)}
							{this.state.AltPhone === true && (
								<div className={classes.buttonsection}>
									<React.Fragment>
										<Button aria-label="click here to cancel" color="secondary" className={classes.button} onClick={this.handleCancelAltPhone.bind(this)}>CANCEL</Button>
										<Button aria-label="click here to save" variant="contained" color="secondary" onClick={this.handleonSaveAltPhone} className={classes.button}>SAVE </Button>
									</React.Fragment>
								</div>
							)}
						</Grid>
					</div> */}

					<ValidatorForm className={classes.formtemp} ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
						<div class="profiledata-row row no-gutters resProfileData">

							<div class="col-lg-4 col-sm-3 col-12 profileStatic"><Typography component="h3" variant="h3">PRIMARY EMAIL ADDRESS</Typography></div>
							{this.state.PrimaryEmail === false && (
								<div class="col-lg-4 col-sm-4 col-12 profileDynamic"><span id="" class="">{this.state.userInfo.email}</span></div>
							)}
							<div class="col-lg-4 col-sm-5 col-12 profileEdit profileEditLink resProfileData">
								{this.state.PrimaryEmail === false && (
									<IconButton color="secondary" className={classes.button} onClick={this.handleClickEmail.bind(this)} aria-label="click here to open edit email address">
										<i className="material-icons editico">edit</i>
									</IconButton>
								)}
							</div>
							<Grid item xs={12} className="editProfileGroup">
								{this.state.PrimaryEmail && (<EmailModule id={"PrimaryEmail"} SetUserInformation={this.SetUserInformation} email={this.state.userInfo.email} />)}
								{this.state.PrimaryEmail === true && (
									<div className={classes.buttonsection}>
										<React.Fragment>
											<Button aria-label="click here to cancel" color="secondary" className={classes.button} onClick={this.handleCancelEmail.bind(this)}>CANCEL</Button>
											<Button aria-label="click here to save" disabled={this.state.isDisabled} variant="contained" color="secondary" onClick={this.handleonSavePrimaryEmail} type="submit" className={classes.button}>SAVE </Button>
										</React.Fragment>
									</div>
								)}
							</Grid>


							<Dialog maxWidth={this.state.maxWidth}
								open={this.state.open}
								onClose={this.handleClose}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
								<DialogTitle id="alert-dialog-title">{"Confirm your email"}</DialogTitle>
								<DialogContent>
									<DialogContentText id="alert-dialog-description">
										We have sent a confirmation link to your email. Please click the link in the email to confirmation
										the email change.
						</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button aria-label="click here to ok" onClick={this.handleEmailDialogClose} color="secondary" autoFocus>
										Okay
						</Button>
								</DialogActions>
							</Dialog>
						</div>
					</ValidatorForm>
					{/* <ValidatorForm className={classes.formtemp} ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
						<div class="profiledata-row row no-gutters resProfileData">
							<div class="col-lg-4 col-sm-3 col-12 profileStatic"><Typography component="h3" variant="h3">Alternate Email</Typography></div>
							<div class="col-lg-4 col-sm-4 col-12 profileDynamic"><span id="" class="">None on file</span></div>
							<div class="col-lg-4 col-sm-5 col-12 profileEdit profileEditLink resProfileData">
								{this.state.AltEmail === false && (
									<Button color="secondary" className={classes.button + ' editBtn'} onClick={this.handleClickAltEmail.bind(this)}>Edit</Button>
								)}
							</div>
							<Grid item xs={12} className="editProfileGroup">
								{this.state.AltEmail && (<AlternateEmail />)}
								{this.state.AltEmail === true && (
									<div className={classes.buttonsection}>
										<React.Fragment>
											<Button color="secondary" className={classes.button} onClick={this.handleClickAltEmail.bind(this)}>Cancel</Button>
											<Button variant="contained" color="secondary" onClick={this.handleonClick} type="submit" className={classes.button}>save </Button>
										</React.Fragment>
									</div>
								)}
							</Grid>

						</div>
					</ValidatorForm> 
					<ValidatorForm className={classes.formtemp} ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
						<div class="profiledata-row row no-gutters resProfileData">

							<div class="col-lg-4 col-sm-3 col-12 profileStatic"><Typography component="h3" variant="h3">Preferred Contact Method</Typography></div>
							<div class="col-lg-4 col-sm-4 col-12 profileDynamic"><span id="">Primary Email <span class="emailresponsive">(joe.doe@gmail.com)</span></span></div>
							<div class="col-lg-4 col-sm-5 col-12 profileEdit profileEditLink resProfileData">
								{this.state.PreferredContactMethod === false && (
									<Button color="secondary" className={classes.button + ' editBtn'} onClick={this.handleClickPFContact.bind(this)}>Edit</Button>
								)}
							</div>
							<Grid item xs={12} className="editProfileGroup">
								{this.state.PreferredContactMethod && (<PreferredContactMethod />)}
								{this.state.PreferredContactMethod === true && (
									<div className={classes.buttonsection}>
										<React.Fragment>
											<Button color="secondary" className={classes.button} onClick={this.handleClickPFContact.bind(this)}>Cancel</Button>
											<Button variant="contained" color="secondary" onClick={this.handleClickOpen} type="submit" className={classes.button}>save </Button>
										</React.Fragment>
									</div>
								)}
							</Grid>


							<Dialog maxWidth={this.state.maxWidth}
								open={this.state.open}
								onClose={this.handleClose}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
								<DialogTitle id="alert-dialog-title">{"Confirm your email"}</DialogTitle>
								<DialogContent>
									<DialogContentText id="alert-dialog-description">
										We have sent a confirmation link to your email. Please click the link in the email to confirmation
										the email change.
						</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button onClick={this.handleClose} color="secondary" autoFocus>
										Okay
						</Button>
								</DialogActions>
							</Dialog>
						</div>
					</ValidatorForm>*/}

					<div class="profiledata-row BorderNone row no-gutters resProfileData">
						<div class="col-lg-4 col-sm-3 col-12 profileStatic"><Typography component="h3" variant="h3">PASSWORD</Typography></div>
						{this.state.Password === false && (
							<div class="col-lg-4 col-sm-4 col-12 profileDynamic"><span id="" class="">********</span></div>
						)}
						<div class="col-lg-4 col-sm-5 col-12 profileEdit profileEditLink resProfileData">
							{this.state.Password === false && (
								<IconButton color="secondary" className={classes.button} onClick={this.handleClickPassword.bind(this)} aria-label="click here to open edit password">
									<i className="material-icons editico">edit</i>
								</IconButton>
							)}
						</div>
						<Grid item xs={12} className="editProfileGroup">
							{this.state.Password && (<PasswordChange passwordInfo={this.passwordInfo} resetPassword={this.resetPassword} handleCancelPassword={this.handleCancelPassword.bind(this)} />)}
							{this.state.Password === true && (
								<div className={classes.buttonsection}>
									<React.Fragment>
										{/* <Button aria-label="click here to cancel" color="secondary" className={classes.button} onClick={this.handleCancelPassword.bind(this)}>Cancel</Button>
										<Button aria-label="click here to save" variant="contained" color="secondary" onClick={this.resetPassword} className={classes.button}>save </Button> */}
									</React.Fragment>
								</div>
							)}
						</Grid>


					</div>
				</div>
				<Snackbar className="snackbarmain"
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					open={this.state.success}
					autoHideDuration={60000}
					onClose={this.handleonClose}
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					message={<span id="message-id">You have successfully updated your profile.</span>}
					action={[
						<Button aria-label="click here to close" key="undo" className="close" color="secondary" size="small" onClick={this.handleonClose}>
							CLOSE
						</Button>,
					]}
				/>
				{this.state.loading && (
					<Loader />
				)}
				<MessageBox ref={this.massegeRef} />
			</Paper>
		);
	}
}

export default withStyles(styles)(ProfilePageMain);


