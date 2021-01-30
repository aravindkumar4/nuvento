import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    formControl: {
        width: '100%'
    }
}));

const PaymentDateList = [
    {
        value: '3 Days Prior due date',
        label: '3 Days Prior due date',
    },
    {
        value: '5 Days Prior due date',
        label: '5 Days Prior due date',
    },
    {
        value: '10 Days Prior due date',
        label: '10 Days Prior due date',
    }
];

export default function EditAutoPaymentDate() {
    const classes = useStyles();
    const [currency, setCurrency] = React.useState('10 Days Prior due date');

    const handleChange = event => {
        setCurrency(event.target.value);
    };
    return (
        <React.Fragment>
            <div class="EAPModalBody">
                <Typography component="h3" color="primary">Change auto payment date</Typography>
                <form className={classes.root} autoComplete="off">
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel htmlFor="BankAccountSelect"></InputLabel>
                        <TextField
                            id="PaymentDate"
                            select
                            label="Payment Date"
                            value={currency}
                            onChange={handleChange}
                            variant="filled"
                            inputProps={{
                                'aria-label':'Select account select'
                            }}
                        >
                            {PaymentDateList.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    <div class="FormButtonsArea">
                        <Button aria-label="click here to cancel" color="secondary" className="ButtonPrimary">Cancel</Button>
                        <Button aria-label="click here to save" variant="contained" color="secondary" className="ButtonPrimary">Save</Button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}