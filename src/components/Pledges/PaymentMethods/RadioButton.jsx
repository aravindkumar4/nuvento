import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class RadioButtonsGroup extends React.Component {
  state = {
    powerOn: 'Yes',
  };

  handleOnChange = key => (event, value) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const { classes } = this.props;
    const { powerOn } = this.state;
    return (
      <div>


            <FormControl component="fieldset">
                  <RadioGroup
                    row
                    name="powerOn"
                    aria-label="powerOn"
                    value={powerOn}
                    onChange={this.handleOnChange("powerOn")}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label=""
                    />
                   
                  </RadioGroup>
                </FormControl>





			
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default RadioButtonsGroup;