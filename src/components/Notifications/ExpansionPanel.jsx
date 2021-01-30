import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Products from './preferencedata';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: 15,
    flexBasis: '33.33%',
    flexShrink: 0,
    textAlign: 'left',
    color: '#696969',
    alignItems: 'center',
    display: 'flex'
  },
  MultiSelect: {
    borderRadius: '0',
  },
  secondaryHeading: {
    fontSize: 15,
    color: theme.palette.text.secondary,
    flexBasis: '33.33%',
    flexShrink: 0,
    textAlign: 'left',
    color: '#696969',
    alignItems: 'center',
    display: 'flex'
  },
  SwitchButton: {
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  SwitchForm: {
    flexDirection: 'row-reverse',
  },
  colorSwitchBase: {
    height: 'auto',
  },
  ExpandedPanelStyle: {
    margin: 0,
  },
  customWidth: {
    fontSize: '24'
  },
  form: {
    width: '100%',
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  formnotipref: {
    width: '100%',
    display: 'flex',
    flex: '1'
  },
  DeleteButton: {
    marginLeft: '1%',
  }
  , ExpansionPanelClass: { display: 'block' },
  addButton: { display: 'flex', textTransform: 'uppercase' }
}));

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
    backgroundColor: '#fdfdfd',
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


export default function ControlledExpansionPanels() {
  const [expanded, setExpanded] = React.useState('panel1');
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    checkedE: false,    
  });
  const handleOnChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        tooltip: {
          fontSize: "13px",
          color: "#ffffff",
          backgroundColor: "#333333",
          opacity: '1'
        }
      }
    }
  });
  const classes = useStyles();

  const longText = `Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est,`;
  return (
    <div className={classes.root}>
      <ExpansionPanel classes={{ expanded: classes.ExpandedPanelStyle, }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: 'ExpandRowMenuItem' }}>
          <Typography className={classes.heading}><span>Outages</span>
            <MuiThemeProvider theme={theme}>
              <Tooltip title={longText} classes={{ tooltip: classes.customWidth }} placement="right">
                <span className="Info_Icons"><i class="material-icons">help</i></span>
              </Tooltip>
            </MuiThemeProvider>
          </Typography>
          <Typography className={classes.secondaryHeading}>342 Accounts</Typography>
          <Typography className={classes.SwitchButton}>
            <FormGroup className={classes.SwitchForm}>
              <FormControlLabel class="CustomSwitchStyling"
                control={<Switch checked={state.checkedA} onChange={handleChange('checkedA')}
                  onClick={event => event.stopPropagation()}
                  onFocus={event => event.stopPropagation()}
                  value="checkedB" color="primary" classes={{ switchBase: classes.colorSwitchBase }}
                />
                }
              /></FormGroup>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.ExpansionPanelClass}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <form className={classes.formnotipref} noValidate autoComplete="off" item xs={12}>
                <Products />
              </form>
            </Grid>
          </Grid>

        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleOnChange('panel2')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: 'ExpandRowMenuItem' }}>
          <Typography className={classes.heading}><span>Billing</span>
            <MuiThemeProvider theme={theme}>
              <Tooltip title={longText} classes={{ tooltip: classes.customWidth }} tooltipPlacementRight>
                <span className="Info_Icons"><i class="material-icons">help</i></span>
              </Tooltip>
            </MuiThemeProvider>
          </Typography>
          <Typography className={classes.secondaryHeading}>No Accounts</Typography>
          <Typography className={classes.SwitchButton}>
            <FormGroup className={classes.SwitchForm}>
              <FormControlLabel class="CustomSwitchStyling"
                onClick={event => event.stopPropagation()}
                onFocus={event => event.stopPropagation()}
                control={
                  <Switch checked={state.checkedB} onChange={handleChange('checkedB')}
                    value="checkedB" color="primary" classes={{ switchBase: classes.colorSwitchBase }}
                  />
                }
              /></FormGroup>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <form className={classes.formnotipref} noValidate autoComplete="off" item xs={12}>
                <Products />
              </form>
            </Grid>
          </Grid>

        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleOnChange('panel3')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: 'ExpandRowMenuItem' }}>
          <Typography className={classes.heading}><span>RTO</span>
            <MuiThemeProvider theme={theme}>
              <Tooltip title={longText} classes={{ tooltip: classes.customWidth }} tooltipPlacementRight>
                <span className="Info_Icons"><i class="material-icons">help</i></span>
              </Tooltip>
            </MuiThemeProvider>
          </Typography>
          <Typography className={classes.secondaryHeading}>No Accounts</Typography>
          <Typography className={classes.SwitchButton}>
            <FormGroup className={classes.SwitchForm}>
              <FormControlLabel class="CustomSwitchStyling"
                onClick={event => event.stopPropagation()}
                onFocus={event => event.stopPropagation()}
                control={
                  <Switch checked={state.checkedC} onChange={handleChange('checkedC')}
                    value="checkedB" color="primary" classes={{ switchBase: classes.colorSwitchBase }}
                  />
                }
              /></FormGroup>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <form className={classes.formnotipref} noValidate autoComplete="off" item xs={12}>
                <Products />
              </form>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleOnChange('panel4')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: 'ExpandRowMenuItem' }}>
          <Typography className={classes.heading}><span>Service Request</span>
            <MuiThemeProvider theme={theme}>
              <Tooltip title={longText} classes={{ tooltip: classes.customWidth }} tooltipPlacementRight>
                <span className="Info_Icons"><i class="material-icons">help</i></span>
              </Tooltip>
            </MuiThemeProvider>
          </Typography>
          <Typography className={classes.secondaryHeading}>All Accounts</Typography>
          <Typography className={classes.SwitchButton}>
            <FormGroup className={classes.SwitchForm}>
              <FormControlLabel class="CustomSwitchStyling"
                onClick={event => event.stopPropagation()}
                onFocus={event => event.stopPropagation()}
                control={
                  <Switch checked={state.checkedD} onChange={handleChange('checkedD')}
                    value="checkedB" color="primary" classes={{ switchBase: classes.colorSwitchBase }}
                  />
                }
              /></FormGroup>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <form className={classes.formnotipref} noValidate autoComplete="off" item xs={12}>
                <Products />
              </form>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel5'} onChange={handleOnChange('panel5')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: 'ExpandRowMenuItem' }}>
          <Typography className={classes.heading}><span>Quiet Hours</span>
            <MuiThemeProvider theme={theme}>
              <Tooltip title={longText} classes={{ tooltip: classes.customWidth }} tooltipPlacementRight>
                <span className="Info_Icons"><i class="material-icons">help</i></span>
              </Tooltip>
            </MuiThemeProvider>
          </Typography>
          <Typography className={classes.secondaryHeading}>9pm - 6am</Typography>
          <Typography className={classes.SwitchButton}>
            <FormGroup className={classes.SwitchForm}>
              <FormControlLabel class="CustomSwitchStyling"
                onClick={event => event.stopPropagation()}
                onFocus={event => event.stopPropagation()}
                control={
                  <Switch checked={state.checkedE} onChange={handleChange('checkedE')}
                    value="checkedE" color="primary" classes={{ switchBase: classes.colorSwitchBase }}
                  />
                }
              /></FormGroup>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <form className={classes.formnotipref} noValidate autoComplete="off" item xs={12}>
                <Products />
              </form>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
