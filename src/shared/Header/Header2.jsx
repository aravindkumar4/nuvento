import React from 'react';
import { Link} from 'react-router-dom';
import {MDBContainer, MDBRow, MDBCol} from 'mdbreact';
import logo from '../../assets/images/logo.svg';

class Header2 extends React.Component {
    static contextTypes = {
        router: () => true, 
      }  
  render() {

    return (
	<header className="ShortHeader" role="region" aria-label="header">
    <MDBContainer>
        <MDBRow>
            <MDBCol lg="6" sm="6" xs="6">
                <Link aria-label="South west gas logo" id="logo-container" to="/Dashboard" className="brand-logo"><img src={logo} alt="South west gas logo" /></Link>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
	</header>
    );
  }
}

export default Header2;