import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { MDBCol } from 'mdbreact';
import PaymentHistoryChart from './PaymentHistoryChart';
import FormControl from '@material-ui/core/FormControl';
import { css } from 'glamor';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const ServiceCardContent = {
  padding: '0px 12px 15px !important',
};
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    padding: '25px 15px',
    margin: '20px 0',
    border: 'solid .5px #dcdcdc',
  },
  MarginTypo: { fontSize: 16, color: '#696969' },
  buttonflex: {
    display: 'flex',
    justifyContent: 'flex-start',
    position: 'relative'
  },
  button: {
    alignSelf: 'center',
    width: '100%',
    borderRadius: '2px',
  },
  Card: {
    padding: '25px 30px',
    margin: '35px 0',
    textAlign: 'left',
    border: 'solid 1px #dcdcdc',
    borderRadius: 0,
    position: 'relative',
    boxShadow: '0 12px 24px 0 rgba(0,0,0,0.15)',
    borderRadius: '5px',
  },
  CloseButton: { position: 'absolute', right: '2px', top: '2px', zIndex: 1 },
  Headingfive: {
    
    paddingBottom: 10,
    fontFamily: 'Opensans-Bold',
    textAlign: 'left'
  }
}));

const YearLabels = [
  {
    value: '2019',
  },
  {
    value: '2018',
  },
  {
    value: '2017',
  }
];

export default function DashboardBlock2() {
  const [show, setShow] = React.useState(true);
  const [Year, setYear] = React.useState('2019');

  const handleClick = () => {
    setShow(false);
  }

  const handleSelect = event => {
    setYear(event.target.value);
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      {show && (
        <Card className={classes.Card + ' signUpNotification'} elevation={1}>
          <Grid className={classes.boxShadowbox} container spacing={24}>
            {/* <IconButton className={classes.CloseButton} aria-label="Delete" onClick={handleClick}>
              <i class="material-icons">close</i>
            </IconButton> */}
            <Grid item xs={12} md={12} sm={12} {...css(ServiceCardContent)} className={'ServiceCardContent'}>
              <Typography gutterBottom color="primary" component="h5" className={classes.Headingfive}>
                Sign Up for Notifications</Typography>
              <Typography component="p" className={classes.MarginTypo}>
                Ut at tortor lacus. Mauris maximus lacus lorem, at valputate urna semper a. Proin viverra dapibus dictum. Praesent aliquet turpis quis sollicitudin pellentesque.
        </Typography>
            </Grid>
            <Grid item md={12} sm={12} xs={12} className={classes.buttonflex}>
              <Button aria-label="click here for notification setting" variant="contained" color="secondary" className={classes.button}>Notification Settings</Button>
            </Grid>
          </Grid>
        </Card>
      )}
      {/* <Paper className={classes.root} elevation={0}>
        <MDBCol xs="12" lg="12" sm="12" className="TrimmerDiv">
          <Typography gutterBottom component="h5" color="primary" className={classes.Headingfive}>Payment History
              <FormControl variant="outlined" style={{ margin: `-5px 20px 0`, width: `auto`, minWidth: `100px`, textAlign: `left`, float: `right` }} className="UsageDropsControlTwo">
              <InputLabel shrink htmlFor="YearSelector"></InputLabel>
              <Select classes={{ outlined: 'paddingSelector' }}
                value={Year}
                onChange={handleSelect}
                input={<OutlinedInput disableUnderline name="Year" id="YearSelector" />}
                displayEmpty
                name="Year"
              >
                {YearLabels.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Typography>
          <PaymentHistoryChart />
        </MDBCol>
      </Paper> */}
    </React.Fragment>
  );
}
