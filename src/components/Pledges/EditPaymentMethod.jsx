import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%'
  }
}));

export default function EditPaymentMethod() {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  return (
    <React.Fragment>
      <div class="EAPModalBody">
        <Typography component="h3" color="primary">Edit Payment Method</Typography>
        <form variant="filled" className={classes.Fcontainer} noValidate autoComplete="off">
          <TextField required id="filled-required1" className={'TextFieldWrapper'}
            label="Account Holder Name"
            defaultValue=""
            variant="filled"
            inputProps={{
              'aria-label':'Enter account holder name'
            }}
          />
          <TextField required id="filled-required2" className={'TextFieldWrapper'}
            label="Routing Number"
            defaultValue=""
            variant="filled"
            inputProps={{
              'aria-label':'Enter routing number'
            }}
          />
          <TextField required id="filled-required3" className={'TextFieldWrapper'}
            label="Account Number"
            defaultValue=""
            variant="filled"
            inputProps={{
              'aria-label':'Enter Account number'
            }}
          />
          <TextField required id="filled-required4" className={'TextFieldWrapper'}
            label="Bank Name"
            defaultValue=""
            variant="filled"
            inputProps={{
              'aria-label':'Enter Bank name'
            }}
          />
          <div class="FormButtonsArea">
            <Button aria-label="click here to cancel" color="secondary" className="ButtonPrimary">Cancel</Button>
            <Button aria-label="click here to save" variant="contained" color="secondary" className="ButtonPrimary">Save</Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
