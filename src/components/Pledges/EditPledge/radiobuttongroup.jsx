import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

const styles = theme => ({
    root: {
        display: 'block',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    input: {
      margin: 20,
    },
});


const MyLabel = (props) => (
  <div>
    <span style={{}}>{props.totalamounttext}</span>
    <span style={{float:'right', color:'#696969', fontWeight:'bold'}}>{props.totalamountdue}</span>

    <span style={{}}>{props.dueamounttext}</span>
    <span style={{float:'right', color:'#696969', fontWeight:'bold'}}>{props.dueamount}</span>
    <span style={{}}>{props.PTADText}</span>
    <span style={{float:'right', color:'#696969', fontWeight:'bold'}}>{props.PTAD}</span>

  </div>
);

const MyLabelInput = (props) => (
  <div>
    <span style={{}}>{props.OtherAmountDText}</span>
    <span style={{float:'right', color:'#27A088'}}>
    <Input defaultValue="$0.00" inputProps={{ 'aria-label': 'Description', }} className="InputClass" />
    </span>
  </div>
);

class RadioButtonsGroup extends React.Component {
    state = {
        value: 'Pay Total Amount Due',
        PayPerAccountMod:'RadioBoxSelect',
        name: '',
        showdiv: false,
       
    };

    handleChange = event => {
      this.setState({ value: event.target.value });
    };
    handleOnChange = event => {
      this.setState({ PayPerAccountMod: event.target.value });
    };
    handleClick = event => {
      this.setState({  showdiv: true  });
     };
     handleOnClick = event => {
      this.setState({  showdiv: false  });
     };
    render() {
        const { classes } = this.props;

        return (
          <div className={classes.root}>      
        <FormControl component="fieldset" className={'radiogrup'}>
          <RadioGroup  aria-label="PaymentAmounts" name="PaymentAmounts" className={classes.group}  
          value={this.state.value} onChange={this.handleChange} >
            <FormControlLabel className={'amountdatadiv'}
              value="Pay Total Amount Due" onClick={this.handleOnClick} 
              control={<Radio color="primary" />}
              label={<MyLabel totalamounttext="Pay Total Amount Due" totalamountdue="$354.22" />}
              labelPlacement="last"
            />
            <FormControlLabel className={'amountdatadiv'}
              value="Pay Due Amount(s)" onClick={this.handleOnClick}  
              control={<Radio color="primary" />}
              label={<MyLabel dueamounttext="Pay Due Amount(s)" dueamount="$1122.22" />}
              labelPlacement="last"
            />
            <FormControlLabel
              value="Pay Per Account" onClick={this.handleClick}
              control={<Radio color="primary" />}
              label="Pay Per Account"
              labelPlacement="last"
            />
           
          </RadioGroup>
        
        </FormControl>
        <div className="ChoosePaymentDate submenucontent" hidden = {!this.state.showdiv}>
            <div class="addedaccountdetails">    
                  1234 Apple Seed St, Unit 1<br/>
                  123456789 (Master)     
            </div>
        <FormControl component="fieldset" className={'radiogrup'}>
          <RadioGroup aria-label="PayPerAccountMod" name="PayPerAccountMod" className={classes.group}
            value={this.state.PayPerAccountMod}  onChange={this.handleOnChange} >
            <FormControlLabel className={'amountdatadiv'}
              value="PPA"
              control={<Radio color="primary" />}
              label={<MyLabel PTADText="Pay Total Amount Due" PTAD="$354.22" />}
              labelPlacement="last"
            />
            <FormControlLabel className={'amountdatadiv'}
              value="Other"
              control={<Radio color="primary" />} 
              label={<MyLabelInput OtherAmountDText="Other" OtherAmountD="asdasdasd" />}
              labelPlacement="last" 
            />
           
          </RadioGroup>
        
        </FormControl>
        <div class="addedaccountdetails">    
                  1234 Apple Seed St, Unit 2<br/>
                  123456789 (Master)     
            </div>
        <FormControl component="fieldset" className={'radiogrup'}>
          <RadioGroup aria-label="PayPerAccountMod" name="PayPerAccountMod" className={classes.group}
            value={this.state.PayPerAccountMod}  onChange={this.handleOnChange} >
            <FormControlLabel className={'amountdatadiv'}
              value="PPA"
              control={<Radio color="primary" />}
              label={<MyLabel PTADText="Pay Total Amount Due" PTAD="$433.22" />}
              labelPlacement="last"
            />
            <FormControlLabel className={'amountdatadiv'}
              value="Other"
              control={<Radio color="primary" />} 
              label={<MyLabelInput OtherAmountDText="Other" OtherAmountD="$0.00" />}
              labelPlacement="last" 
            />
           
          </RadioGroup>
        
        </FormControl>
      </div>
      </div>
    );
        }
}


RadioButtonsGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
