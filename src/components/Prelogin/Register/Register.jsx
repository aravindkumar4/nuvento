import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import HorizontalLabelPositionBelowStepper from './stepper';

export default function Register() {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol lg="12" sm="12" xs="12" className="smallcontainer">
          <div className={'wrapper-box paybilltopspace'}>
            <MDBCol lg="7" xs="12" className="ml-auto mr-auto">
              <Paper elevation={1} className="ShortPaper">
                <div class="billingpayarea regisFooterBtn" role="region" aria-label="Registration">
                  <Typography color="primary" component="h2" className="titlehead"> Agency Account Registration  </Typography>
                  <HorizontalLabelPositionBelowStepper />
                </div>
              </Paper>
            </MDBCol>
            {/* <MDBCol lg="5" xs="12" className="float-left rightArea d-none d-sm-block">
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