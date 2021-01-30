import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { NavLink as RRNavLink, withRouter } from 'react-router-dom';
import './header.css';
import logo from '../../assets/images/logo.png';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBNavLink, MDBBadge } from 'mdbreact';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import Icon from '@material-ui/core/Icon';

import { DropdownItem } from 'reactstrap';
import UserContextModel from './../../store/UserContextModel'

import RequestHelper from "../../common/RequestHelper";
import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from "../../core/Enum";
import { SetUserBehaviour } from '../../core/services/setUserBehaviour';
import { Logout, PledgeEdited } from '../../common/setBehaviourValue';

import moment from "moment";
const styles = theme => ({
	Notify: {
		paddingTop: 2,
	},
	UserLogo: {
		color: '#27A088'
	},
	badgecolor: { backgroundColor: '#E06038', right: '2px' }
});

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totalUnreadCount: 0
		}
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		const interval = setInterval(() => {
			var userId = localStorage.getItem("UserId");

			if (userId) {
				this.mailBind(userId);
				clearInterval(interval);
			}
		}, 500);
	}

	mailBind(userId) {
		const self = this;
		const URL = "Notification/GetMessagesByUserId?userId=121";//userId

		self.setState({ loading: true });

		var params = {
			searchString: "",
			status: [0],
			categories: [],
			index: 0,
			pageLength: 0,
			mode: 0,
		};
		try {
			RequestHelper.PUT1(URL,
				APIURLTypeEnum.Notification,
				params,
				(d) => {
					var res = d.data;
					if (res) {
						if (res.status && res.status.code == StatusCodeEnum.OK && res.data) {
							let val;
							//
							if (res.data.totalUnreadCount > 99) {
								val = '99+';
							} else {
								val = res.data.totalUnreadCount;
							}


							self.setState({ loading: false, totalUnreadCount: val });
						} else {
							self.setState({ loading: false });
						}
					} else {
						self.setState({ loading: false });
					}
				});
		} catch (error) {
			console.log(error, "error");
			self.setState({ loading: false });
		}
	}

	handleCheck(ev) {
		setTimeout(() => {
			const pin = document.querySelector("#dtAccount");
			pin.classList.add('selected');

			var tfs = window.location.pathname.split("/").slice(-1);
			if (tfs == 'myprofile') {
				$('#dtAccount').addClass('selected');
			}
			else {
				$('#dtAccount').removeClass('selected');
			}
		}, 500);
	}

	logout() {
		let user = JSON.parse(localStorage.getItem('UData'));
		SetUserBehaviour(Logout.Name,
			Logout.Name,
			Logout.Name,
			Logout.Event,
			Logout.EventDetails.
			  replace("{Email}", user.emailAddress).
			  replace("{Date / Time}", moment(new Date()).format('MM/DD/YYYY hh:mm A'))
		  );
		localStorage.removeItem('UData');
		localStorage.removeItem('UserId');
		localStorage.removeItem('AgencyNumber');
		localStorage.removeItem('RoleType');
		localStorage.removeItem('UserName');
		this.props.history.push('/');
	}

	getHeaderName = () => {
		if (localStorage.getItem("UData")) {
			const name = `${JSON.parse(localStorage.getItem("UData")).firstName ? JSON.parse(localStorage.getItem("UData")).firstName.toUpperCase() : ''}  ${JSON.parse(localStorage.getItem("UData")).lastName ? JSON.parse(localStorage.getItem("UData")).lastName.toUpperCase() : ''}`;
			return name;
		}
		else {
			return '';
		}
	}
	render() {
		const { classes } = this.props;
		return (
			<header className="HeaderMain d-none d-lg-block" role="region" aria-label="header">
				<div className="container">
					<UserContextModel.Consumer>
						{
							(user) => {
								return <div className="row">
									<div className="col-md-4 col-sm-4 col-xs-12">
										<Link aria-label="South west gas logo" id="logo-container" to="/Dashboard" className="brand-logo"><img src={logo} alt="South west gas logo" /></Link>
										<span className="logolabel">Agency</span>
									</div>
									<div className="col-md-8 col-sm-8 col-xs-12">
										{/*<span className="brand-logo">Suspect a leak?call 911 and 877-860-6020</span>*/}
										<ul className="tipTop">
											<li className="header-msg mr-4">Suspect a leak? Call 911 and 877-860-6020</li>
											<li>
												<Icon color="secondary" className={classes.UserLogo}>account_circle</Icon>
												<MDBDropdown>
													<MDBDropdownToggle ara-label="customer details dropdown" nav>
														<span className="UserNameMain">{ this.getHeaderName()}</span><i className="material-icons">expand_more</i>
													</MDBDropdownToggle>
													<MDBDropdownMenu className="dropdown-default dropdown-theme" right>
														{/*<DropdownItem activeClassName='active' toggle={this.handleCheck} aria-label="navigate to profile page"  tag={RRNavLink} to='/Myprofile'>
															My Profile
														</DropdownItem>*/}
														<Link aria-label="click here to navigate profile page" activeClassName='active' className="dropdown-item waves-effect waves-light" to="/Myprofile">My Profile</Link>
														{/*<DropdownItem aria-aria-label="Navigate to profile page" onClick={this.handleCheck} className="dropdown-item waves-effect waves-light" to="/myprofile"
															activeClassName='active' tag={RRNavLink}>My Profile</DropdownItem>*/}
														{/* <a className="dropdown-item waves-effect waves-light" href="http://q.smartusys.net/SCM_10/">Sign Out</a> */}
														{/*<Link aria-label="click here to signout" className="dropdown-item waves-effect waves-light" to="/">Sign Out</Link>*/}

														{/*<DropdownItem onClick={this.handleCheck} className="dropdown-item waves-effect waves-light" to="/myprofile"
															activeClassName='active' tag={RRNavLink}>My Profile</DropdownItem>*/}
														<a aria-label="click here and go to login page" className="dropdown-item waves-effect waves-light"
															onClick={this.logout}
															href="javascript:void(0)">Sign Out</a>
													</MDBDropdownMenu>
												</MDBDropdown>
											</li>
											{/*<li>
												<div className="notificationLink">
													<MDBNavLink aria-label="click here to view notification" to="Notifications">
														<Badge classes={{ badge: classes.badgecolor }} badgeContent={this.state.totalUnreadCount} color="secondary">
															<i className="material-icons colorb">notifications</i>
														</Badge>
													</MDBNavLink>
												</div>
											</li>
											<li>
												<MDBDropdown className="SwitchIcon">
													<MDBDropdownToggle nav>
														<i className="material-icons colorb"> apps</i>
													</MDBDropdownToggle>
													<MDBDropdownMenu className="dropdown-menuSwitch dropdown-theme" right>
														<a href="http://q.smartusys.net/SCM_10/" className="dropdown-item">
															<i className="material-icons">home_work</i><span>Residential</span>
														</a>
														<a href="http://q.smartusys.net/SCM_10_Enterprise/" className="dropdown-item">
															<i className="material-icons">business</i><span>Enterprise</span>
														</a>
														<a href="http://q.smartusys.net/SCM_10_Landlord/" className="dropdown-item">
															<i className="material-icons">home</i><span>Landlord</span>
														</a>
														<a href="http://q.smartusys.net/SCM_10_Agency/" className="dropdown-item selectedItem">
															<i className="material-icons">contact_phone</i><span>Agency</span>
														</a>
														<a href="http://q.smartusys.net/SCM_10_Builder/" className="dropdown-item">
															<i className="material-icons">store_mall_directory</i><span>Builder</span>
														</a>
													</MDBDropdownMenu>
												</MDBDropdown>
											</li> */}
										</ul>
									</div>
								</div>
							}
						}
					</UserContextModel.Consumer>
				</div>
			</header>
		);
	}
}

export default withStyles(styles)(withRouter(Header));