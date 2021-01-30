import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 400,
    textTransform: 'uppercase',
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  topButton: {
    margin: 0,
  },
  Fcontainer: {
    marginTop: 50,
  }
});

class AddPaymentMethod extends React.Component {
  state = {
    name: '',
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol lg="4" sm="8" xs="12" className="FormWrapper">
            <form variant="filled" className={classes.Fcontainer} noValidate autoComplete="off">
              <TextField inputProps={{'aria-label':'account feild'}} id="outlined-name" label="Account Holder Name *" className={'TextFieldWrapper'}
                value={this.props.name} onChange={this.handleChange('Portfolio Name')} margin="normal" variant="filled" />
              <TextField inputProps={{'aria-label':'account feild'}} id="outlined-name" label="Routing Number *" className={'TextFieldWrapper'}
                value={this.props.name} onChange={this.handleChange('Portfolio Name')} margin="normal" variant="filled" />
              <TextField inputProps={{'aria-label':'account feild'}} id="outlined-name" label="Account Number *" className={'TextFieldWrapper'}
                value={this.props.name} onChange={this.handleChange('Portfolio Name')} margin="normal" variant="filled" />
              <TextField inputProps={{'aria-label':'account feild'}} id="outlined-name" label="Bank Name *" className={'TextFieldWrapper'}
                value={this.props.name} onChange={this.handleChange('Portfolio Name')} margin="normal" variant="filled" />
              <div class="FormButtonsArea">
                <Button aria-label="click here to cancel" color="secondary" className={'ButtonPrimary'}>Cancel</Button>
                <Button aria-label="click here to save" variant="contained" color="secondary" className={'ButtonPrimary'}>Save</Button>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

AddPaymentMethod.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPaymentMethod);