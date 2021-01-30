import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    border: 'none',
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  formgroup: {
    flexDirection: 'column',
    display: 'inline-block',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
  },
});

class StepTwo extends React.Component {
  

  render() {
    const { classes } = this.props;

    return (
      <div className='rows'>
        <div class="stepone regisSecondStep">
          <div className='requestree'>
            <div className="grouppay">
              <div class="register_first">
                <form className={classes.root} autoComplete="off">
                  <MDBContainer>
                    <MDBRow>
                      <MDBCol className="FormWrapper registerStep1">
                        <h3>Primary Contact Information</h3>
                        <form className={classes.container} noValidate autoComplete="off">
                        <TextField id="outlined-name" label="Primary Contact Name" className={'TextFieldWrapper'}
                      value=""  margin="normal" variant="filled" />

                      <TextField id="outlined-name" label="Primary Contact Job Title" className={'TextFieldWrapper'}
                      value=""  margin="normal" variant="filled" />
                      
                      <TextField id="outlined-name" label="Primary Contact Email Address" className={'TextFieldWrapper'}
                      value=""  margin="normal" variant="filled" />

                      <TextField id="outlined-name" label="Confirm Primary Contact Email Address" className={'TextFieldWrapper'}
                      value=""  margin="normal" variant="filled" />

                      <TextField id="outlined-name" label="Primary Contact Phone #" className={'TextFieldWrapper'}
                      value=""  margin="normal" variant="filled" />

                    <TextField id="outlined-name" label="Primary Contact Fax #" className={'TextFieldWrapper'}
                      value=""  margin="normal" variant="filled" />

                      <h3 className="secHeading">Secondary Contact Information</h3>

                      <TextField id="outlined-name" label="Secondary Contact Name" className={'TextFieldWrapper'}
                      value=""  margin="normal" variant="filled" />

                      <TextField id="outlined-name" label="Secondary Contact Job Title" className={'TextFieldWrapper'}
                      value=""  margin="normal" variant="filled" />
                      
                      <TextField id="outlined-name" label="Secondary Contact Email Address" className={'TextFieldWrapper'}
                      value=""  margin="normal" variant="filled" />

                      <TextField id="outlined-name" label="Confirm Secondary Contact Email Address" className={'TextFieldWrapper'}
                      value=""  margin="normal" variant="filled" />

                      <TextField id="outlined-name" label="Secondary Contact Phone #" className={'TextFieldWrapper'}
                      value=""  margin="normal" variant="filled" />

                    <TextField id="outlined-name" label="Secondary Contact Fax #" className={'TextFieldWrapper'}
                      value=""  margin="normal" variant="filled" />
                        </form>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

StepTwo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepTwo);
