import React from 'react';
//import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
//import logo from './../../assets/images/footer/swg_footlogo.png';
//import './../../assets/css/header2.css'
//import AppLoader from "../../components/common/appLoader";
import logo from '../../assets/images/footer/swg_footlogo.png';
import { Link} from 'react-router-dom';

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
                            <Link aria-label="South west gas logo" id="logo-container" to="/" className="brand-logo mt-0"><img src={logo} alt="South west gas logo" /></Link>
                        </MDBCol>
                        <MDBCol lg="6" sm="6" xs="6">
                        <p class="header-msg text-md-right">Suspect a leak? Call 911 and 877-860-6020</p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </header>
        );
    }
}

export default Header2;