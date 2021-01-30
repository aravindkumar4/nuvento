import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './faq.scss';

const useStyles = makeStyles(theme => ({
    root: {
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    expansionpanelheading: {
        margin: '15px 0'
    },
    heading: {
        fontSize: 16, color: '#222221',fontFamily:'proxima-nova'
    },
    headerline: {
        borderBottom: '1px solid #E5E5E7',
        boxShadow:'none',
        margin: '0 !important',
    }
}));



export default function Faq() {
    const classes = useStyles(); 
    return (
        <section class="page-wrapper">
            <MDBContainer>
                <MDBRow className="faq-page text-left" role="region" aria-label="faq left sidebar">
                    <MDBCol size="12">
                        <Typography color="primary" conponent="h1" className="HelpHeading">Frequently Asked Questions (FAQs)</Typography>
                    </MDBCol>
                    <MDBCol lg="8" xs="12">
                        <Paper className="HelpDetailsDropdowns">
                            <ExpansionPanel className={classes.headerline}>
                                <ExpansionPanelSummary classes={{ content: classes.expansionpanelheading }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel1-content'
                                    aria-describedby="panel1Details"
                                    id="panel2-header" >
                                    <Typography className={classes.heading}>What are the benefits of using the Agency Pledge Portal?</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="panel1Details" classes={{ root: 'expansiondetailsbox' }}>
                                    <Typography className="DetailsBoxContent">
                                    Using the Portal will allow charitable agencies both save time, and more quickly help customers. The portal provides convenient access to customer Gas account information to help determine assistance eligibility and the ability to make pledges.<br/> <br/>
                                    Self-service features include:
                                    <ul>
                                        <li>24/7 access to customer information</li>
                                        <li>At a glance account status</li>
                                        <li>12-month Gas usage totals</li>
                                        <li>Service start and end dates</li>
                                        <li>Billing and payment history</li>
                                        <li>Disconnect date, if scheduled</li>
                                        <li>Ability to make a pledge on a customer's account</li>
                                        <li>Pledge funding source identification</li>
                                        <li>Ability to specify use of pledge funds</li>
                                        <li>Ability to view all pledges on customer account</li>
                                        <li>Ability to request a Service Establishment Quote Letter</li>
                                        <li>Ability to see payment arrangements </li>
                                        <li>Ability to see enrolled programs CARE (CA), LIRA (AZ)</li>
                                    </ul>
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className={classes.headerline}>
                                <ExpansionPanelSummary classes={{ content: classes.expansionpanelheading }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel2-content'
                                    aria-describedby="panel2Details"
                                    id="panel2-header" >
                                    <Typography className={classes.heading}>Who is eligible to use the Agency Pledge Portal?</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="panel2Details" classes={{ root: 'expansiondetailsbox' }}>
                                    <Typography className="DetailsBoxContent">
                                    The Agency Pledge Portal is available to representatives of utility assistance agencies that have registered with Southwest Gas. 
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className={classes.headerline}>
                                <ExpansionPanelSummary classes={{ content: classes.expansionpanelheading }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel3-content'
                                    aria-describedby="panel3Details"
                                    id="panel3-header" >
                                    <Typography className={classes.heading}>How do I register to use the Agency Pledge Portal?</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="panel3Details" classes={{ root: 'expansiondetailsbox' }}>
                                    <Typography className="DetailsBoxContent">
                                    Registration is easy. From the Login Screen, complete the online registration form. Next, review, complete, and return the following required agreement <a href="https://www.swGas.com/Agency-Assistance-Agreement.pdf" aria-label="click here to view Agency Assistance Agreement pdf file">Agency Assistance Agreement pdf</a>. 
                                    <br></br>
                                    <br></br>
                                    For detailed instructions on how to register for the Agency Pledge Portal refer to the <a href="https://www.swGas.com/1409190822392/Agency-Pledge-Portal-Registration-Guide.pdf" aria-label="click here to view Agency Pledge Portal Registration Guide pdf file">Agency Pledge Portal Registration Guide pdf</a>. 
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className={classes.headerline}>
                                <ExpansionPanelSummary classes={{ content: classes.expansionpanelheading }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel4-content'
                                    aria-describedby="panel4Details"
                                    id="panel4-header" >
                                    <Typography className={classes.heading}>Is customer authorization required to look up information?</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="panel4Details" classes={{ root: 'expansiondetailsbox' }}>
                                    <Typography className="DetailsBoxContent">
                                    Yes, prior to conducting a search for Southwest Gas customer information, please ensure the customer has provided your agency written and signed authorization to view their account. <br/> <br></br>
                                    If your agency does not have a customer release form, use the following form:  <a href="https://www.swGas.com/1409190825153/Customer-Authorization.pdf" aria-label="click here to view Customer Authorization Release pdf file">Customer Authorization Release pdf </a>
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            {/* <ExpansionPanel className={classes.headerline}>
                                <ExpansionPanelSummary classes={{ content: classes.expansionpanelheading }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel5-content'
                                    aria-describedby="panel5Details"
                                    id="panel5-header" >
                                    <Typography className={classes.heading}>Who can I contact for help?</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="panel5Details" classes={{ root: 'expansiondetailsbox' }}>
                                    <Typography className="DetailsBoxContent">
                                    For help accessing the Agency Pledge Portal, please contact Southwest Gas Agency Assistance by using the form on the <a href="https://nexient-my.sharepoint.com/personal/tnguyen_nexient_com/Documents/SWGas%20HORIZON/SWGas%20Content%20Strategy%20&%20Copy/SEW%20to%20provide%20URL%20for%20Agency%20contact%20us%20Form" aria-label="navigate to contact us">Contact Us</a> page or call 877-967-9427. 
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel> */}
                        </Paper>
                    </MDBCol>
                    <MDBCol lg="4" xs="12">
                        <Grid component="div" className="right_profile_sec mb-lg-5" role="region" aria-label="faq right sidebar">
                            <Grid component="div" className="links_sidebar">
                                <Typography variant="h3">Contact Us</Typography>
                                <Grid component="div" className="contactBox">
                                <div className="row">
                                <div className="col-lg-2 col-1 p-lg-0 pl-0 pr-2">
                                <i class="material-icons">call</i> 
                                    </div>
                                    <div className="col-lg-10 col-11 p-lg-0 pl-0 pr-2">
                                    <span class="chatIntro">Contact us by phone</span>
                                    <p>Residential Customer Service</p>
                                    <p><a aria-label="Click to make a call to Southwest Gas" href="tel:1 (800) 411-7343">1 (800) 411-7343</a></p>
                                    <p className="mt-5">Business Customer Service</p>
                                    <p className="mb-0"><a aria-label="Click to make a call to Southwest Gas" href="tel:1 (800) 336-7344">1 (800) 336-7344</a></p>
                                    </div>
                                </div>
                                </Grid>
                                <Grid component="div" className="contactBox pt-0">
                                <div className="row">
                                <div className="col-lg-2 col-1 p-lg-0 pl-0 pr-2">
                                    <i class="material-icons">email</i>
                                    </div>
                                    <div className="col-lg-10 col-11 p-lg-0 pl-0 pr-2">
                                    <span class="chatIntro">Send Us an Email</span>
                                    <p><a href="#" aria-label="Click to write an email to Southwest Gas">Contact Us</a></p>
                                    </div></div>
                                    </Grid>
                            </Grid>
                        </Grid>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}