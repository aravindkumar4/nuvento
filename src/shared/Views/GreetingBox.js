import React from 'react';
import { MDBCol } from 'mdbreact';
import '../../common/DateTime';

const GreetingBox = ({ name }) => {
    let message = new Date().GreetingMessage();

    return <MDBCol xs="12">
        <div className="username-box"><p>{message}, <span>{name ? name.toUpperCase() :''}</span></p></div>
    </MDBCol>
}


export default GreetingBox;