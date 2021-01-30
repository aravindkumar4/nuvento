import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ElectricUsageChart from './ElectricUsageChart';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';

function ControlledOpenSelect() {
  const [Currency, setCurrency] = React.useState('$');
  const [year, setYear] = React.useState('2018');
  const handleChange = event => {
    setYear(event.target.value);
  };
  const handleOnChange = event => {
    setCurrency(event.target.value);
  };
  const classes = useStyles();
  return (
    <form autoComplete="off" className="UsageSelecters UsageSelectersRes">
          {/*<FormControl variant="outlined" style={{ width: `97px`, margin: `0px 0 0 15px`, textAlign: `left` }} className="UsageDropsControlTwo">
        <InputLabel shrink htmlFor="selectYear"></InputLabel>
        <Select classes={{ outlined: 'paddingSelector' }}
          value={year}
          onChange={handleChange}
          input={<OutlinedInput disableUnderline name="year" id="selectYear" />}
          displayEmpty
          name="year"
        >
          <MenuItem value="2019">2019</MenuItem>
          <MenuItem value="2018">2018</MenuItem>
          <MenuItem value="2017">2017</MenuItem>
          <MenuItem value="2016">2016</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" style={{ width: `66px`, margin: `0px 0 0 15px`, textAlign: `left` }} className="UsageDropsControlTwo">
        <InputLabel shrink htmlFor="selectCurrency"></InputLabel>
        <Select classes={{ outlined: 'paddingSelector' }}
          value={Currency}
          onChange={handleOnChange}
          input={<OutlinedInput disableUnderline name="Currency" id="selectCurrency" />}
          displayEmpty
          name="Currency" >
          <MenuItem value="$">$</MenuItem>
          <MenuItem value="kWH">kWH</MenuItem>
        </Select>
          </FormControl>
          */}
    </form>
  );
}

const useStyles = makeStyles(theme => ({
  selectWidth: {
    width: '40%',
  },
  root: {
    backgroundColor: theme.palette.primary,
  },
  tabRoot: {
    textTransform: 'initial',
    fontSize: '15px',
    minWidth: '78px',
    '&:hover': {
      color: theme.palette.primary.main,
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#ffffff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.primary.main,
    },
    '&:focus': {
      color: '#ffffff',
      backgroundColor: theme.palette.primary.main,
    },
  },
  tabSelected: {},
  TabbsAlignment: { display: 'flex', justifyContent: 'center' },
  GridRooter: { display: 'flex' }
}));

export default function UsageButtonPills() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();
  return (
    // <Grid container spacing={24}>
    //   <Grid item lg={5} sm={12} size={12} className={classes.TabbsAlignment}>
    //     <Tabs className="tabbingusage" color="primary"
    //       value={value} onChange={handleChange}>
    //       <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} className="seperatetab" label="Month" />
    //       <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} className="seperatetab" label="Day" />
    //     </Tabs>
    //   </Grid>
    //   <Grid item lg={7} sm={12} size={12} className={classes.GridRooter}>
    //     <ControlledOpenSelect />
    //   </Grid>
    //   
    // </Grid>
    <div className="container">
          <div className="row no-gutters usageHeadData">
        {/*
        <Tabs className="tabbingusage" color="primary"
           value={value} onChange={handleChange}>
           <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} className="seperatetab" label="Month" />
           <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} className="seperatetab" label="Day" />
        </Tabs>*/}
        <ControlledOpenSelect />
      </div>
      <div className="row">
        <div className="col-12">
        <ElectricUsageChart />
        </div>
      </div>
    </div>
   
  );
}
