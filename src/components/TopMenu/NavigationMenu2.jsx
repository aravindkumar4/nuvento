import React from 'react'
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBCol } from 'mdbreact';

export default function NavigationMenu() {
  const [isOpen, setisOpen] = React.useState(false);
  let ctrl=document.getElementById("dtAccount");
  if(ctrl){
    ctrl.classList.remove("active");
  }
  React.useEffect(() => {
    const nav = document.querySelector('nav.navbar-dark');
    function handleScroll() {
      if (window.scrollY > 70) {
        nav.classList.add('fixed-nav');
      } else {
        nav.classList.remove('fixed-nav');
      }
    }
    window.addEventListener('scroll', handleScroll);
  });

  const toggle = () => {
    setisOpen(true);
  }

  return (
    <Navbar color='faded' dark expand role='navigation' className="d-none d-lg-block" expand="md">
      <MDBContainer>
        <NavbarToggler type='button' onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink aria-label="navigate to Home page" activeClassName='active' tag={RRNavLink} exact to='/Dashboard'>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink aria-label="navigate to Pledge page" activeClassName='active' tag={RRNavLink} to='/Pledges' >Pledges</NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink activeClassName='active' tag={RRNavLink} to='/PaymentHistory' >Payment History</NavLink>
            </NavItem> */}
            <UncontrolledDropdown nav>
              <DropdownToggle nav id="dtAccount">Account
              <i class="material-icons">keyboard_arrow_down</i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-default MegaMenu animate slideIn">
                <MDBContainer>
                  <MDBCol lg="3" sm="6" xs="12" className="float-left">
                    <MDBListGroup>
                      <MDBListGroupItem><DropdownItem activeClassName='active' aria-label="navigate to profile page" tag={RRNavLink} to='/myprofile'>
                        My Profile</DropdownItem>
                      </MDBListGroupItem>
                    </MDBListGroup>
                  </MDBCol>
                  {(localStorage.getItem("RoleType") !== "Viewer" && localStorage.getItem("RoleType") !== "Manager") && <MDBCol lg="3" sm="6" xs="12" className="float-left">
                    <MDBListGroup>
                      <MDBListGroupItem><DropdownItem activeClassName='active' aria-label="navigate to manage users page" tag={RRNavLink} to="/manageusers">Manage Users</DropdownItem></MDBListGroupItem>
                    </MDBListGroup>
                  </MDBCol>}
                  {/* {localStorage.getItem("RoleType") !== "Viewer" &&
                    <MDBCol lg="3" sm="6" xs="12" className="float-left">
                      <MDBListGroup>
                        <MDBListGroupItem><DropdownItem activeClassName='active' tag={RRNavLink} aria-label="navigate to Request for Start Service Quote  page" to="/RequestforStartServiceQuote">Request for Start Service Quote  </DropdownItem></MDBListGroupItem>
                      </MDBListGroup>
                    </MDBCol>
                  } */}
                </MDBContainer>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink aria-label="navigate to faq page" activeClassName='active' tag={RRNavLink} to='/faq' >FAQs</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </MDBContainer>
    </Navbar>
  );
}
