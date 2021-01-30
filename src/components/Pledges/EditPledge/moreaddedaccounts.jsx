import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

const MyLabel = (props) => (
  <div>
    <span style={{}}>{props.totalamounttext}</span>
    <span style={{ float: 'right', color: '#27A088' }}>{props.totalamountdue}</span>

    <span style={{}}>{props.dueamounttext}</span>
    <span style={{ float: 'right', color: '#27A088' }}>{props.dueamount}</span>

  </div>
);

class MoreAddedAccounts extends React.Component {
  state = {
    value: 'Pay Total Amount Due',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="divbreak">
        <div className="addedaccountdetails">
          1234 Apple Seed St, Unit 1<br />
          123456789 (Master)
            </div>
        <FormControl component="fieldset" className={'radiogrup'}>
          <RadioGroup
            aria-label="gender"
            name="gender2"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel className={'amountdatadiv'}
              value="Pay Total Amount Due"
              control={<Radio color="primary" />}
              label={<MyLabel totalamounttext="Pay Total Amount Due" totalamountdue="$354.22" />}
              labelPlacement="last"
            />
            <FormControlLabel className={'amountdatadiv'}
              value="Other"
              control={<Radio color="primary" />}
              label={<MyLabel dueamounttext="Other" dueamount="asdasdasd" />}
              labelPlacement="last"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

MoreAddedAccounts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MoreAddedAccounts);
