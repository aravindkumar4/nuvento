import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DatePicker from 'react-date-picker';

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
});

 class RadioButtonsGroupNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showdiv: false,
      value: 'Pay on Due Dates',
      date: new Date(),
    }
 }
 handleClick = event => {
  this.setState({  showdiv: true  });
 };
 handleOnClick = event => {
  this.setState({  showdiv: false  });
 };
 handleChange = event => {
  this.setState({ value: event.target.value });
 };

onChange = date => this.setState({ date })
    render() {

        const { classes } = this.props; 
        return (
          <div>
          <div className={classes.root}>      
        <FormControl component="fieldset" className={'radiogrup'}>
          <RadioGroup
            aria-label="PaymentDate"
            name="PaymentDate"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel
              value="Pay on Due Dates"  onClick={this.handleOnClick}  onChange={ this.handleOnChange }
              control={<Radio color="primary" />}
              label="Pay on Due Dates"
              labelPlacement="last"
            />
            <FormControlLabel
              value="Choose Date" checked={ this.state.checked }  onChange={ this.handleOnChange }
              onClick={this.handleClick}
              control={<Radio color="primary" />}
              label="Choose Date"
              labelPlacement="last" 
            />
           
          </RadioGroup>
        
        </FormControl>
        <div id="results" className="ChoosePaymentDate" hidden = {!this.state.showdiv}> 
        <DatePicker onChange={this.onChange}  value={this.state.date} customInput={<input />} 
         placeholderText="Click to select a date"
        />
              </div>
      </div>

              </div>

    );
        }
        
}


RadioButtonsGroupNew.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroupNew);

