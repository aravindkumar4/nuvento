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
import HeaderSwitch from '../HeaderSwitch';
import './../components/Prelogin/Faq/faq.scss';

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
          <>
          {window.location.hash == '#/faq' ?
        <section className="Dashheader mb-5">
            <MDBContainer>
                <MDBRow>
                    <MDBCol size="12">
                        <div className="username-box">
                            <p className="mb-3 mb-md-0">Frequently Asked Questions (FAQs)</p>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section> :
        <section className="text-left faq-page">
            <MDBContainer>
                <MDBRow>
                    <MDBCol size="12">
                        <Typography color="primary" conponent="h1" className="HelpHeading">Frequently Asked Questions (FAQs)</Typography>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
          }
        <section class="page-wrapper">
            <MDBContainer>
                <MDBRow className="faq-page text-left mt-0" role="region" aria-label="faq left sidebar">
                    <MDBCol lg="8" xs="12">
                        <Paper className="HelpDetailsDropdowns">
                            <ExpansionPanel className={classes.headerline}>
                                <ExpansionPanelSummary classes={{ content: classes.expansionpanelheading }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel1-content'
                                    aria-describedby="panel1Details"
                                    id="panel2-header" >
                                    <Typography className={classes.heading}>How do I look up Southwest Gas customer information and make a pledge?</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="panel1Details" classes={{ root: 'expansiondetailsbox' }}>
                                    <Typography className="DetailsBoxContent">
                                     The Southwest Gas customer must first provide you with written authorization, their 12-digit account number and either the customer account # and last name or Account # along with Date of Birth (DOB).
                                     
                                     <br></br>
                                     <br></br>
                                     For complete instructions on how to look up Southwest Gas customer information and make a pledge, refer to the <a target="blank" href="https://www.swgas.com/Agency-Pledge-Portal-User-Guide.pdf" aria-label="click here to view Agency Pledge Portal User Guide pdf">Agency Pledge Portal User Guide pdf</a>.  </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className={classes.headerline}>
                                <ExpansionPanelSummary classes={{ content: classes.expansionpanelheading }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel2-content'
                                    aria-describedby="panel2Details"
                                    id="panel2-header" >
                                    <Typography className={classes.heading}>Is customer authorization required to look up information?</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="panel2Details" classes={{ root: 'expansiondetailsbox' }}>
                                    <Typography className="DetailsBoxContent">
                                    Yes, prior to conducting a search for Southwest Gas customer information, please ensure the customer has provided your agency written and signed authorization to view their account. 
                                    <br></br>
                                     <br></br>
                                    If your agency does not have a customer release form, use the following form: <a target="blank" href="https://www.swgas.com/1409190825153/Customer-Authorization.pdf" aria-label="click here to view Customer Authorization Release pdf file">Customer Authorization Release pdf</a> 
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            {/* <ExpansionPanel className={classes.headerline}>
                                <ExpansionPanelSummary aria-describedby="panel3Details" classes={{ content: classes.expansionpanelheading }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel3-content'
                                    id="panel3-header" >
                                    <Typography className={classes.heading}>Who can I contact for help?</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="panel3Details" classes={{ root: 'expansiondetailsbox' }}>
                                    <Typography className="DetailsBoxContent">
                                    For help accessing the Agency Pledge Portal, please contact Southwest Gas Agency Assistance by using the form on the <a  target="blank" href="https://nexient-my.sharepoint.com/personal/tnguyen_nexient_com/Documents/SWGAS%20HORIZON/SWGAS%20Content%20Strategy%20&%20Copy/SEW%20to%20provide%20URL%20for%20Agency%20contact%20us%20Form" aria-label="navigate to contact page">Contact Us</a> page or call 877-967-9427
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel> */}
                            <ExpansionPanel className={classes.headerline}>
                                <ExpansionPanelSummary aria-describedby="panel4Details" classes={{ content: classes.expansionpanelheading }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel4-content'
                                    id="panel4-header" >
                                    <Typography className={classes.heading}>What documentation is available for the Agency Pledge Portal?</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="panel4Details" classes={{ root: 'expansiondetailsbox' }}>
                                    <Typography className="DetailsBoxContent">
                                    To see all available documentation regarding Agency Pledges, please visit the following:
                                    <ul>
                                        <li><a target="blank" href="https://www.swgas.com/1409190822392/Agency-Pledge-Portal-Registration-Guide.pdf" aria-label="click here to view Agency Pledge Portal Registration Guide pdf file">Agency Pledge Portal Registration Guide pdf </a></li>
                                        <li><a target="blank" href="https://www.swgas.com/Agency-Pledge-Portal-User-Guide.pdf" aria-label="click here to view Agency Pledge Portal User Guide pdf file">Agency Pledge Portal User Guide pdf</a></li>
                                        <li><a target="blank" href="https://www.swgas.com/Agency-Assistance-Agreement.pdf" aria-label="click here to view Agency Assistance Agreement pdf file">Agency Assistance Agreement pdf</a></li>
                                        <li><a target="blank" href="https://www.swgas.com/1409190825153/Customer-Authorization.pdf" aria-label="click here to view Customer Authorization Release pdf  file">Customer Authorization Release pdf </a></li>
                                    </ul>
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className={classes.headerline}>
                                <ExpansionPanelSummary aria-describedby="panel5Details" classes={{ content: classes.expansionpanelheading }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel5-content'
                                    id="panel5-header" >
                                    <Typography className={classes.heading}>How do I cancel or change a pledge?</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="panel5Details" classes={{ root: 'expansiondetailsbox' }}>
                                    <Typography className="DetailsBoxContent">
                                    To cancel or change a pledge, please log into the Agency Portal, then:
                                    <ul>
                                        <li>Review your agency's pledge items</li>
                                        <li>Select the customer who's pledge requires editing/cancellation</li>
                                        <li>Follow prompts to edit/cancel pledge</li>
                                        <li>You should receive an automated e-mail confirming your selection</li>
                                    </ul>

                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className={classes.headerline}>
                                <ExpansionPanelSummary aria-describedby="panel6Details" classes={{ content: classes.expansionpanelheading }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel5-content'
                                    id="panel5-header" >
                                    <Typography className={classes.heading}>What does the pledge status mean? </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="panel6Details" classes={{ root: 'expansiondetailsbox' }}>
                                    <Typography className="DetailsBoxContent">
                                    There are several stages in the pledge process, they are explained below:
                                    <ul>
                                        <li><strong>Pending</strong>: A pledge was made and processed within the Agency Pledge Portal</li>
                                        <li><strong>Paid</strong>: Payment of the pledge has been received and posted to the customer's account within 45 days after making the pledge</li>
                                        <li><strong>Canceled</strong>: The pledge has been canceled</li>
                                        <li><strong>Expired</strong>: If a pledge is not received after 45 days, the status will automatically be changed from Pending to Expired. If pledge payment is posted after the status is expired, it will still apply to the customer's account, but the status will still read as expired.</li>
                                    </ul>
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className={classes.headerline}>
                                <ExpansionPanelSummary aria-describedby="panel7Details" classes={{ content: classes.expansionpanelheading }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel5-content'
                                    id="panel5-header" >
                                    <Typography className={classes.heading}>What happens if a pledge is not paid?</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="panel7Details" classes={{ root: 'expansiondetailsbox' }}>
                                    <Typography className="DetailsBoxContent">
                                    The Southwest Gas customer is always responsible for the balance owed on their account. When a pledge is made, a hold is placed on the account for the amount of the pledge. After 45 days, if payment on the pledge is not received, the hold is removed, and payment must be received from the customer to avoid possible interruption in service. 
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className={classes.headerline}>
                                <ExpansionPanelSummary aria-describedby="panel8Details" classes={{ content: classes.expansionpanelheading }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel5-content'
                                    id="panel5-header" >
                                    <Typography className={classes.heading}>How do I determine if an address is serviced by Southwest Gas? </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="panel8Details" classes={{ root: 'expansiondetailsbox' }}>
                                    <Typography className="DetailsBoxContent">
                                    From the Portal Home page, use the "Address Verification" function and enter an address to verify if it is serviced by Southwest Gas.
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className={classes.headerline}>
                                <ExpansionPanelSummary classes={{ content: classes.expansionpanelheading }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel6-content'
                                    aria-describedby="panel6Details"
                                    id="panel6-header" >
                                    <Typography className={classes.heading}>What are the benefits of using the Agency Pledge Portal?</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="panel6Details" classes={{ root: 'expansiondetailsbox' }}>
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
                                    aria-controls='panel7-content'
                                    aria-describedby="panel7Details"
                                    id="panel7-header" >
                                    <Typography className={classes.heading}>Who is eligible to use the Agency Pledge Portal?</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="panel7Details" classes={{ root: 'expansiondetailsbox' }}>
                                    <Typography className="DetailsBoxContent">
                                    The Agency Pledge Portal is available to representatives of utility assistance agencies that have registered with Southwest Gas. 
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel className={classes.headerline}>
                                <ExpansionPanelSummary classes={{ content: classes.expansionpanelheading }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel8-content'
                                    aria-describedby="panel8Details"
                                    id="panel8-header" >
                                    <Typography className={classes.heading}>How do I register to use the Agency Pledge Portal?</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="panel8Details" classes={{ root: 'expansiondetailsbox' }}>
                                    <Typography className="DetailsBoxContent">
                                    Registration is easy. From the Login Screen, complete the online registration form. Next, review, complete, and return the following required agreement <a href="https://www.swGas.com/Agency-Assistance-Agreement.pdf" aria-label="click here to view Agency Assistance Agreement pdf file">Agency Assistance Agreement pdf</a>. 
                                    <br></br>
                                    <br></br>
                                    For detailed instructions on how to register for the Agency Pledge Portal refer to the <a href="https://www.swGas.com/1409190822392/Agency-Pledge-Portal-Registration-Guide.pdf" aria-label="click here to view Agency Pledge Portal Registration Guide pdf file">Agency Pledge Portal Registration Guide pdf</a>. 
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
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
                                <Grid component="div" className="contactBox pt-4">
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
        </>
    );
}