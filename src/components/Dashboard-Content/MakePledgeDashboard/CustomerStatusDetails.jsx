import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {MDBContainer, MDBRow, MDBCol} from 'mdbreact';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UsageButtonsPills from "../MakePledgeDashboard/UsagePills";
import Help from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  appBar: {
    position: 'relative',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '100%',
    flexShrink: 0,
    color:theme.palette.primary.main,
    fontSize:'20px',	lineHeight: '35px',
    fontFamily:'Opensans-semibold'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  titleaccordion: {
    fontWeight:'bold',
    color:'#696969',
    marginBottom: '25px',
  },
  bgcolorexpnd: {
    background:'#f5f5f5',
    padding:'0px',
    display: 'block',
  },
  formControl:{
    flex:'1',
  },
  linkright: {
    color: '#27A088',	
    fontSize:'15px',
  },
  spaceremove: {
    margin:'0',
  },
  DynamicLists:{
    textAlign:'center'
  },
  signup: {
    display: 'inline-flex',
    justifyContent: 'flex-end',
    flex:'1',
    alignxtAlign:'center'
  },
  DownloadButton:
  {
    padding:'0 30px'
  },
  lnkdetails:{
    color: theme.palette.primary.main,
    fontSize: '13px',
  },
  expandhead: {
    margin: '15px 0 !important',
  },
  twocoltxt:{
    display: 'inline-flex',
  },
  icoaligntop:{marginTop:'-12px'},
  wdthsec: {
    width:'150px',
  },
  spaceremove: {
    margin:'0',
    boxShadow:'0 0 0 0',    
    border:'1px solid #d8d8d8',
    borderTop:'0px',
  },
});
class AddPaymentMethod extends React.Component {
  state = {
    name: '',
    value: 'Yes',
    expanded: 'panel1',
  }
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

handleClick = event => {
  this.setState({  showdiv: false  });
  };
  handleOnClick = event => {
    this.setState({  showdiv: true  });
    };
    handleOnChange = event => {
      this.setState({ [event.target.name]: event.target.value });
      this.setState({ value: event.target.value });
  }; 
  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    return(
          <MDBContainer>
            <MDBRow>
             <MDBCol lg="8" sm="8" xs="12" className="FormWrapper">          
             <div className="AccordionList">
        {/* <p className={classes.titleaccordion}>John Doe</p> */}
        <ExpansionPanel defaultExpanded className={classes.spaceremove} expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')} style={{borderTop:`1px solid #d8d8d8`}}>
        <ExpansionPanelSummary classes={{ content: classes.expandhead }}  expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Customer Info</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.bgcolorexpnd}>
          <div className="expanddtls">        
              <Typography component="h4" className={classes.lbltxt}>Name</Typography>
              <Typography component="label" className={classes.inpttxt}>John Doe</Typography>          
          </div>       
          <div className="expanddtls">        
              <Typography component="h4" className={classes.lbltxt}>Service Address</Typography>
              <Typography component="label" className={classes.inpttxt}>1122 Water Drive, Clear City, NC 77171</Typography>          
          </div>    
          <div className="expanddtls">        
              <Typography component="h4" className={classes.lbltxt}>Account Number</Typography>
              <Typography component="label" className={classes.inpttxt}>000000123456</Typography>          
          </div>    
          
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className={classes.spaceremove} expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
        <ExpansionPanelSummary  classes={{ content: classes.expandhead }}   expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Billing Information</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.bgcolorexpnd}>
         <div className="expanddtls">        
              <Typography component="h4" className={classes.lbltxt}>Total Balance</Typography>
              <Typography component="label" className={classes.twocoltxt}>$569.11 ($250.00 Security Deposit) 
              
              <Tooltip className={classes.icoaligntop} title="Deposit amounts due may be included in balances. Please see bills for more details." placement="right">
              <IconButton aria-label="Help">
                <Help />
              </IconButton>
            </Tooltip>
            </Typography>          
          </div>       
          <div className="expanddtls">        
              <Typography component="h4" className={classes.lbltxt}>Current Bill</Typography>
              <Typography component="label" className={classes.inpttxt}>$111.99</Typography>          
          </div>       
          <div className="expanddtls">        
              <Typography component="h4" className={classes.lbltxt}>Past Due</Typography>
              <Typography component="label" className={classes.inpttxt}>$0.00</Typography>          
          </div>       
          <div className="expanddtls">        
              <Typography component="h4" className={classes.lbltxt}>Last Payment</Typography>
              <Typography component="label" className={classes.inpttxt}>$108.00 (12/12/18)</Typography>          
          </div>       
          <div className="expanddtls">        
              <Typography component="h4" className={classes.lbltxt}>30/60/90 Day Balance</Typography>
              <Typography component="label" className={classes.inpttxt}>30 day: $139.00, 60 day: $150.00, 90 day: $34.11</Typography>          
          </div>       
          <div className="expanddtls">        
              <Typography component="h4" className={classes.lbltxt}>Payment Arrangements</Typography>
              <Typography component="label" className={classes.inpttxt}>Deferred Payment Arrangement (Enrolled 01/01/17) <a aria-label="Click here to view details" href="" className={classes.lnkdetails}>View Details</a></Typography>          
          </div>       
          <div className="expanddtls">        
              <Typography component="h4" className={classes.lbltxt}>Billing Programs</Typography>
              <Typography component="label" className={classes.inpttxt}>Program ABC</Typography>          
          </div>       
          <div className="expanddtls">        
              <Typography component="h4" className={classes.lbltxt}>Other Pledges</Typography>
              <Typography component="label" className={classes.inpttxt}>ABC Agency: $152.11 on 01/01/19</Typography>          
          </div>       
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className={classes.spaceremove} expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
        <ExpansionPanelSummary  classes={{ content: classes.expandhead }}  expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Bill History</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.bgcolorexpnd}>
        <div className="expanddtls billhistoryaccor">        
              <Typography component="label" className={classes.lblright}>$129.01</Typography>
              <Typography component="label" ><a aria-label="Click here to check bill pdf" href="" className={classes.linkright}>BILL PDF</a></Typography>          
          </div>  
          <div className="expanddtls billhistoryaccor">        
              <Typography component="label" className={classes.lblright}>$129.01</Typography>
              <Typography component="label" ><a aria-label="Click here to check bill pdf" href="" className={classes.linkright}>BILL PDF</a></Typography>          
          </div>  
          <div className="expanddtls billhistoryaccor">        
              <Typography component="label" className={classes.lblright}>$129.01</Typography>
              <Typography component="label" ><a aria-label="Click here to check bill pdf" href="" className={classes.linkright}>BILL PDF</a></Typography>          
          </div>  
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className={classes.spaceremove} expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
        <ExpansionPanelSummary  classes={{ content: classes.expandhead }}  expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Payment History</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails  className={classes.bgcolorexpnd}>
          <div className="expanddtls billhistoryaccor">        
                <Typography component="label" className={classes.lblright}>$129.01</Typography>
                <Typography component="label" >12/12/19</Typography>          
            </div>  
            <div className="expanddtls billhistoryaccor">        
                <Typography component="label" className={classes.lblright}>$117.88</Typography>
                <Typography component="label" >12/12/19</Typography>          
            </div>  
            <div className="expanddtls billhistoryaccor">        
                <Typography component="label" className={classes.lblright}>$120.60</Typography>
                <Typography component="label" >12/12/19</Typography>          
            </div>  
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className={classes.spaceremove} expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
        <ExpansionPanelSummary  classes={{ content: classes.expandhead }}  expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Pledge History</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails  className={classes.bgcolorexpnd}>
            <div className="expanddtls billhistoryaccor">        
                <Typography component="label" className={classes.wdthsec}>$129.01</Typography>          
                <Typography component="label" >12/12/19</Typography>  
                <Typography component="label"  className={classes.wdthsec}>Canceled</Typography>  
            </div>  
            <div className="expanddtls billhistoryaccor">        
                <Typography component="label" className={classes.wdthsec}>$117.88</Typography>          
                <Typography component="label" >12/12/19</Typography>  
                <Typography component="label"  className={classes.wdthsec}>Fulfilled</Typography>  
            </div>  
            <div className="expanddtls billhistoryaccor">        
                <Typography component="label" className={classes.wdthsec}>$120.60</Typography>          
                <Typography component="label" >12/12/19</Typography>  
                <Typography component="label"  className={classes.wdthsec}>Canceled</Typography>  
            </div>  
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel style={{marginBottom:'30px'}} className={classes.spaceremove} expanded={expanded === 'panel6'} onChange={this.handleChange('panel6')}>
        <ExpansionPanelSummary  classes={{ content: classes.expandhead }} expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Usage</Typography>
        </ExpansionPanelSummary>
           <ExpansionPanelDetails  className={classes.bgcolorexpnd} style={{background:'#fff'}}>
               <div  className="UsagesTopBoxpledges">
                   <UsageButtonsPills />
                </div>
                <div className="DownloadSection">
                  <Typography className={classes.DynamicLists} component="p" color="textPrimary">
                    <a aria-label="Click here to download excel" href="" role="button" className={classes.DownloadButton}><i class="material-icons icoaccor">get_app</i>Download Excel</a>
                    <a aria-label="Click here to download usage details" href="" role="button" className={classes.DownloadButton}><i class="material-icons icoaccor">get_app</i>Download Usage Details</a>
                  </Typography>
               
                </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
         </MDBCol>
      </MDBRow>
		  <MDBRow>  
			</MDBRow>
          </MDBContainer>

      )
    }
  }  
 AddPaymentMethod.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPaymentMethod);