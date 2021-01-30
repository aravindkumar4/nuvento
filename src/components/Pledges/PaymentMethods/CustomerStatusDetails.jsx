import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Typography from '@material-ui/core/Typography';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UsageButtonsPills from "../MakePledge/UsagePills";
import Help from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import Snackbar from '@material-ui/core/Snackbar';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
    marginTop: '40px',
    marginBottom: '20px',
    minWidth: '100% !important',
    flexWrap: 'nowrap',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  ContentProps: {
    minWidth: '100% !important',
  },
});

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '100%',
    flexShrink: 0,
    color: theme.palette.primary.main,
    fontSize: '20px',
    lineHeight: '35px',
  },
  bgcolorexpnd: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    padding: '0px',
    display: 'block',
  },
  linkright: {
    color: '#27A088',
    fontSize: '15px',
  },
  DynamicLists: {
    textAlign: 'center'
  },
  DownloadButton:
  {
    padding: '0 30px'
  },
  lnkdetails: {
    color: '#005984',
    fontSize: '13px',
  },
  expandhead: {
    margin: '15px 0 !important',
  },
  twocoltxt: {
    display: 'inline-flex',
  },
  icoaligntop: { marginTop: '-12px' },
  wdthsec: {
    width: '150px',
  },
  spaceremove: {
    margin: '0',
    boxShadow: '0 0 0 0',
    border: '1px solid #d8d8d8',
    borderTop: '0px',
  },
  positionStatic: {
    position: 'static',
    minWidth: '100%',
  }
}));

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];
  return (
    <SnackbarContent style={{ minWidth: '100% !important' }}
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
    />
  );
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(255, 255, 255, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export default function ViewCustomerStatus() {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
    },
  }));
  function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();
  
    return <Tooltip arrow classes={classes} {...props} />;
  }
  return (
    <MDBContainer className="popupCustomerStatus">
      <MDBRow>
        <MDBCol lg="8" sm="8" xs="12" className="FormWrapper">
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            classes={{ root: classes.positionStatic }}
            open={open} >
            <MySnackbarContentWrapper
              onClose={handleClose}
              variant="error"
              message="A paymentof $ x by date x is required. Lorem Ipsum"
            />
          </Snackbar>
          <div className="AccordionList accStyleMake">
            <ExpansionPanel defaultExpanded className={classes.spaceremove} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <ExpansionPanelSummary classes={{ content: classes.expandhead }} expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Customer Info </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.bgcolorexpnd}>
                <div className="expanddtls  border-1">
                  <Typography component="h4" className={classes.lbltxt}>Name</Typography>
                  <Typography component="label" className={classes.inpttxt}>John Doe</Typography>
                </div>
                <div className="expanddtls border-1">
                  <Typography component="h4" className={classes.lbltxt}>Service Address</Typography>
                  <Typography component="label" className={classes.inpttxt}>1122 Water Drive, Clear City, NC 77171</Typography>
                </div>
                <div className="expanddtls">
                  <Typography component="h4" className={classes.lbltxt}>Account Number</Typography>
                  <Typography component="label" className={classes.inpttxt}>000000123456</Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel className={classes.spaceremove} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <ExpansionPanelSummary classes={{ content: classes.expandhead }} expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Billing Information</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.bgcolorexpnd}>
                <div className="expanddtls border-1">
                  <Typography component="h4" className={classes.lbltxt}>Total Balance</Typography>
                  <Typography component="label" className={classes.twocoltxt + ' dispLabel'}>$569.11 ($250.00 Security Deposit)
            
                    <BootstrapTooltip title="Deposit amounts due may be included in balances. Please see bills for more details." placement="right">
              <IconButton aria-label="Help">
                  <Help />
                </IconButton>
              </BootstrapTooltip>
                  </Typography>
                </div>
                <div className="expanddtls border-1">
                  <Typography component="h4" className={classes.lbltxt}>Current Bill</Typography>
                  <Typography component="label" className={classes.inpttxt}>$111.99</Typography>
                </div>
                <div className="expanddtls border-1">
                  <Typography component="h4" className={classes.lbltxt}>Past Due</Typography>
                  <Typography component="label" className={classes.inpttxt}>$0.00</Typography>
                </div>
                <div className="expanddtls border-1">
                  <Typography component="h4" className={classes.lbltxt}>Last Payment</Typography>
                  <Typography component="label" className={classes.inpttxt}>$108.00 (12/12/18)</Typography>
                </div>
                <div className="expanddtls border-1"> 
                  <Typography component="h4" className={classes.lbltxt}>30/60/90 Day Balance</Typography>
                  <Typography component="label" className={classes.inpttxt}>30 day: $139.00, 60 day: $150.00, 90 day: $34.11</Typography>
                </div>
                <div className="expanddtls border-1">
                  <Typography component="h4" className={classes.lbltxt}>Payment Arrangements</Typography>
                  <Typography component="label" className={classes.inpttxt}>Deferred Payment Arrangement (Enrolled 01/01/17) <a aria-label="Click here to view details" href="" className={classes.lnkdetails}>View Details</a></Typography>
                </div>
                <div className="expanddtls border-1">
                  <Typography component="h4" className={classes.lbltxt}>Billing Programs</Typography>
                  <Typography component="label" className={classes.inpttxt}>Program ABC</Typography>
                </div>
                <div className="expanddtls">
                  <Typography component="h4" className={classes.lbltxt}>Other Pledges</Typography>
                  <Typography component="label" className={classes.inpttxt}>ABC Agency: $152.11 on 01/01/19</Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel className={classes.spaceremove} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <ExpansionPanelSummary classes={{ content: classes.expandhead }} expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Bill History</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.bgcolorexpnd}>
                <div className="expanddtls billhistoryaccor billHisDetail">
                  <Typography component="label" className={classes.lblright}>$129.01</Typography>
                  <Typography component="label" ><a aria-label="Click here to check bill pdf" href="" className={classes.linkright}>BILL PDF</a></Typography>
                </div>
                <div className="expanddtls billhistoryaccor billHisDetail">
                  <Typography component="label" className={classes.lblright}>$129.01</Typography>
                  <Typography component="label" ><a aria-label="Click here to check bill pdf" href="" className={classes.linkright}>BILL PDF</a></Typography>
                </div>
                <div className="expanddtls billhistoryaccor billHisDetail">
                  <Typography component="label" className={classes.lblright}>$129.01</Typography>
                  <Typography component="label" ><a aria-label="Click here to check bill pdf" href="" className={classes.linkright}>BILL PDF</a></Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel className={classes.spaceremove} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <ExpansionPanelSummary classes={{ content: classes.expandhead }} expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Payment History</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.bgcolorexpnd}>
                <div className="expanddtls billhistoryaccor billHisDetail">
                  <Typography component="label" className={classes.lblright}>$129.01</Typography>
                  <Typography component="label" >12/12/19</Typography>
                </div>
                <div className="expanddtls billhistoryaccor billHisDetail">
                  <Typography component="label" className={classes.lblright}>$117.88</Typography>
                  <Typography component="label" >12/12/19</Typography>
                </div>
                <div className="expanddtls billhistoryaccor billHisDetail">
                  <Typography component="label" className={classes.lblright}>$120.60</Typography>
                  <Typography component="label" >12/12/19</Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel className={classes.spaceremove + ' pledgeHis'} expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
              <ExpansionPanelSummary classes={{ content: classes.expandhead }} expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Pledge History</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.bgcolorexpnd}>
                <div className="expanddtls billhistoryaccor billHisDetail">
                  <Typography component="label" className={classes.wdthsec}>$129.01</Typography>
                  <Typography component="label" >12/12/19</Typography>
                  <Typography component="label" className={classes.wdthsec}>Canceled</Typography>
                </div>
                <div className="expanddtls billhistoryaccor billHisDetail">
                  <Typography component="label" className={classes.wdthsec}>$117.88</Typography>
                  <Typography component="label" >12/12/19</Typography>
                  <Typography component="label" className={classes.wdthsec}>Fulfilled</Typography>
                </div>
                <div className="expanddtls billhistoryaccor billHisDetail">
                  <Typography component="label" className={classes.wdthsec}>$120.60</Typography>
                  <Typography component="label" >12/12/19</Typography>
                  <Typography component="label" className={classes.wdthsec}>Canceled</Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel style={{ marginBottom: '30px' }} className={classes.spaceremove} expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
              <ExpansionPanelSummary classes={{ content: classes.expandhead }} expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Usage</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.bgcolorexpnd} style={{ background: '#fff' }}>
                <div className="UsagesTopBoxpledges">
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

  );
}
