import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import HorizontalLabelPositionBelowStepper from './stepper';

export default function Login() {
  return (
    <MDBContainer className="loginSec">
      <MDBRow>
        <MDBCol lg="12" sm="12" xs="12" className="smallcontainer">
          <div className={'wrapper-box paybilltopspace'}>
            <MDBCol lg="7" sm="12" xs="12" className="ml-auto mr-auto">
              <Paper elevation={1} className="ShortPaper">
                <div class="billingpayarea">
                  <Typography color="primary" component="h2" style={{textTransform: 'inherit'}} className="titlehead"> Reset Username and Password for Agency Account Login  </Typography>
                  <HorizontalLabelPositionBelowStepper />
                </div>
              </Paper>
            </MDBCol>
            {/* <MDBCol lg="5" sm="4" className="float-left rightArea d-none d-sm-block">
              <div class="enrollboxarea">
                <b>Helper Text</b>
                <p>Automatic bill payment is an easy way to pay your bills. One time set up and your payments will always be made on time, as long as the funds are</p>
              </div>
            </MDBCol> */}
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}