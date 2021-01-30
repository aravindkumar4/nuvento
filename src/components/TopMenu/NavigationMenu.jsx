import React from 'react';
import { BrowserRouter as Router ,  Link} from "react-router-dom";
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBListGroup, MDBListGroupItem, MDBContainer,MDBCol } from 'mdbreact';
import { NavLink as RRNavLink} from 'react-router-dom'
class NavigationMenu extends React.Component {
	state = {
  isOpen: false
};
toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

  render() {

    return (
    <MDBNavbar color="theme-color" dark expand="md" >
	<MDBContainer>
      <MDBNavbarToggler onClick={this.toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar variant="pills">
        <MDBNavbarNav className="navbar-nav justify-content-around w-100">
    <MDBNavItem active>
            <MDBNavLink aria-label="navigate to home" to="/Dashboard">Home</MDBNavLink>
          </MDBNavItem>
    <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <div className="d-none d-md-inline">Billing</div>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default MegaMenu">
			  <MDBContainer>
			  <MDBCol size="3" className="float-left">
			  <MDBListGroup>
                <MDBListGroupItem><MDBNavLink aria-label="click here to current bill" to="currentbill">Current Bills</MDBNavLink></MDBListGroupItem>
                <MDBListGroupItem><MDBNavLink aria-label="click here to make a payment" to="#!">Make a Payment</MDBNavLink></MDBListGroupItem>
                <MDBListGroupItem><MDBNavLink aria-label="click here to auto payment" to="autopay">Auto Payment</MDBNavLink></MDBListGroupItem>
				 </MDBListGroup>
				</MDBCol>
			  <MDBCol size="3" className="float-left">
			  <MDBListGroup>
        {/* <MDBListGroupItem><Link to="billinghistory">Billing & Payment History</Link></MDBListGroupItem> */}
				<MDBListGroupItem><Link aria-label="click here to paperless billing" to="paperlessbilling">Paperless Billing</Link></MDBListGroupItem>
				<MDBListGroupItem><Link aria-label="click here to payment method" to="PaymentMethod">Payment Methods</Link></MDBListGroupItem>
				 </MDBListGroup>
				</MDBCol>				
				</MDBContainer>				 
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
		  
	<MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <div className="d-none d-md-inline">Usage</div>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default MegaMenu">
			  <MDBContainer>
			  <MDBCol size="3" className="float-left">
			  <MDBListGroup>
                <MDBListGroupItem><Link aria-label="click here to electric usage" to="#!">Electric Usage</Link></MDBListGroupItem>
                <MDBListGroupItem><Link aria-label="click here to gas usage" to="#!">Gas Usage</Link></MDBListGroupItem>
                <MDBListGroupItem><Link aria-label="click here to compare" to="Compare">Compare</Link></MDBListGroupItem>
				 </MDBListGroup>
				</MDBCol>
			  <MDBCol size="3" className="float-left">
			  <MDBListGroup>
                <MDBListGroupItem><Link aria-label="click here to rate analysis" to="RateAnalysis">Rate Analysis</Link></MDBListGroupItem>
				 </MDBListGroup>
				</MDBCol>				
				</MDBContainer>				 
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>

	<MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <div className="d-none d-md-inline">Account Settings</div>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default MegaMenu">
			  <MDBContainer>
			  <MDBCol size="3" className="float-left">
			  <MDBListGroup>
                <MDBListGroupItem><Link aria-label="click here to view profile" to="myprofile">My Profile</Link></MDBListGroupItem>
                <MDBListGroupItem><Link aria-label="click here to view preference" to="#!">Preferences</Link></MDBListGroupItem>
                <MDBListGroupItem><Link aria-label="click here to view service account" to="#!">Service Accounts</Link></MDBListGroupItem>
				 </MDBListGroup>
				</MDBCol>
			  <MDBCol size="3" className="float-left">
			  <MDBListGroup>
          <MDBListGroupItem><Link aria-label="click here to view Portfolio" to="Portfolio">Portfolios</Link></MDBListGroupItem>
          <MDBListGroupItem><Link aria-label="click here to manage  users" to="manageusers">Manage Users</Link></MDBListGroupItem>
				 </MDBListGroup>
				</MDBCol>				
				</MDBContainer>				 
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
	
          <MDBNavItem>
           <MDBNavLink aria-label="click here to view outage" to="#!">Outages</MDBNavLink>
          </MDBNavItem>	
	<MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <div className="d-none d-md-inline">Services</div>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default MegaMenu">
			  <MDBContainer>
			  <MDBCol size="3" className="float-left">
			  <MDBListGroup>
                <MDBListGroupItem><Link aria-label="click here to start service" to="services">Start Services</Link></MDBListGroupItem>
                <MDBListGroupItem><Link aria-label="click here to stop service" to="#!">Stop Services</Link></MDBListGroupItem>
				 </MDBListGroup>
				</MDBCol>
			  <MDBCol size="3" className="float-left">
			  <MDBListGroup>
            <MDBListGroupItem><Link aria-label="click here to Manage Revert to Owner" to="RecertifyRTO">Manage Revert to Owner (RTO)</Link></MDBListGroupItem>
				    <MDBListGroupItem><Link aria-label="click here to Request tree" to="RequestTreeTrimming">Request Tree Trimming</Link></MDBListGroupItem>
				 </MDBListGroup>
				</MDBCol>				
				</MDBContainer>				 
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
	          <MDBNavItem>
            <MDBNavLink aria-label="click here to crud" to="crud" activeClassName='active' tag={RRNavLink} >Efficiency</MDBNavLink>
          </MDBNavItem>			  
        </MDBNavbarNav>
      </MDBCollapse>
	  </MDBContainer>
    </MDBNavbar>

);
  }
}
export default NavigationMenu;	