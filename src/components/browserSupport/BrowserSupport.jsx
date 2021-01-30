import React from "react";
import {Typography} from '@material-ui/core';
import { MDBRow, MDBCol,MDBContainer } from "mdbreact";
import logo from './../../assets/images/footer/swg_footlogo.png';
import Chrome from './../../assets/images/browser/chrome.png';
import Edge from './../../assets/images/browser/edge.png';
import Mozila from './../../assets/images/browser/mozila.png';
import Safari from './../../assets/images/browser/safari.jpg';
import './browser-support.scss';
function BrowserSupport(props){
    return(
        <MDBContainer>
            <MDBRow>
                <MDBCol size="12" className="browsers-support text-left">  
                    <img src={logo} alt="logo" width="200" />
                    <Typography variant="h2">Your browser is no longer supported.</Typography>                           
                    <Typography variant="body1">Please upgrade your browser to one of the following supported browsers.</Typography>  
                    <MDBRow>
                        <MDBCol sm="3" size="12">
                            <img src={Chrome} alt="browser" width="75" className="ml-auto mr-auto d-block" />
                            <Typography variant="h4">Download Google Chrome</Typography>  
                        </MDBCol>
                        <MDBCol sm="3" size="12">
                            <img src={Edge} alt="browser" width="75" className="ml-auto mr-auto d-block"/>
                            <Typography variant="h4">Download Edge</Typography>  
                        </MDBCol>
                        <MDBCol sm="3" size="12">
                            <img src={Mozila} alt="browser" width="75" className="ml-auto mr-auto d-block"/>
                            <Typography variant="h4">Download Firefox</Typography>  
                        </MDBCol>
                        <MDBCol sm="3" size="12">
                            <img src={Safari} alt="browser" width="75" className="ml-auto mr-auto d-block"/>
                            <Typography variant="h4">Download Safari</Typography>  
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}
export default BrowserSupport;