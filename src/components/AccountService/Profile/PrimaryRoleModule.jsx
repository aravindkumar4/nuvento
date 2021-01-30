import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { MDBCol } from "mdbreact";
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    minWidth: '100%',
  }
});

class PrimaryRoleModule extends React.Component {
  state = {
    name: 'Role ABC',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div class="profileEditbox row">
        <MDBCol lg="6" sm="6" xs="12">
          <TextField
            id="filled-name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
            variant="filled"
            inputProps={{
              'aria-label':'Enter Name'
            }}
          />
        </MDBCol>

      </div>
    );
  }
}

PrimaryRoleModule.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimaryRoleModule);