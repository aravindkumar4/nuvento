import React from 'react';
import Paper from '@material-ui/core/Paper';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import HorizontalLabelPositionBelowStepper from './stepper';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

export default function EnrollAutoPay() {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol lg="12" sm="12" xs="12" className="smallcontainer makePledge">
          <div className="wrapper-box paybilltopspace">
            <MDBCol lg="7"  xs="12" className="ml-auto mr-auto">
              <Paper elevation={1} className="ShortPaper" role="region" aria-label="pledge">
                <div class="billingpayarea makePledgeStepper">
                  <Typography component="h2" color="primary" className="titlehead">Make a Pledge</Typography>
                        <HorizontalLabelPositionBelowStepper />
                </div>
              </Paper>
            </MDBCol>
            {/* <MDBCol lg="5" sm="4" xs="12" className="float-left bluearea d-none d-sm-block">
              <div class="enrollboxarea">
                <b>Pay with Credit or Debit Card?</b>
                <p>Use your 13-digit account number from your Account Summary to pay by card.</p>
                <Link to="../Pledges" className="enrolllink">Pay with Credit or Debit Card</Link>
              </div>
            </MDBCol> */}
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
