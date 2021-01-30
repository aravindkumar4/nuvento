import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AmexCard from '../../../assets/images/AmexCard.png';
import VisaCard from '../../../assets/images/visaCard.png';
import MasterCard from '../../../assets/images/masterCard.png';
import DiscoverCard from '../../../assets/images/discoverCard.png';
import MaestroCard from '../../../assets/images/MaestroCard.png';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  Fcontainer: {
    marginTop: 50,
  },
  formControl: { width: '100%' }

}));

const MonthList = [
  { value: 'Jan', label: 'January' },
  { value: 'Feb', label: 'February' },
  { value: 'Mar', label: 'March' },
  { value: 'Apr', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'Jun', label: 'June' },
  { value: 'Jul', label: 'July' },
  { value: 'Aug', label: 'August' },
  { value: 'Sep', label: 'September' },
  { value: 'Oct', label: 'October' },
  { value: 'Nov', label: 'November' },
  { value: 'Dec', label: 'December' },
];

const YearList = [
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
  { value: '2027', label: '2027' },
  { value: '2028', label: '2028' },
  { value: '2029', label: '2029' },
  { value: '2030', label: '2030' },
  { value: '2031', label: '2031' },
];

export default function AddPaymentMethod() {
  const classes = useStyles();
  const [values, setValues] = React.useState({});
  const [state, setState] = React.useState({ condition: false });
  const [BankAccount, setBankAccount] = React.useState(true);
  const [CreditDebitCard, setCreditDebitCard] = React.useState(false);
  const [calDropdown, setCalDropdown] = React.useState();
  const [calYearDropdown, setcalYearDropdown] = React.useState();

  const handleClickBankAC = () => {
    setBankAccount(true); setCreditDebitCard(false);
    setState({ condition: false })
  };

  const handleClickCreditDebit = () => {
    setBankAccount(false); setCreditDebitCard(true);
    setState({ condition: false })
  };

  const [valuebankAC, setCreditDebit] = React.useState('bankac');

  const handleOnChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeAccount = event => {
    setCreditDebit(event.target.value);
  };
  const handleChangeMonth = event => {
    setCalDropdown(event.target.value);
  };
  const handleChangeYear = event => {
    setcalYearDropdown(event.target.value);
  };
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol lg="6" sm="8" xs="12" className="edituserpopuppnew">
          <form variant="filled" className={classes.Fcontainer} noValidate autoComplete="off">
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup row aria-label="gender" name="gender1" value={valuebankAC} onChange={handleChangeAccount}>
                <FormControlLabel onClick={handleClickBankAC} value="bankac" control={<Radio color="primary" />} label="Bank Account" />
                <FormControlLabel onClick={handleClickCreditDebit} value="creditdebit" control={<Radio color="primary" />} label="Credit/Debit Card" />
              </RadioGroup>
            </FormControl>

            {BankAccount && <div className="bankaccountdetails">

              <TextField
                id="RountingNumber"
                label="Routing Number"
                className={'TextFieldWrapper'}
                value={values.name}
                onChange={handleOnChange('Routing Number')}
                margin="normal"
                variant="filled"
              />
              <TextField
                id="BankName"
                label="Bank Name"
                className={'TextFieldWrapper'}
                value={values.name}
                onChange={handleOnChange('Bank Name')}
                margin="normal"
                variant="filled"
              />
              <TextField
                id="BankAccountNumber"
                label="Bank Account Number"
                className={'TextFieldWrapper'}
                value={values.name}
                onChange={handleOnChange('Bank Account Number')}
                margin="normal"
                variant="filled"
              />
              <TextField
                id="ReTypeBankAccountNumber"
                label="Retype Bank Account Number"
                className={'TextFieldWrapper'}
                value={values.name}
                onChange={handleOnChange('Retype Bank Account Number')}
                margin="normal"
                variant="filled"
              />
              <Grid component="div" className={'addaccountdisclaimer'}>
                <i class="material-icons">info_outline</i>
                <span>If your payment is rejected, we’ll charge a $7.00 returned payment fee on your next bill</span>
              </Grid>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel checked
                    control={<Checkbox color="primary" />}
                    label="By checking this box you consent to Southwest Gas storing your bank account information."
                    labelPlacement="right"
                    className={'addpaymentcheckbox'}
                  />
                </FormGroup>
              </FormControl>
              <Grid component="div" className={'FormButtonsArea'}>
                <Button color="secondary" className={'btncancelGreen'}>Cancel</Button>
                <Button variant="contained" color="secondary" className={'btnsbtGreen'}>Add</Button>
              </Grid>
            </div>
            }

            {CreditDebitCard && <div className="creditdebitcarddetails">
              <Grid className="AcceptedCardsList">
                <label>Accepted Cards: </label>
                <ul>
                  <li><img src={AmexCard} alt="AmericanExpressCard" /></li>
                  <li><img src={VisaCard} alt="VisaCard" /></li>
                  <li><img src={MasterCard} alt="MasterCard" /></li>
                  <li><img src={DiscoverCard} alt="DiscoverCard" /></li>
                  <li><img src={MaestroCard} alt="MaestroCard" /></li>
                </ul>
              </Grid>
              <TextField
                id="NameOnCard"
                label="Name On card"
                className={'TextFieldWrapper'}
                value={values.name}
                onChange={handleOnChange('Routing Number')}
                margin="normal"
                variant="filled"
              />
              <TextField
                id="CardNumber"
                label="Card Number"
                className={'TextFieldWrapper'}
                value={values.name}
                onChange={handleOnChange('Bank Name')}
                margin="normal"
                variant="filled"
              />
              <Grid component="div" className="CardvalidityDetails">
                <Grid component="div" className="CardExpirySection">
                  <Grid component="div" className="CardMonth">
                    <FormControl variant="filled" className={classes.formControl}>
                      <InputLabel id="CardExpiryMonthSelect">Month</InputLabel>
                      <Select
                        labelId="CardExpiryMonthSelect"
                        id="CardExpiryMonth"
                        value={calDropdown}
                        onChange={handleChangeMonth}
                        input={<FilledInput name="MonthSelect" id="MonthSelect" />}>
                        {MonthList.map((option, Index) => (
                          <MenuItem id={'Month' + Index} key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <p>/</p>
                  <Grid component="div" className="CardYear">
                    <FormControl variant="filled" className={classes.formControl}>
                      <InputLabel id="CardExpiryYearSelect">Year</InputLabel>
                      <Select
                        labelId="CardExpiryYearSelect"
                        id="CardExpiryYear"
                        value={calYearDropdown}
                        onChange={handleChangeYear}
                        input={<FilledInput name="YearSelect" id="YearSelect" />}>
                        {YearList.map((Item, Index) => (
                          <MenuItem id={'year' + Index} key={Item.value} value={Item.value}>
                            {Item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                  </Grid>
                </Grid>
                <Grid component="div" className="CardCvvSection">
                  <TextField
                    id="CvvNo"
                    label="CVV"
                    className={'TextFieldWrapper'}
                    value={values.name}
                    onChange={handleOnChange('Retype Bank Account Number')}
                    margin="normal"
                    variant="filled"
                  />
                  <Tooltip placement="right" title="This is the number on backside of your card.">
                    <IconButton aria-label="This is the number on backside of your card.">
                      <i className="material-icons">info_outline</i>
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel checked
                    control={<Checkbox color="primary" />}
                    label="By checking this box you consent to Southwest Gas storing your bank account information."
                    labelPlacement="right"
                    className={'addpaymentcheckbox'}
                  />
                </FormGroup>
              </FormControl>
              <Grid component="div" className={'FormButtonsArea'}>
                <Button color="secondary" className={'btncancelGreen'}>Cancel</Button>
                <Button variant="contained" color="secondary" className={'btnsbtGreen'}>Add</Button>
              </Grid>
            </div>
            }
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}



