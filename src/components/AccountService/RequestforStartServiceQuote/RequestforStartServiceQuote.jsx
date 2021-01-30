import React from 'react';
import Paper from '@material-ui/core/Paper';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import HeaderSwitch from '../../../HeaderSwitch';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import RequestServiceField from './requestServiceField';

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
    );
}
export default function RequestforStartServiceQuote() {
    return (
        <section class="page-wrapper requestForStart">
            <HeadingSectionArea />
            <MDBContainer>
                <MDBRow>
                    <MDBCol lg="12" sm="12" xs="12" className="smallcontainer ">
                        <div className="wrapper-box paybilltopspace">
                            <MDBCol lg="7" md="12" xs="12" className="float-left">
                                <Paper elevation={1} className="ShortPaper">
                                    <div class="billingpayarea makePledgeStepper">
                                        <Typography component="h2" color="primary" className="titlehead">
                                            Request a service Establishment Quote Letter
                                        </Typography>
                                        
                                        <div className="grouppay">
                                            <RequestServiceField />
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
