import React from 'react';
import Paper from '@material-ui/core/Paper';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import HeaderSwitch from '../../../HeaderSwitch';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import { MDBNavLink } from 'mdbreact';

const useStyles = makeStyles((theme) => ({
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
  Fcontainer: {
    marginTop: 25,
  },
}));

function HeadingSectionArea() {
  return (
    <>
    
    <HeaderSwitch title={HeaderSwitch} />
    <Grid component="div" className="pageheading-wrapper">
      <MDBContainer>
        <MDBRow>
          <MDBCol lg="6" sm="6" xs="12">
            <Grid component="div" className="pageheading-box">
              <Typography component="h1"> Request for Start Service Quote </Typography>
            </Grid>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Grid>
    </>
  );
}
export default function RequestforThankYouSucess() {
  return (
    <section class="page-wrapper myProfileSec">
      <HeadingSectionArea />
      <MDBContainer className="thankyouSec request-quote-success">
        <MDBRow>
          <MDBCol lg="12" sm="12" xs="12" className="smallcontainer requestForStart">
            <div className="wrapper-box paybilltopspace">
              <MDBCol lg="12" sm="12" xs="12">
                <Paper elevation={0} className="ShortPaper">
                  <div className="billingpayarea">
                    <h2 className="successHead"><i className="material-icons iconsuccess">done</i>
                      <Typography color="primary" className="successtext">Success!</Typography></h2>
                    <div className="thxSucess text-center">
                      <p>
                        Thank you! We have received your service establishment quote request.
                  </p>
                    </div>
                    <div className="doneButtonSec FormButtonsArea">
                      <MDBNavLink aria-label="click here to submit" to="/" className="viewBillsButton ButtonPrimary customBtn">Done</MDBNavLink>
                    </div>
                  </div>
                </Paper>
              </MDBCol>
              {/* <MDBCol lg="5" sm="4" xs="12" className="float-left bluearea d-none d-sm-block">
                <div class="enrollboxarea">
                  <b>Pay with Credit or Debit Card?</b>
                  <p>Use your 13-digit account number from your Account Summary to pay by card.</p>
                </div>
              </MDBCol> */}
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
